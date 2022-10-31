'use strict';

//Create variables with HTML elements
const selectRace = document.querySelector('.js-select-race');
const playBtn = document.querySelector('.js-play-btn');
const gameResult = document.querySelector('.js-result');

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

//Function to get random evil race
function getRandomRace(array) {
    return Math.ceil(Math.random() * array.length);
}


//Function to compare values from each side (user and computer) when clicking button
function compareResult(){
    const randomRace = getRandomRace (evilRaces);
    console.log(randomRace, evilRaces[randomRace]);
    const raceValue = parseInt(selectRace.value);
    const randomRaceValue = evilRaces[randomRace].value;
    console.log(raceValue);
    if (raceValue < randomRaceValue){
        gameResult.innerHTML = 'Ha ganado el Ejército del Mal! Vuelve a Intentarlo.';
    }else if (raceValue === randomRaceValue){
        gameResult.innerHTML = 'Empate';
    }else{
        gameResult.innerHTML = 'Ha ganado el Ejército del Bien! Enhorabuena.';
    }
}

//Main function when clicking in play button
function handleClick (event){
    event.preventDefault();
    compareResult();
}


playBtn.addEventListener('click', handleClick);