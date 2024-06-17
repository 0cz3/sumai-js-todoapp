import { escapeChars, unescapeChars } from './textUtility.js';

let id = 0;
let todoTasks = [];

export class Todo {
  /**
   * @constructor
   * @param {Object} obj
   */
  constructor(obj) {
    this.todoTaskList = obj.todoTaskList;
    this.inputValue = escapeChars(obj.inputValue);
    this.counter = document.querySelector(obj.counter);
    this.id = id++;
    this.completed = false;
  }
  /**
   * カウンターの値を未完了のtodo数に更新
   */
  updateCount() {
    const incompleteTasks = todoTasks.filter((todoTask) => todoTask.completed === false);
    const incompleteCount = incompleteTasks.length;
    this.counter.innerHTML = incompleteCount;
  }
  /**
   * todoを追加、DOMを作成
   */
  addTodo() {
    todoTasks.push(this);
    this.updateCount();

    const todoTaskItem = document.createElement('li');
    todoTaskItem.className = 'todoTask__item';

    const checkButton = document.createElement('button');
    checkButton.className = 'todoTask__check js_todoTask_check';

    const todoTaskLabel = document.createElement('input');
    todoTaskLabel.className = 'todoTask__label js_todoTask_label';
    todoTaskLabel.value = unescapeChars(this.inputValue);

    const deleteButton = document.createElement('button');
    deleteButton.className = 'todoTask__delete js_todoTask_delete';

    this.todoAddEventListeners(checkButton, todoTaskLabel, deleteButton);

    this.todoTaskList.appendChild(todoTaskItem);
    todoTaskItem.appendChild(checkButton);
    todoTaskItem.appendChild(todoTaskLabel);
    todoTaskItem.appendChild(deleteButton);
  }
  /**
   * todoの完了状態の切り替え
   * @param {Event} e
   * @return {void}
   */
  toggleCompletedTodo = (e) => {
    if (e.currentTarget.classList.contains('checked')) {
      e.currentTarget.classList.remove('checked');
      this.completed = false;
      this.updateCount();
      return;
    }
    e.currentTarget.classList.add('checked');
    this.completed = true;
    this.updateCount();
  };
  /**
   * todoを削除
   * @param {Event} e
   */
  deleteTodo = (e) => {
    e.currentTarget.parentNode.remove();
    todoTasks = todoTasks.filter((todoTask) => todoTask.id !== this.id);
    this.updateCount();
  };
  /**
   * todoの入力内容を更新
   * @param {Event} e
   * @return {void}
   */
  updateTodo = (e) => {
    if (/^\S/.test(e.currentTarget.value)) {
      this.inputValue = escapeChars(e.currentTarget.value);
      e.currentTarget.value = unescapeChars(this.inputValue);
      return;
    }
    e.currentTarget.value = unescapeChars(this.inputValue);
  };
  /**
   * todoタスクの状態変化時のイベントリスナーを追加
   * @param {HTMLInputElement} checkButton
   * @param {HTMLInputElement} todoTaskLabel
   * @param {HTMLButtonElement} deleteButton
   */
  todoAddEventListeners(checkButton, todoTaskLabel, deleteButton) {
    checkButton.addEventListener('click', this.toggleCompletedTodo);
    deleteButton.addEventListener('click', this.deleteTodo);
    todoTaskLabel.addEventListener('change', this.updateTodo);
  }
}
