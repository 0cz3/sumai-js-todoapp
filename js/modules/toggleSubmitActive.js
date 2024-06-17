import { IS_INACTIVE } from '../constants.js';

/**
 * input欄の入力状況により送信ボタンのステータスを切り替え
 * @param {HTMLInputElement} inputField
 * @param {HTMLButtonElement} submitButton
 * @return {void}
 */
const toggleSubmitActive = (inputField, submitButton) => {
  const submitHasInactive = submitButton.classList.contains(IS_INACTIVE);
  if (/^\S/.test(inputField.value)) {
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

export default toggleSubmitActive;
