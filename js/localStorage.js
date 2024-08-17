import { STORAGE_TODO_TASKS } from './constants.js';

/**
 * TODOタスクをローカルストレージへ保存
 * @function
 * @param {todoTask[]} items - TODOタスクが格納された配列
 */
export const setStorageTodoTasks = (items) => {
  localStorage.setItem(STORAGE_TODO_TASKS, JSON.stringify(items));
};

/**
 * ローカルストレージのデータ
 * @returns {todoTask[]}
 */
export const getStorageTodoTasks = () => {
  const items = localStorage.getItem(STORAGE_TODO_TASKS);
  return JSON.parse(items) || [];
};
