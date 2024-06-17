import { escapeChars, unescapeChars } from './textUtility.js';

let id = 0;
let todoTasks = [];

export class Todo {
  /**
   * constructor、inputValueをエスケープ
   * @return {Object} インスタンス自身
   */
  constructor(obj) {
    this._todoTaskList = obj.todoTaskList;
    this._inputValue = escapeChars(obj.inputValue);
    this._counter = document.querySelector(obj.counter);
    this._id = id++;
    this._completed = false;
  }
  /**
   * カウンターの値を未完了のtodo数に更新
   */
  updateCount() {
    const incompleteTasks = todoTasks.filter((todoTask) => todoTask._completed === false);
    const incompleteCount = incompleteTasks.length;
    this._counter.innerHTML = incompleteCount;
  }
  /**
   * todoを追加、DOMを変化させてtodo表示
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
    todoTaskLabel.value = unescapeChars(this._inputValue);

    const deleteButton = document.createElement('button');
    deleteButton.className = 'todoTask__delete js_todoTask_delete';
    
    this.addEventListeners(checkButton, todoTaskLabel, deleteButton);
    
    this._todoTaskList.appendChild(todoTaskItem);
    todoTaskItem.appendChild(checkButton);
    todoTaskItem.appendChild(todoTaskLabel);
    todoTaskItem.appendChild(deleteButton);
  }
  toggleCompletedTodo = (e) => {
    if (e.currentTarget.classList.contains('checked')) {
      e.currentTarget.classList.remove('checked');
      this._completed = false;
      this.updateCount();
      return;
    }
    e.currentTarget.classList.add('checked');
    this._completed = true;
    this.updateCount();
  };
  /**
   * todoを削除
   */
  deleteTodo = (e) => {
    e.currentTarget.parentNode.remove();
    todoTasks = todoTasks.filter((todoTask) => todoTask._id !== this._id);
    this.updateCount();
  };
  /**
   * todoの内容を更新、入力内容が空欄の場合は更新しない
   */
  updateTodo = (e) => {
    if (/^\S/.test(e.currentTarget.value)) {
      e.currentTarget.value = escapeChars(e.currentTarget.value);
      this._inputValue = escapeChars(e.currentTarget.value);
      return;
    }
    e.currentTarget.value = this._inputValue;
  };
  addEventListeners(checkButton, todoTaskLabel, deleteButton) {
    checkButton.addEventListener('click', this.toggleCompletedTodo);
    deleteButton.addEventListener('click', this.deleteTodo);
    todoTaskLabel.addEventListener('change', this.updateTodo);
  }
}
