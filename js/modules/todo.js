import { escapeChars, unescapeChars } from './textUtility.js';
import { getStorageTodoTasks, setStorageTodoTasks } from './localStorage.js';

export class Todo {
  static todoTasks = getStorageTodoTasks();
  /**
   * @constructor
   * @param {Object} obj
   */
  constructor(obj) {
    this.todoTaskList = obj.todoTaskList;
    this.inputValue = escapeChars(obj.inputValue);
    this.inputDate = obj.inputDate;
    this.counter = document.querySelector(obj.counter);
    this.id = obj.id || crypto.randomUUID();
    this.completed = obj.completed;
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
    this.createTodoElements();
    setStorageTodoTasks(Todo.todoTasks);
    this.updateCount();
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
    //無駄な記述が多い、後でなんとかしたい
    const todoTaskItem = createTodoElement('li', 'todoTask__item js_todoTask_item');
    const checkButton = createTodoElement(
      'button',
      this.completed ? 'todoTask__check js_todoTask_check checked' : 'todoTask__check js_todoTask_check'
    );
    const todoTaskLabel = createTodoElement('input', 'todoTask__label js_todoTask_label');
    todoTaskLabel.value = unescapeChars(this.inputValue);
    const todoDateLabel = createTodoElement('input', 'todoTask__dateLabel js_todoTask_dateLabel');
    todoDateLabel.setAttribute('type', 'date');
    todoDateLabel.value = this.inputDate;
    const deleteButton = createTodoElement('button', 'todoTask__delete js_todoTask_delete');

    todoTaskItem.appendChild(checkButton);
    todoTaskItem.appendChild(todoTaskLabel);
    todoTaskItem.appendChild(todoDateLabel);
    todoTaskItem.appendChild(deleteButton);
    this.todoTaskList.appendChild(todoTaskItem);

    this.todoAddEventListeners(checkButton, todoTaskLabel, todoDateLabel, deleteButton);
  }
  /**
   * todoの完了状態の切り替え
   * @param {Event} e
   * @return {void}
   */
  //メソッドにアロー関数使ってしまっている、bind使った方がいいのかも
  toggleCompletedTodo = ({ currentTarget }) => {
    //何だかネストが深い
    Todo.todoTasks.map((todoTask) => {
      if (todoTask.id === this.id) {
        todoTask.completed = !todoTask.completed;
        if (todoTask.completed) {
          currentTarget.classList.add('checked');
          return;
        }
        currentTarget.classList.remove('checked');
      }
    });
    setStorageTodoTasks(Todo.todoTasks);
    this.updateCount();
  };
  /**
   * todoを削除
   * @param {Event} e
   */
  deleteTodo = ({ currentTarget }) => {
    currentTarget.closest('.js_todoTask_item').remove();
    Todo.todoTasks = Todo.todoTasks.filter((todoTask) => todoTask.id !== this.id);
    setStorageTodoTasks(Todo.todoTasks);
    this.updateCount();
  };
  /**
   * todoの入力内容を更新
   * @param {Event} e
   * @return {void}
   */
  updateTodo = ({ currentTarget }) => {
    const isDate = currentTarget.type === 'date';
    const updateDate = (todoTask) => {
      todoTask.inputDate = currentTarget.value;
      setStorageTodoTasks(Todo.todoTasks);
    };
    const updateValue = (todoTask) => {
      if (/^\S/.test(currentTarget.value)) {
        todoTask.inputValue = escapeChars(currentTarget.value);
        setStorageTodoTasks(Todo.todoTasks);
      }
      currentTarget.value = unescapeChars(todoTask.inputValue);
    };
    Todo.todoTasks.map((todoTask) => {
      if (todoTask.id === this.id) {
        if (isDate) {
          updateDate(todoTask);
          return;
        }
        updateValue(todoTask);
      }
    });
  };
  /**
   * todoタスクの状態変化時のイベントリスナーを追加
   * @param {HTMLInputElement} checkButton
   * @param {HTMLInputElement} todoTaskLabel
   * @param {HTMLInputElement} todoDateLabel
   * @param {HTMLButtonElement} deleteButton
   */
  //onChangeでイベント分岐させた方が見やすいかも
  todoAddEventListeners(checkButton, todoTaskLabel, todoDateLabel, deleteButton) {
    checkButton.addEventListener('click', this.toggleCompletedTodo);
    todoTaskLabel.addEventListener('change', this.updateTodo);
    todoDateLabel.addEventListener('change', this.updateTodo);
    deleteButton.addEventListener('click', this.deleteTodo);
  }
}
