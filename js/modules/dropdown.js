import { IS_CLOSED } from '../constants.js';

/**
 * todoタスクの表示非表示切り替え
 * @param {HTMLButtonElement} toggleButton
 * @param {HTMLButtonElement} todoTaskList
 * @return {void}
 */
const dropdown = (toggleButton, todoTaskList) => {
  toggleButton.addEventListener('click', ({currentTarget}) => {
    if (currentTarget.classList.contains(IS_CLOSED)) {
      currentTarget.classList.remove(IS_CLOSED);
      todoTaskList.classList.remove(IS_CLOSED);
      return;
    }
    currentTarget.classList.add(IS_CLOSED);
    todoTaskList.classList.add(IS_CLOSED);
  });
};

export default dropdown;
