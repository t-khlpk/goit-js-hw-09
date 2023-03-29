
const refs = {
  form: document.querySelector('form.form'),
  body: document.querySelector('body'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]')
}
refs.form.addEventListener('click', onPromiseCreate);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
   setTimeout(()=> {
    if (shouldResolve) {
    resolve ({position, delay});
    } else {
      reject ({position, delay});
    } 
   }, delay) 
  })
  
}
function onPromiseCreate (e){
  e.preventDefault();

    let valueDelay = Number(refs.delay.value);
    let step = Number(refs.step.value);
    let amount = Number(refs.amount.value);
  
    for (let i = 1; i <= amount; i += 1) {
      
      createPromise(i, valueDelay)
        .then(({ position, delay }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        });
        valueDelay += step
    }
}
