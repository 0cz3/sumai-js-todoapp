import { IS_CLOSED } from '../constants.js';

/**
 * todoタスクの表示非表示切り替え
 * @param {HTMLButtonElement} toggleButton
 * @param {HTMLButtonElement} todoTaskList
 * @return {void}
 */
const dropdown = (toggleButton, todoTaskList) => {
  toggleButton.addEventListener('click', ({currentTarget}) => {
    currentTarget.classList.toggle(IS_CLOSED);
    todoTaskList.classList.toggle(IS_CLOSED);
  });
};

export default dropdown;