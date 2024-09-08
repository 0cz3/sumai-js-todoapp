import * as localStorage from './localStorage.js';
import * as todoData from './todoData.js';
import TodoViewItem from './todoView/todoViewItem.js';
import InputTodoView from './todoView/inputTodoView.js';
import RenderTodoView from './todoView/renderTodoView.js';
import countTodoView from './todoView/countTodoView.js';
import * as dropdown from './modules/dropdown.js';
import FilterTodoView from './todoView/filterTodoView.js';
import SortTodoView from './todoView/sortTodoView.js';

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
  controlSelect();
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
  controlSelect();
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
  RenderTodoView.createTodoView(newTodo.markup());
  controlCount();
  newTodo.selectElements();
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
 * 絞り込み処理
 * @function
 */
const controlSelect = () => {
  todoData.updateSortData(SortTodoView.selected());
  todoData.updateFilterData(FilterTodoView.selected());
  RenderTodoView.clearTodoView();
  todoData.state.filterTasks.forEach((todoTask) => {
    createTodoView(todoTask);
  });
};

/**
 * window読み込み時の処理
 * @function
 */
const init = () => {
  todoData.importData(localStorage.getStorageTodoTasks());
  todoData.state.sortTasks = todoData.state.todoTasks;
  todoData.state.todoTasks.forEach((todoTask) => {
    createTodoView(todoTask);
  });
  controlCount();
  InputTodoView.addEventListenerInput(controlInputTodo);
  InputTodoView.addEventListenerSubmit(controlSubmitTodo);
  dropdown.addEventListenerToggle(controlDropdown);
  [FilterTodoView, SortTodoView].forEach((select) => select.selectChange(controlSelect));
};

init();
