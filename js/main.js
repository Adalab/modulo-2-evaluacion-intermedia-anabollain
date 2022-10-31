'use strict';

//Create variables with HTML elements
const selectRace = document.querySelector('.js-select-race');
const playBtn = document.querySelector('.js-play-btn');
const gameResult = document.querySelector('.js-result');
const replayBtn = document.querySelector('.js-replay-btn');
const resulBtn = document.querySelector('.js-result-btn');

//Start with replay button hidden
replayBtn.classList.add('hidden');


//Variables for user-computer results
const userResultEl = document.querySelector('.js-result-user');
const compResultEl = document.querySelector('.js-result-computer');

//Create objects for evil races (computer side)

const race1 = {
    name: 'Sureños malos con fuerza',
    value: 2
}

const race2 = {
    name: 'Orcos con fuerza',
    value: 2
}

const race3 = {
    name: 'Goblins con fuerza',
    value: 2
}

const race4 = {
    name: 'Huargos con fuerza',
    value: 3
}

const race5 = {
    name: 'Trolls con fuerza',
    value: 5
}

//Create array for evil races (computer side)
const evilRaces = [race1, race2, race3, race4, race5];


//Function to calculate random number
function getRandomNumber(max) {
    return Math.ceil(Math.random() * max);
}

//Create variables to count results

let userResult = 0;
let computerResult = 0;
//Function to compare values from each side (user and computer) when clicking button
function compareResult(){
    const randomValue = getRandomNumber(4);
    const raceValue = parseInt(selectRace.value);
    const randomRaceValue = evilRaces[randomValue].value;
    console.log(raceValue);
    console.log(evilRaces[randomValue]);
    if (raceValue < randomRaceValue){
        gameResult.innerHTML = 'Ha ganado el Ejército del Mal! Vuelve a Intentarlo.';
        computerResult += 1;
    }else if (raceValue === randomRaceValue){
        gameResult.innerHTML = 'Empate';
    }else{
        gameResult.innerHTML = 'Ha ganado el Ejército del Bien! Enhorabuena.';
        userResult += 1;
    }
}

//Function to paint result of game
function paintResult(){
    userResultEl.innerHTML = `Jugador: ${userResult}`;
    compResultEl.innerHTML = `Computadora: ${computerResult}`;
    if(userResult === 10 || computerResult === 10){
        replayBtn.classList.remove('hidden');
        playBtn.classList.add('hidden');
    }
    if(userResult === 10){
        resulBtn.innerHTML = `Has ganado el juego`;
    }
    if(computerResult === 10){
        resulBtn.innerHTML = `Has perdido el juego`;
    }
}

//Main function when clicking in play button
function handleClick (event){
    event.preventDefault();
    compareResult();
    paintResult();
}

//Event listener play button
playBtn.addEventListener('click', handleClick);

//Event listener reset button
replayBtn.addEventListener('click', (event)=>{
    event.preventDefault();
    userResult = 0;
    computerResult = 0;
    userResultEl.innerHTML = userResult;
    compResultEl.innerHTML = computerResult;
    resulBtn.innerHTML = `¡Comienza la batalla!`;
    replayBtn.classList.add('hidden');
    playBtn.classList.remove('hidden');
});


