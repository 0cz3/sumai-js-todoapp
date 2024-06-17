import { IS_INACTIVE } from '../constants.js';

/**
 * 入力内容が空欄の場合はsubmitButtonを無効化
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
