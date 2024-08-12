import { STORAGE_TODO_TASKS } from './constants.js';
/**
 * TODOタスクの状態
 * @type {{ todoTasks: todoTask[]; todoTask: todoTask; }}
 */
export const state = {
  todoTasks: [],
  todoTask: {},
};

/**
 * stateのTODOタスクをローカルストレージへ保存
 * @function
 * @param {todoTask[]} items - TODOタスクが格納された配列
 */
const setStorageTodoTasks = (items) => {
  localStorage.setItem(STORAGE_TODO_TASKS, JSON.stringify(items));
};

/**
 * ローカルストレージのTODOタスクをstateへ反映
 * @function
 */
export const getStorageTodoTasks = () => {
  /**
   * ローカルストレージの保存内容
   * @type {string | null} - TODOタスク
   */
  const items = localStorage.getItem(STORAGE_TODO_TASKS);
  state.todoTasks = JSON.parse(items) || [];
};

/**
 * TODOタスクを追加
 * @function
 * @param {string} name
 * @param {string | null} date
 */
export const addTodoData = (name, date) => {
  state.todoTask = {
    name,
    date,
    id: crypto.randomUUID(),
    completed: false,
  };
  state.todoTasks = [...state.todoTasks, state.todoTask];
  setStorageTodoTasks(state.todoTasks);
};

/**
 * TODOタスクのcompleted切り替え
 * @function
 * @param {string} id
 */
export const toggleCompletedData = (id) => {
  const targetTask = state.todoTasks.find((todoTask) => todoTask.id === id);
  if (targetTask) {
    targetTask.completed = !targetTask.completed;
  }
  setStorageTodoTasks(state.todoTasks);
};

/**
 * TODOタスクのname変更
 * @function
 * @param {string} id
 * @param {string} name
 */
export const updateNameData = (id, name) => {
  const targetTask = state.todoTasks.find((todoTask) => todoTask.id === id);
  if (targetTask) {
    targetTask.name = name;
  }
  setStorageTodoTasks(state.todoTasks);
};

/**
 * TODOタスクのdate変更
 * @function
 * @param {string} id
 * @param {string | null} date
 */
export const updateDateData = (id, date) => {
  const targetTask = state.todoTasks.find((todoTask) => todoTask.id === id);
  if (targetTask) {
    targetTask.date = date;
  }
  setStorageTodoTasks(state.todoTasks);
};

/**
 * TODOタスクを削除
 * @function
 * @param {string} id
 */
export const deleteTodoData = (id) => {
  // 削除対象以外を残す
  state.todoTasks = state.todoTasks.filter((todoTask) => todoTask.id !== id);
  setStorageTodoTasks(state.todoTasks);
};
