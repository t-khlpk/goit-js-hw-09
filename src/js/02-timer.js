import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  btnStart: document.querySelector('[data-start]'),
  input: document.querySelector('#datetime-picker'),
  timerDays: document.querySelector('[data-days]'),
  timerHours: document.querySelector('[data-hours]'),
  timerMinutes: document.querySelector('[data-minutes]'),
  timerSeconds: document.querySelector('[data-seconds]'),
}

const DELAY_INTERVAL = 1000;
let intervalId = null;
let selectedTimeInMs = null;
let objectTime = {};

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose: function (selectedDates) {
      if (selectedDates[0] <= new Date()) {
        Notify.failure(
                'Ooops... Please choose a date in the future!',
              
              );
            } else {
              selectedTimeInMs = Date.parse(selectedDates) - Date.now();
              objectTime = convertMs(selectedTimeInMs);
      }
    },
  };
  
  flatpickr(refs.input, options);

  refs.btnStart.addEventListener('click', onStartTimer);
  
  function onStartTimer(selectedDates) {
    
    intervalId = setInterval(() => {
      if (selectedTimeInMs <= 0) {
         clearInterval(intervalId);
        return;
      }
      objectTime = convertMs(selectedTimeInMs);
      refs.timerDays.textContent = addLeadingZero(objectTime.days);
      refs.timerHours.textContent = addLeadingZero(objectTime.hours);
      refs.timerMinutes.textContent = addLeadingZero(objectTime.minutes);
      refs.timerSeconds.textContent = addLeadingZero(objectTime.seconds);
      selectedTimeInMs -= DELAY_INTERVAL;
    }, DELAY_INTERVAL);
  }
  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }