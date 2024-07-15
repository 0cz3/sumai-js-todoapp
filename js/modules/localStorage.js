import { STORAGE_TODO_TASKS } from '../constants.js';

export const setStorageTodoTasks = (todoTasks) => {
  localStorage.setItem(STORAGE_TODO_TASKS, JSON.stringify(todoTasks));
};

export const getStorageTodoTasks = () => {
  const getItems = localStorage.getItem(STORAGE_TODO_TASKS);
  return JSON.parse(getItems) || [];
};