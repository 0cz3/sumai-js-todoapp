import { IS_CLOSED } from '../constants.js';

/**
 * todoタスクの表示非表示切り替え
 */
const dropdown = (toggleButton, todoTaskList) => {
  toggleButton.addEventListener('click', (e) => {
    if (e.currentTarget.classList.contains(IS_CLOSED)) {
      e.currentTarget.classList.remove(IS_CLOSED);
      todoTaskList.classList.remove(IS_CLOSED);
      return;
    }
    e.currentTarget.classList.add(IS_CLOSED);
    todoTaskList.classList.add(IS_CLOSED);
  });
};

export default dropdown;
