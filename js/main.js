'use strict';

//Create variables with HTML elements
const selectRace = document.querySelector('.js-select-race');
const playBtn = document.querySelector('.js-play-btn');
const gameResult = document.querySelector('.js-result');
const replayBtn = document.querySelector('.js-replay-btn');
const resulBtn = document.querySelector('.js-result-btn');

//New variables
const goodTemplate = document.querySelector('.js-good-template');
const evilTemplate = document.querySelector('.js-evil-template');
const goodCardPer = document.querySelector('.js-good-per');
const goodCardImg = document.querySelector('.js-good-img');
const evilCardPer = document.querySelector('.js-evil-per');
const evilCardImg = document.querySelector('.js-evil-img');

//Start with replay button hidden
replayBtn.classList.add('hidden');


//Variables for user-computer results
const userResultEl = document.querySelector('.js-result-user');
const compResultEl = document.querySelector('.js-result-computer');

//Create objects for good races (user side)

const goodRace1 = {
    name: 'Sir Cup',
    image: "url('../images/sir-cup.jpg')",
    value: 1
}

const goodRace2 = {
    name: 'Big Nose',
    image: "url('../images/big-nose.jpg')", 
    value: 2
}

const goodRace3 = {
    name: 'Ball Head',
    image: "url('../images/ball-head.jpg')",
    value: 3
}

const goodRace4 = {
    name: 'Weird Phantom',
    image: "url('../images/phantom.jpg')",
    value: 4
}

const goodRace5 = {
    name: 'Crazy Monkey',
    image: "url('../images/crazy-monkey.jpg')",
    value: 5
}

//Create objects for evil races (computer side)

const evilRace1 = {
    name: 'Sad Alien',
    image: "url('../images/sad-alien.jpg')",
    value: 2
}

const evilRace2 = {
    name: 'Fluffy',
    image: "url('../images/fluffy.jpg')",
    value: 2
}

const evilRace3 = {
    name: 'Angry Rhino',
    image: "url('../images/angry-rhino.jpg')",
    value: 2
}

const evilRace4 = {
    name: 'Mad',
    image: "url('../images/mad.jpg')",
    value: 3
}

const evilRace5 = {
    name: 'Creepy Smile',
    image: 'url(../images/creepy-smile.jpg)',
    value: 5
}

//Create array for good races (user side)

const goodRaces = [goodRace1, goodRace2, goodRace3, goodRace4, goodRace5];

//Create array for evil races (computer side)
const evilRaces = [evilRace1, evilRace2, evilRace3, evilRace4, evilRace5];

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


//Main function to select good race
function handleSelectRace(){
    paintGoodCards();
}

//Event listener good race input
selectRace.addEventListener('change', handleSelectRace);

//Function to calculate random number
function getRandomNumber(max) {
    return Math.ceil(Math.random() * max);
}

//Create variables to count results

let userResult = 0;
let computerResult = 0;
let totalMoves = 0;

//Function to compare values from each side (user and computer) when clicking button
function compareResult(){
    const randomValue = getRandomNumber(4);
    const raceValue = parseInt(selectRace.value);
    const randomRace = evilRaces[randomValue];
    const randomRaceValue = evilRaces[randomValue].value;
    paintEvilCards(randomRace);
    if (raceValue < randomRaceValue){
        resulBtn.innerHTML = 'Ops! The Evil Forces just won. Try again!';
        computerResult += 1;
    }else if (raceValue === randomRaceValue){
        resulBtn.innerHTML = 'Tie';
    }else{
        resulBtn.innerHTML = 'Yey! The Good Forces just won. Congratulations!';
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
function paintResult(){
    userResultEl.innerHTML = `Player: ${userResult}`;
    compResultEl.innerHTML = `Computer: ${computerResult}`;
}

function updateCounter(){
    totalMoves++;
    gameResult.innerHTML = totalMoves;
    if(totalMoves === 9){
        resulBtn.innerHTML = `Careful! You only have one move left...`;
    }else if (totalMoves === 10){
        replayBtn.classList.remove('hidden');
        playBtn.classList.add('hidden');
        if(userResult>computerResult){
            resulBtn.innerHTML = `Congrats! You won the battle`;
        }else{
            resulBtn.innerHTML = `Oh oh... maybe next time!`;
        }
    }
}

//Main function when clicking in play button
function handleClick (event){
    const raceValue = parseInt(selectRace.value);
    if(raceValue === 0){
        resulBtn.innerHTML = `Please choose a warrior`;
    }else{
        event.preventDefault();
        compareResult();
        paintResult();
        updateCounter();
    }
}

//Event listener play button
playBtn.addEventListener('click', handleClick);

//Event listener reset button
replayBtn.addEventListener('click', (event)=>{
    event.preventDefault();
    userResult = 0;
    computerResult = 0;
    totalMoves = 0;
    gameResult.innerHTML = totalMoves;
    userResultEl.innerHTML = userResult;
    compResultEl.innerHTML = computerResult;
    resulBtn.innerHTML = `Let the battle start!`;
    replayBtn.classList.add('hidden');
    playBtn.classList.remove('hidden');
    //Restore card values
    goodCardPer.innerHTML = 'The Good Army';
    goodCardImg.style.backgroundImage = null;
    goodTemplate.classList.add('good-back');
    evilCardPer.innerHTML = 'The Evil Army';
    evilCardImg.style.backgroundImage = null;
    evilTemplate.classList.add('evil-back');
});


