import { IS_CLOSED } from '../constants.js';
/**
 * todoTaskListの表示切り替えをボタン
 * @type {HTMLButtonElement | null}
 */
const toggleButton = document.querySelector('.js_todoTask_toggle');
/**
 * 追加されたTODOタスクをまとめたulリスト
 * @type {HTMLUListElement | null}
 */
const todoTaskList = document.querySelector('.js_todoTask_list');

/**
 * toggleButtonの状態とtodoTaskListの表示非表示切り替え
 * @function
 * @param {Event} e
 */
export const dropdown = (e) => {
  e.currentTarget.classList.toggle(IS_CLOSED);
  todoTaskList.classList.toggle(IS_CLOSED);
};

/**
 * toggleButtonがクリックされたらhandler実行
 * @function
 * @param {handler} handler
 */
export const addEventListenerToggle = (handler) => {
  toggleButton.addEventListener('click', (e) => {
    handler(e);
  });
};
