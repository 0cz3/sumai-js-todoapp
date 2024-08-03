import { STORAGE_TODO_TASKS } from '../constants.js';
/**
 * itemsをローカルストレージへ保存
 * @function
 * @param {Array<Todo>} items Todoオブジェクトが格納された配列 || 空配列
 */
export const setStorageTodoTasks = (items) => {
  localStorage.setItem(STORAGE_TODO_TASKS, JSON.stringify(items));
};
/**
 * ローカルストレージから呼び出し
 * @returns {Array<Todo>} Todoオブジェクトが格納された配列 || 空配列
 */
export const getStorageTodoTasks = () => {
  /**
   * ローカルストレージの保存内容
   * @type {string || null} JSON化されたTodo[] || null
   */
  const items = localStorage.getItem(STORAGE_TODO_TASKS);
  return JSON.parse(items) || [];
};
