const refs = {
  bodyEl: document.querySelector('body'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

const startSwitcher = () => {
  refs.bodyEl.style.backgroundColor = getRandomHexColor();
};

let swithcerIntervalId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}


refs.startBtn.addEventListener('click', () => {
  swithcerIntervalId = setInterval(startSwitcher, 1000);
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
});

refs.stopBtn.addEventListener('click', () => {
  clearInterval(swithcerIntervalId);
  refs.stopBtn.disabled = true; 
  refs.startBtn.disabled = false;
});


