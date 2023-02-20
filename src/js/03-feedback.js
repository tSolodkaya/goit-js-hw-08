import { throttle } from 'throttle-debounce';

const refs = {
  email: document.querySelector('input'),
  message: document.querySelector('textarea'),
  button: document.querySelector('button'),
  form: document.querySelector('form'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(500, onInput));

let formData = { email: '', message: '' };

setCurrentData();

function onInput(event) {
  formData = {
    ...formData,
    [event.target.name]: event.target.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();
  console.log(formData);
  localStorage.removeItem('feedback-form-state');
  refs.form.reset();
  formData = { email: '', message: '' };
}

function setCurrentData() {
  const currentData = JSON.parse(localStorage.getItem('feedback-form-state'));

  if (!currentData) {
    return;
  }
  refs.email.value = currentData.email;
  refs.message.value = currentData.message;

  formData = {
    email: currentData.email,
    message: currentData.message,
  };
}
