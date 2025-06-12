import {date, currentDate} from './date.js';

const message = document.getElementById('message');
const messageContent = document.querySelector('#message p');
const chronometerContainer = document.getElementById('chronometer');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const startBtn = document.getElementById('start-button');
const pauseBtn = document.getElementById('pause-button');
const resetBtn = document.getElementById('reset-button');

// Initialize timer state from localStorage or default to 0
let counterSeconds = Number(localStorage.getItem('seconds')) || 0;
let counterMinutes = Number(localStorage.getItem('minutes')) || 0;
let counterHours = Number(localStorage.getItem('hours')) || 0;
let getMessage = localStorage.getItem('message') || '';
let getButton = localStorage.getItem('button') || '';

let intervalId;
document.addEventListener('DOMContentLoaded', () => {
    // Set UI from state
    seconds.textContent = counterSeconds.toString().padStart(2, '0');
    minutes.textContent = counterMinutes.toString().padStart(2, '0');
    hours.textContent = counterHours.toString().padStart(2, '0');

    // Restore paused state if needed
    if (getButton === "Pause" && getMessage === "Timer paused") {
        startBtn.textContent = "Resume";
        messageContent.textContent = getMessage;
        startBtn.removeAttribute('disabled');
        pauseBtn.setAttribute('disabled', 'disabled');
        resetBtn.removeAttribute('disabled');
    } else if ((getButton === "Resume" || getButton === "Start") && getMessage === "Timer started") {
        resetTimer();
    }
});
/**
 * Increments the minute counter by one, updates the display,
 * and stores the new value in localStorage. If the counter reaches 60,
 * it resets to 0 and increments the hour counter.
 *
 * @function
 * @returns {void}
 */
const updateMinutes = () => {
    counterMinutes++;
    if (counterMinutes === 60) {
        counterMinutes = 0;
        updateHours();
    }
    minutes.textContent = counterMinutes.toString().padStart(2, '0');
    localStorage.setItem('minutes', counterMinutes);
};

/**
 * Increments the hour counter, updates the displayed hours,
 * and saves the new value to localStorage.
 *
 * @function
 * @returns {void}
 */
const updateHours = () => {
    counterHours++;
    hours.textContent = counterHours.toString().padStart(2, '0');
    localStorage.setItem('hours', counterHours);
};

let timerId;
/**
 * Starts the timer by incrementing seconds every second, updating the UI and localStorage.
 * Disables the start and reset buttons, enables the pause button, and updates the message content.
 * Also handles minute updates when seconds reach 60.
 *
 * Side Effects:
 * - Updates DOM elements: seconds, messageContent, message, startBtn, resetBtn, pauseBtn.
 * - Stores timer state and messages in localStorage.
 *
 * Assumes the existence of global variables: timerId, counterSeconds, seconds, messageContent, message, startBtn, resetBtn, pauseBtn, updateMinutes.
 */
const startTimer = () => {
    timerId = setInterval(() => {
        counterSeconds++;
        if (counterSeconds === 60) {
            counterSeconds = 0;
            updateMinutes();
        }
        seconds.textContent = counterSeconds.toString().padStart(2, '0');
        localStorage.setItem('seconds', counterSeconds);
    }, 1000);
    messageContent.textContent = "Timer started";
    setTimeout(() => {
        messageContent.textContent = "Timer running";
        localStorage.setItem('message', messageContent.textContent);
    }, 2000);
    message.appendChild(messageContent);
    startBtn.setAttribute('disabled', 'disabled');
    resetBtn.setAttribute('disabled', 'disabled');
    pauseBtn.removeAttribute('disabled');
    localStorage.setItem('message', messageContent.textContent);
    localStorage.setItem('button', startBtn.textContent);
};

/**
 * Pauses the timer by clearing the interval, updating the UI to reflect the paused state,
 * enabling/disabling relevant buttons, and saving the current message and button state to localStorage.
 */
const pauseTimer = () => {
    clearInterval(timerId);
    messageContent.textContent = "Timer paused";
    message.appendChild(messageContent);
    startBtn.removeAttribute('disabled');
    startBtn.textContent = "Resume";
    pauseBtn.setAttribute('disabled', 'disabled');
    resetBtn.removeAttribute('disabled');
    localStorage.setItem('message', messageContent.textContent);
    localStorage.setItem('button', pauseBtn.textContent);
};

/**
 * Resets the timer to its initial state.
 * - Stops the timer interval.
 * - Resets hour, minute, and second counters to zero.
 * - Updates the UI to reflect the reset state.
 * - Displays a reset message.
 * - Updates button states (enables/disables as appropriate).
 * - Stores the reset state in localStorage.
 */
const resetTimer = () => {
    clearInterval(timerId);
    counterSeconds = 0;
    counterMinutes = 0;
    counterHours = 0;
    seconds.textContent = "00";
    minutes.textContent = "00";
    hours.textContent = "00";
    messageContent.textContent = "Timer reset";
    message.appendChild(messageContent);
    startBtn.textContent = "Start";
    pauseBtn.setAttribute('disabled', 'disabled');
    resetBtn.removeAttribute('disabled');
    localStorage.setItem('seconds', counterSeconds);
    localStorage.setItem('minutes', counterMinutes);
    localStorage.setItem('hours', counterHours);
    localStorage.setItem('message', messageContent.textContent);
    localStorage.setItem('button', resetBtn.textContent);
};

startBtn.addEventListener('click', () => {
    if (startBtn.textContent === "Resume") {
        startBtn.textContent = "Start";
    }
    startTimer();
});
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

