/**
 * TODOタスクの状態
 * @type {{ todoTasks: todoTask[]; todoTask: todoTask; }}
 */
export const state = {
  todoTasks: [],
  todoTask: {},
  filterTasks: {},
};

/**
 * stateへitemsデータ反映
 * @function
 * @param {todoTask[]} items
 */
export const importData = (items) => {
  state.todoTasks = items;
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
};

/**
 * TODOタスクのcompleted切り替え
 * @function
 * @param {string} id
 */
export const toggleCompletedData = (id) => {
  const targetTask = state.todoTasks.find((todoTask) => todoTask.id === id);
  if (targetTask) targetTask.completed = !targetTask.completed;
};

/**
 * TODOタスクのname変更
 * @function
 * @param {string} id
 * @param {string} name
 */
export const updateNameData = (id, name) => {
  const targetTask = state.todoTasks.find((todoTask) => todoTask.id === id);
  if (targetTask) targetTask.name = name;
};

/**
 * TODOタスクのdate変更
 * @function
 * @param {string} id
 * @param {string | null} date
 */
export const updateDateData = (id, date) => {
  const targetTask = state.todoTasks.find((todoTask) => todoTask.id === id);
  if (targetTask) targetTask.date = date;
};

/**
 * TODOタスクを削除
 * @function
 * @param {string} id
 */
export const deleteTodoData = (id) => {
  // 削除対象以外を残す
  state.todoTasks = state.todoTasks.filter((todoTask) => todoTask.id !== id);
};

/**
 * 絞り込み状態に応じてfilterTasksを変更
 * @function
 * @param {string} selected 絞り込み状態
 */
export const updateFilterData = (selected) => {
  switch (selected) {
    case 'all':
      state.filterTasks = state.todoTasks;
      break;
    case 'complete':
      state.filterTasks = state.todoTasks.filter((todoTask) => todoTask.completed);
      break;
    case 'incomplete':
      state.filterTasks = state.todoTasks.filter((todoTask) => !todoTask.completed);
      break;
  }
};
