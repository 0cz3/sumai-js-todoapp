import { escapeChars, unescapeChars } from './textUtility.js';

export class Todo {
  static id = 0;
  static todoTasks = [];
  /**
   * @constructor
   * @param {Object} obj
   */
  constructor({ todoTaskList, inputValue, counter }) {
    this.todoTaskList = todoTaskList;
    this.inputValue = escapeChars(inputValue);
    this.counter = document.querySelector(counter);
    this.id = Todo.id++;
    this.completed = false;
  }
  /**
   * カウンターの値を未完了のtodo数に更新
   */
  updateCount() {
    const incompleteTasks = Todo.todoTasks.filter((todoTask) => !todoTask.completed);
    const incompleteCount = incompleteTasks.length;
    this.counter.innerHTML = incompleteCount;
  }
  /**
   * todoを追加
   */
  addTodo() {
    Todo.todoTasks = [...Todo.todoTasks, this];
    this.updateCount();
    this.createTodoElements();
  }
  /**
   * todoのDOMを作成
   */
  createTodoElements() {
    /**
     * HTMLエレメントを作成
     * @param {tagName} tag
     * @param {string} className
     * @return {HTMLElement}
     */
    const createTodoElement = (tag, className) => {
      const todoElement = document.createElement(tag);
      todoElement.className = className;
      return todoElement;
    };

    const todoTaskItem = createTodoElement('li', 'todoTask__item js_todoTask_item');
    const checkButton = createTodoElement('button', 'todoTask__check js_todoTask_check');
    const todoTaskLabel = createTodoElement('input', 'todoTask__label js_todoTask_label');
    todoTaskLabel.value = unescapeChars(this.inputValue);
    const deleteButton = createTodoElement('button', 'todoTask__delete js_todoTask_delete');

    todoTaskItem.appendChild(checkButton);
    todoTaskItem.appendChild(todoTaskLabel);
    todoTaskItem.appendChild(deleteButton);
    this.todoTaskList.appendChild(todoTaskItem);

    this.todoAddEventListeners(checkButton, todoTaskLabel, deleteButton);
  }
  /**
   * todoの完了状態の切り替え
   * @param {Event} e
   * @return {void}
   */
  toggleCompletedTodo = ({ currentTarget }) => {
    this.completed = !currentTarget.classList.contains('checked');
    this.updateCount();
    if (this.completed) {
      currentTarget.classList.add('checked');
      return;
    }
    currentTarget.classList.remove('checked');
  };
  /**
   * todoを削除
   * @param {Event} e
   */
  deleteTodo = ({ currentTarget }) => {
    currentTarget.closest('.js_todoTask_item').remove();
    Todo.todoTasks = Todo.todoTasks.filter((todoTask) => todoTask.id !== this.id);
    this.updateCount();
  };
  /**
   * todoの入力内容を更新
   * @param {Event} e
   * @return {void}
   */
  updateTodo = ({ currentTarget }) => {
    if (/^\S/.test(currentTarget.value)) {
      this.inputValue = escapeChars(currentTarget.value);
    }
    currentTarget.value = unescapeChars(this.inputValue);
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
