import { IS_ACTIVE } from '../constants.js';

/**
 * input欄の入力状況により送信ボタンのステータスを切り替え
 * @param {string} inputValue inputfieldの入力値
 * @param {HTMLButtonElement} submitButton
 * @return {void}
 */
const toggleSubmitActive = (inputValue, submitButton) => {
  submitButton.disabled = !/^\S/.test(inputValue);
  if (/^\S/.test(inputValue)) {
    submitButton.classList.add(IS_ACTIVE);
    return;
  }
  submitButton.classList.remove(IS_ACTIVE);
};

export default toggleSubmitActive;
