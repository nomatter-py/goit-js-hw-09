const refs = {
  bodyEl: document.querySelector('body'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

const startSwitcher = () => {
  refs.bodyEl.style.backgroundColor = getRandomHexColor();
};

let swithcerIntervalId = null;

function disabled(el, value = true) {
  if (value) {
    el.disabled = value;
  } else {
    el.disabled = true;
  }
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

disabled(refs.stopBtn);


refs.startBtn.addEventListener('click', () => {
  swithcerIntervalId = setInterval(startSwitcher, 1000);
  disabled(refs.startBtn);
  disabled(refs.stopBtn, false);
});

refs.stopBtn.addEventListener('click', () => {
  clearInterval(swithcerIntervalId);
  disabled(refs.stopBtn);
  disabled(refs.startBtn, false);
});


