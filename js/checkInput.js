const input = document.querySelector('.js_addTodo_input');
const submitButton = document.querySelector('.js_addTodo_submit');
const IS_INACTIVE = 'is-inactive';

/**
 * 入力内容が空欄の場合はsubmitButtonを無効化
 */
const checkInput = () => {
  const submitHasInactive = submitButton.classList.contains(IS_INACTIVE);
  if (/^\S/.test(input.value)) {
    submitButton.disabled = false;
    if (submitHasInactive) {
      submitButton.classList.remove(IS_INACTIVE);
    }
    return;
  }
  submitButton.disabled = true;
  if (!submitHasInactive) {
    submitButton.classList.add(IS_INACTIVE);
  }
};

export default checkInput;
