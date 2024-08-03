import { IS_ACTIVE } from '../constants.js';
/**
 * inputValueが空欄か判定し、submitButtonの状態切り替え
 * @param {string} inputValue 入力値
 * @param {Element|null} submitButton 送信ボタン
 * @returns {void}
 */
const toggleSubmitActive = (inputValue, submitButton) => {
  /**
   * 入力値が空白文字以外で始まるか
   * @type {boolean}
   */
  const isFilled = /^\S/.test(inputValue);
  // 送信ボタンの活性状態切り替え
  submitButton.disabled = !isFilled;
  // 送信ボタンのスタイル切り替え
  if (isFilled) {
    submitButton.classList.add(IS_ACTIVE);
    return;
  }
  submitButton.classList.remove(IS_ACTIVE);
};

export default toggleSubmitActive;
