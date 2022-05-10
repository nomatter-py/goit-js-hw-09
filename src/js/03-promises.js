import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
};

const onSubmit = (evt) => {
  evt.preventDefault();
  
  let delay = Number(evt.currentTarget.delay.value);
  let step = Number(evt.currentTarget.step.value);
  let amount = evt.currentTarget.amount.value;

  for (let position = 1; position <= amount; position += 1, delay += step) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        return resolve({ position, delay });
      } else {
        return reject({ position, delay });
      }
    }, delay);
  });
}

refs.form.addEventListener('submit', onSubmit);
