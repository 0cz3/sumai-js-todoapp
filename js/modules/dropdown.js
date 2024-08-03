import { IS_CLOSED } from '../constants.js';
/**
 * toggleButtonクリックでtoggleButtonの状態とtodoTaskListの表示非表示切り替え
 * @function
 * @param {Element|null} toggleButton
 * @param {Element|null} todoTaskList
 */
const dropdown = (toggleButton, todoTaskList) => {
  toggleButton.addEventListener('click', (e) => {
    e.currentTarget.classList.toggle(IS_CLOSED);
    todoTaskList.classList.toggle(IS_CLOSED);
  });
};

export default dropdown;
