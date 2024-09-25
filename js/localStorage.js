import { STORAGE_TODO_TASKS } from './constants.js';

/**
 * TODOタスクをローカルストレージへ保存
 * @function
 * @param {todoTask[]} items - TODOタスクが格納された配列
 */
export const setStorageTodoTasks = (items) => {
  try {
    localStorage.setItem(STORAGE_TODO_TASKS, JSON.stringify(items));
  } catch {
    window.alert(`データの保存に失敗しました...`);
  }
};

/**
 * ローカルストレージのデータ
 * @returns {todoTask[]}
 */
export const getStorageTodoTasks = () => {
  const items = localStorage.getItem(STORAGE_TODO_TASKS);
  return JSON.parse(items) || [];
};

/**
 * ストレージが変更されたらhandlerを実行
 * @function
 * @param {Event} handler
 */
export const addEventListenerStorage = (handler) => {
  window.addEventListener('storage', handler);
};
