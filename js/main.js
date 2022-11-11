'use strict';

//Create variables with HTML elements
const selectRace = document.querySelector('.js-select-race');
const playBtn = document.querySelector('.js-play-btn');
const gameResult = document.querySelector('.js-result');
const replayBtn = document.querySelector('.js-replay-btn');
const resultBtn = document.querySelector('.js-result-btn');

//New variables to update cards
const goodTemplate = document.querySelector('.js-good-template');
const evilTemplate = document.querySelector('.js-evil-template');
const goodCardPer = document.querySelector('.js-good-per');
const goodCardImg = document.querySelector('.js-good-img');
const evilCardPer = document.querySelector('.js-evil-per');
const evilCardImg = document.querySelector('.js-evil-img');

//Variables for user-computer results
const userResultEl = document.querySelector('.js-result-user');
const compResultEl = document.querySelector('.js-result-computer');

//Create variable to check current player
let latestPlayerValue = 0;

//Create array with objects for good races (user side)
const goodRaces = [
    {
        name: 'Sir Cup',
        image: "url('./images/sir-cup.jpg')",
        value: 1
    },
    {
        name: 'Big Nose',
        image: "url('./images/big-nose.jpg')", 
        value: 2
    },
    {
        name: 'Ball Head',
        image: "url('./images/ball-head.jpg')",
        value: 3
    },
    {
        name: 'Weird Phantom',
        image: "url('./images/phantom.jpg')",
        value: 4
    },
    {
        name: 'Crazy Monkey',
        image: "url('./images/crazy-monkey.jpg')",
        value: 5
    }
]

//Create array with objects for evil races (computer side)

const evilRaces = [
    {
        name: 'Sad Alien',
        image: "url('./images/sad-alien.jpg')",
        value: 2
    },
    {
        name: 'Fluffy',
        image: "url('./images/fluffy.jpg')",
        value: 2
    },
    {
        name: 'Angry Rhino',
        image: "url('./images/angry-rhino.jpg')",
        value: 2
    },
    {
        name: 'Mad',
        image: "url('./images/mad.jpg')",
        value: 3
    },
    {
        name: 'Creepy Smile',
        image: 'url(./images/creepy-smile.jpg)',
        value: 5
    }
]


//Function to render select inputs
function renderSelectInputs(array){
    let html = '';
    for (const object of array){
        html += `<option value="${object.value}">${object.name}</option>`;
    }
    selectRace.innerHTML += html
}   

renderSelectInputs(goodRaces);


//Create function to paint cards
function paintGoodCards(){
    const raceValue = parseInt(selectRace.value);
    if(raceValue === 0){
        goodCardPer.innerHTML = 'The Good Army';
        goodCardImg.style.backgroundImage = null;
        goodTemplate.classList.add('good-back');
    }else{ 
        for(const good of goodRaces){
            if (raceValue === good.value){
                goodCardPer.innerHTML = good.name;
                goodCardImg.style.backgroundImage = good.image;
                goodTemplate.classList.remove('good-back');
            }
        }  
    }
}


//Main function in event listener to select good race
function handleSelectRace(){
    paintGoodCards();
}


//Event listener good race input
selectRace.addEventListener('change', handleSelectRace);


//Function to calculate random number
function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}


//Create variables to count results
let userResult = 0;
let computerResult = 0;
let totalMoves = 0;

//Function to compare values from each side (user and computer) when clicking button
function compareResult(){
    const randomValue = getRandomNumber(5);
    const raceValue = parseInt(selectRace.value);
    const randomRace = evilRaces[randomValue];
    const randomRaceValue = evilRaces[randomValue].value;
    paintEvilCards(randomRace);
    if (raceValue < randomRaceValue){
        resultBtn.innerHTML = 'Ops! The Evil Forces just won. Try again!';
        computerResult += 1;
    }else if (raceValue === randomRaceValue){
        resultBtn.innerHTML = 'Tie';
    }else{
        resultBtn.innerHTML = 'Yey! The Good Forces just won. Congratulations!';
        userResult += 1;
    }
}


//Function to paint evil cards
function paintEvilCards(item){
    evilTemplate.classList.remove('evil-back');
    evilCardPer.innerHTML = item.name;
    evilCardImg.style.backgroundImage = item.image;
}


//Function to paint result of game
function renderEachResult(){
    userResultEl.innerHTML = `Player: ${userResult}`;
    compResultEl.innerHTML = `Computer: ${computerResult}`;
}

//Function to update counter
function updateCounter(){
    totalMoves++;
    gameResult.innerHTML = totalMoves;
}

//Function to render result button

function renderResult(){
    updateCounter();
    if(totalMoves === 9){
        resultBtn.innerHTML = `Careful! You only have one move left...`;
    }else if (totalMoves === 10){
        replayBtn.classList.remove('hidden');
        playBtn.classList.add('hidden');
        if(userResult>computerResult){
            resultBtn.innerHTML = `Congrats! You won the battle`;
        }else{
            resultBtn.innerHTML = `Oh oh... maybe next time!`;
        }
    }
}


//Main function when clicking in play button
function handlePlayClick (event){
    event.preventDefault();
    const raceValue = parseInt(selectRace.value);
    if(raceValue === 0){
        resultBtn.classList.add('main-result-on');
        resultBtn.innerHTML = `Please choose a warrior`;
    }else if(latestPlayerValue === raceValue){
        resultBtn.classList.add('main-result-on');
        resultBtn.innerHTML = `Please change your warrior`;  
    }else{
        resultBtn.classList.remove('main-result-on');
        compareResult();
        renderEachResult();
        renderResult(); 
        latestPlayerValue = raceValue;
    }
}



//Event listener play button
playBtn.addEventListener('click', handlePlayClick);


//Main function for reset event listener
function handleResetClick(event){
    event.preventDefault();
    userResult = 0;
    computerResult = 0;
    totalMoves = 0;
    selectRace.value = 0;
    gameResult.innerHTML = totalMoves;
    userResultEl.innerHTML = 'Player:';
    compResultEl.innerHTML = 'Computer:';
    resultBtn.innerHTML = `Let the battle start!`;
    replayBtn.classList.add('hidden');
    playBtn.classList.remove('hidden');
    //Restore card values
    goodCardPer.innerHTML = 'The Good Army';
    goodCardImg.style.backgroundImage = null;
    goodTemplate.classList.add('good-back');
    evilCardPer.innerHTML = 'The Evil Army';
    evilCardImg.style.backgroundImage = null;
    evilTemplate.classList.add('evil-back');
}


//Event listener reset button
replayBtn.addEventListener('click',handleResetClick);


