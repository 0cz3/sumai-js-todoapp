import { escapeChars } from './escapeChars.js';
import { unescapeChars } from './escapeChars.js';

let id = 0;
let todoTasks = [];

export class Todo {
  /**
   * constructor、inputValueをエスケープ
   * @return {Object} インスタンス自身
   */
  constructor(obj) {
    this.ul = obj.ul;
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
   * todoを追加、DOMを変化させてtodo表示
   */
  addTodo() {
    todoTasks.push(this);
    this.updateCount();

    const li = document.createElement('li');
    li.className = 'todoTask__item';

    const checkButton = document.createElement('button');
    checkButton.className = 'todoTask__check js_todoTask_check';

    const label = document.createElement('input');
    label.className = 'todoTask__label js_todoTask_label';
    label.value = unescapeChars(this.inputValue);

    const deleteButton = document.createElement('button');
    deleteButton.className = 'todoTask__delete js_todoTask_delete';

    this.ul.appendChild(li);
    li.appendChild(checkButton);
    li.appendChild(label);
    li.appendChild(deleteButton);
  }
  toggleCompletedTodo(e) {
    if (e.currentTarget.classList.contains('checked')) {
      e.currentTarget.classList.remove('checked');
      this.completed = false;
      this.updateCount();
      return;
    }
    e.currentTarget.classList.add('checked');
    this.completed = true;
    this.updateCount();
  }
  /**
   * todoを削除
   */
  deleteTodo(e) {
    e.currentTarget.parentNode.remove();
    todoTasks = todoTasks.filter((todoTask) => todoTask.id !== this.id);
    this.updateCount();
  }
  /**
   * todoの内容を更新、入力内容が空欄の場合は更新しない
   */
  updateTodo(e) {
    if (/^\S/.test(e.currentTarget.value)) {
      e.currentTarget.value = escapeChars(e.currentTarget.value);
      this.inputValue = escapeChars(e.currentTarget.value);
      return;
    }
    e.currentTarget.value = this.inputValue;
  }
}
