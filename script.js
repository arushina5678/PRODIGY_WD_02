// script.js

let startTime = 0;
let updatedTime = 0;
let difference = 0;
let tInterval;
let running = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(getShowTime, 1);
        startStopButton.innerHTML = "Stop";
        running = true;
    } else {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        startStopButton.innerHTML = "Start";
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    difference = 0;
    running = false;
    startStopButton.innerHTML = "Start";
    display.innerHTML = "00:00:00";
    lapsContainer.innerHTML = "";
    lapCounter = 0;
}

function lap() {
    if (running) {
        lapCounter++;
        const lapTime = document.createElement('div');
        lapTime.classList.add('lap');
        lapTime.innerHTML = `Lap ${lapCounter}: ${display.innerHTML}`;
        lapsContainer.appendChild(lapTime);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime() - startTime;
    const hours = Math.floor((updatedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((updatedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((updatedTime % (1000 * 60)) / 1000);

    display.innerHTML =
        (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" +
        (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" +
        (seconds > 9 ? seconds : "0" + seconds);
}

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
