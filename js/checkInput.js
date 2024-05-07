const input = document.querySelector('.js_addTodo_input');
const submitButton = document.querySelector('.js_addTodo_submit');

/**
 * 入力内容が空欄の場合はsubmitButtonを無効化
 */
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
