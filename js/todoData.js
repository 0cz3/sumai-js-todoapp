/**
 * TODOタスクの状態
 * @type {{ todoTasks: todoTask[]; todoTask: todoTask; }}
 */
export const state = {
  todoTasks: [],
  todoTask: {},
  sortTasks: {},
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
 * 並び替えの選択に応じてsortTasksの順番を変更
 * 配列内の順番が最後のTODOタスクがDOMの先頭に追加される
 * @function
 * @param {string} selected 絞り込み状態
 */
export const updateSortData = (selected) => {
  switch (selected) {
    case 'addedDate':
      state.sortTasks = state.todoTasks;
      break;
    case 'addedDate_reverse':
      state.sortTasks = state.todoTasks.toReversed();
      break;
    case 'dueDate': //期限が近いものを配列の最後にソート
      state.sortTasks = state.todoTasks.toSorted((a, b) => {
        //dateが等しい場合abの順でソート
        if (a.date === b.date) return -1;
        //dateが空欄の場合前にソート
        if (!a.date) return -1;
        if (!b.date) return 1;
        //降順にソート
        return new Date(b.date) - new Date(a.date);
      });
      break;
    case 'dueDate_reverse': //期限が遠いものを配列の先頭にソート
      state.sortTasks = state.todoTasks.toSorted((a, b) => {
        //dateが空欄の場合後にソート
        if (!a.date) return 1;
        if (!b.date) return -1;
        // 昇順にソート
        return new Date(a.date) - new Date(b.date);
      });
      break;
  }
};

/**
 * 絞り込みの選択に応じてfilterTasksを変更
 * @function
 * @param {string} selected 絞り込み状態
 */
export const updateFilterData = (selected) => {
  switch (selected) {
    case 'all':
      state.filterTasks = state.sortTasks;
      break;
    case 'complete':
      state.filterTasks = state.sortTasks.filter((todoTask) => todoTask.completed);
      break;
    case 'incomplete':
      state.filterTasks = state.sortTasks.filter((todoTask) => !todoTask.completed);
      break;
  }
};
