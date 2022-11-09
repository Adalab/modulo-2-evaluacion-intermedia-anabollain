'use strict';

//Create variables with HTML elements
const selectRace = document.querySelector('.js-select-race');
const playBtn = document.querySelector('.js-play-btn');
const gameResult = document.querySelector('.js-result');
const replayBtn = document.querySelector('.js-replay-btn');
const resulBtn = document.querySelector('.js-result-btn');

const cardEl = document.querySelector('.card-template');

//Start with replay button hidden
replayBtn.classList.add('hidden');


//Variables for user-computer results
const userResultEl = document.querySelector('.js-result-user');
const compResultEl = document.querySelector('.js-result-computer');

//Create objects for good races (user side)

const goodRace1 = {
    name: 'Sir Cup',
    value: 1
}

const goodRace2 = {
    name: 'Big Nose',
    value: 2
}

const goodRace3 = {
    name: 'Ballon Head',
    value: 3
}

const goodRace4 = {
    name: 'Weird Phantom',
    value: 4
}

const goodRace5 = {
    name: 'Crazy Monkey',
    value: 5
}

//Create objects for evil races (computer side)

const evilRace1 = {
    name: 'Sad Alien',
    value: 2
}

const evilRace2 = {
    name: 'Fluffy',
    value: 2
}

const evilRace3 = {
    name: 'Angry Rhino',
    value: 2
}

const evilRace4 = {
    name: 'Mad',
    value: 3
}

const evilRace5 = {
    name: 'Creepy Smile',
    value: 5
}

//Create array for evil races (computer side)
const evilRaces = [evilRace1, evilRace2, evilRace3, evilRace4, evilRace5];


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
    const randomRaceValue = evilRaces[randomValue].value;
    console.log(raceValue);
    console.log(evilRaces[randomValue]);
    if (raceValue < randomRaceValue){
        resulBtn.innerHTML = 'Ha ganado el Ejército del Mal! Vuelve a Intentarlo.';
        computerResult += 1;
    }else if (raceValue === randomRaceValue){
        resulBtn.innerHTML = 'Empate';
    }else{
        resulBtn.innerHTML = 'Ha ganado el Ejército del Bien! Enhorabuena.';
        userResult += 1;
    }
}

//Function to paint result of game
function paintResult(){
    userResultEl.innerHTML = `Jugador: ${userResult}`;
    compResultEl.innerHTML = `Computadora: ${computerResult}`;
}

function updateCounter(){
    totalMoves++;
    gameResult.innerHTML = totalMoves;
    if(totalMoves === 10){
        replayBtn.classList.remove('hidden');
        playBtn.classList.add('hidden');
    }
}

//Main function when clicking in play button
function handleClick (event){
    event.preventDefault();
    compareResult();
    paintResult();
    updateCounter();
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
    resulBtn.innerHTML = `¡Comienza la batalla!`;
    replayBtn.classList.add('hidden');
    playBtn.classList.remove('hidden');
});


