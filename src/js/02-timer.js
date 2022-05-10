
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
  startBtn: document.querySelector('[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minsEl: document.querySelector('[data-minutes]'),
  secsEl: document.querySelector('[data-seconds]'),
};

let dateTo = null;


class Timer {
  constructor() {
    this.timerId = null;
  }

  start() {
    this.timerId = setInterval(() => {
      const currentDelta = dateTo - Date.now();
      if (currentDelta <= 0) {
        this.stop();
        return;
      }
      updateClockface(convertMs(currentDelta));
    }, 1000);
  }

  stop() {
    clearInterval(this.timerId);
  }
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    dateTo = selectedDates[0];
    if (dateTo < Date.now()) {
      alert('Please choose a date in the future');
      refs.startBtn.disabled = true;
    } else {
      refs.startBtn.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);


function addLeadingZero(val) {
  return String(val).padStart(2, 0);
}

function updateClockface({ days, hours, minutes, seconds }) {
  refs.daysEl.textContent = `${days}`;
  refs.hoursEl.textContent = `${hours}`;
  refs.minsEl.textContent = `${minutes}`;
  refs.secsEl.textContent = `${seconds}`;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}


const timer = new Timer();
refs.startBtn.addEventListener('click', timer.start);


