import * as todoData from './todoData.js';
import RenderTodoView from './todoView/renderTodoView.js';
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
 * @param {RenderTodoView} newTodo
 */
const controlCompleted = (newTodo) => {
  const id = newTodo.toggleCompletedTodo();
  todoData.toggleCompletedData(id);
};

/**
 * TODOタスク名変更
 * @function
 * @param {RenderTodoView} newTodo
 */
const controlTaskName = (newTodo) => {
  if (newTodo.hasText()) {
    const todoInputs = newTodo.updateTodoName();
    todoData.updateNameData(...todoInputs);
  } else {
    newTodo.denyUpdate();
  }
};

/**
 * TODOタスクの締切日変更
 * @function
 * @param {RenderTodoView} newTodo
 */
const controlDueDate = (newTodo) => {
  const todoInputs = newTodo.updateTodoDate();
  todoData.updateDateData(...todoInputs);
};

/**
 * TODOタスク削除
 * @function
 * @param {RenderTodoView} newTodo
 */
const controlDelete = (newTodo) => {
  const id = newTodo.deleteTodo();
  todoData.deleteTodoData(id);
  controlCount();
};

/**
 * TODOタスクのデータからインスタンス生成
 * @param {todoTask} todoTask
 */
const createTodoView = (todoTask) => {
  /**
   * RenderTodoViewのインスタンス
   * @type {RenderTodoView}
   */
  const newTodo = new RenderTodoView(todoTask);
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
  todoData.getStorageTodoTasks();
  todoData.state.todoTasks.forEach((todoTask) => {
    createTodoView(todoTask);
  });
  controlCount();
  InputTodoView.addEventListenerInput(controlInputTodo);
  InputTodoView.addEventListenerSubmit(controlSubmitTodo);
  dropdown.addEventListenerToggle(controlDropdown);
};

init();
