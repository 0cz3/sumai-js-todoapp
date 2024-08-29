import * as localStorage from './localStorage.js';
import * as todoData from './todoData.js';
import TodoViewItem from './todoView/todoViewItem.js';
import InputTodoView from './todoView/inputTodoView.js';
import countTodoView from './todoView/countTodoView.js';
import * as dropdown from './modules/dropdown.js';

/**
 * TODOタスク送信許可判定
 * @function
 */
const controlInputTodo = () => {
  InputTodoView.hasText() ? InputTodoView.allowSubmit() : InputTodoView.denySubmit();
};

/**
 * TODOタスク送信処理
 * @function
 */
const controlSubmitTodo = () => {
  const todoInputs = InputTodoView.getInput();
  controlInputTodo();
  todoData.addTodoData(...todoInputs);
  localStorage.setStorageTodoTasks(todoData.state.todoTasks);
  createTodoView(todoData.state.todoTask);
};

/**
 * TODOタスク数反映
 * @function
 */
const controlCount = () => {
  countTodoView.updateCount(todoData.state.todoTasks.length);
};

/**
 * TODOタスクの完了状態変更
 * @function
 * @param {TodoViewItem} newTodo
 */
const controlCompleted = (newTodo) => {
  const id = newTodo.toggleCompletedTodo();
  todoData.toggleCompletedData(id);
  localStorage.setStorageTodoTasks(todoData.state.todoTasks);
};

/**
 * TODOタスク名変更
 * @function
 * @param {TodoViewItem} newTodo
 */
const controlTaskName = (newTodo) => {
  if (newTodo.hasText()) {
    const todoInputs = newTodo.updateTodoName();
    todoData.updateNameData(...todoInputs);
    localStorage.setStorageTodoTasks(todoData.state.todoTasks);
  } else {
    newTodo.denyUpdate();
  }
};

/**
 * TODOタスクの締切日変更
 * @function
 * @param {TodoViewItem} newTodo
 */
const controlDueDate = (newTodo) => {
  const todoInputs = newTodo.updateTodoDate();
  todoData.updateDateData(...todoInputs);
  localStorage.setStorageTodoTasks(todoData.state.todoTasks);
};

/**
 * TODOタスク削除
 * @function
 * @param {TodoViewItem} newTodo
 */
const controlDelete = (newTodo) => {
  const id = newTodo.deleteTodo();
  todoData.deleteTodoData(id);
  localStorage.setStorageTodoTasks(todoData.state.todoTasks);

  controlCount();
};

/**
 * TODOタスクのデータからインスタンス生成
 * @param {todoTask} todoTask
 */
const createTodoView = (todoTask) => {
  /**
   * TodoViewItemのインスタンス
   * @type {TodoViewItem}
   */
  const newTodo = new TodoViewItem(todoTask);
  controlCount();
  newTodo.addEventListenerCheck(controlCompleted);
  newTodo.addEventListenerLabel(controlTaskName);
  newTodo.addEventListenerDate(controlDueDate);
  newTodo.addEventListenerDelete(controlDelete);
};

/**
 * ドロップダウンでの表示非表示切り替え
 * @function
 * @param {Event} e
 */
const controlDropdown = (e) => {
  dropdown.dropdown(e);
};

/**
 * window読み込み時の処理
 * @function
 */
const init = () => {
  todoData.importData(localStorage.getStorageTodoTasks());
  todoData.state.todoTasks.forEach((todoTask) => {
    createTodoView(todoTask);
  });
  controlCount();
  InputTodoView.addEventListenerInput(controlInputTodo);
  InputTodoView.addEventListenerSubmit(controlSubmitTodo);
  dropdown.addEventListenerToggle(controlDropdown);
};

init();
