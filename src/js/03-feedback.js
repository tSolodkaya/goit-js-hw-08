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
  try {
    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
}

function onFormSubmit(event) {
  event.preventDefault();
  console.log(formData);
  try {
    localStorage.removeItem('feedback-form-state');
  } catch (erorr) {
    console.error('Set state error: ', error.message);
  }

  refs.form.reset();
  formData = { email: '', message: '' };
}

function setCurrentData() {
  let currentData;
  try {
    currentData = JSON.parse(localStorage.getItem('feedback-form-state'));
  } catch (error) {
    console.error('Set state error: ', error.message);
  }

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
