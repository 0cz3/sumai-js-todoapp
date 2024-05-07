const input = document.querySelector('.js_addTodo_input');
const submitButton = document.querySelector('.js_addTodo_submit');

const checkInput = () => {
  if (/^\S/.test(input.value)) {
    submitButton.disabled = false;
    submitButton.style.opacity = 1;
    return;
  }
  submitButton.disabled = true;
  submitButton.style.opacity = 0.5;
};

export default checkInput;
