import { escapeChars, unescapeChars } from './textUtility.js';
import { getStorageTodoTasks, setStorageTodoTasks } from './localStorage.js';

export class Todo {
  /**
   * Todoオブジェクトが格納された配列 || 空配列
   * @type {Array<Todo>}
   */
  static storageTodoTasks = getStorageTodoTasks();
  /**
   * TODOタスク
   * @constructor
   * @param {Object} obj 各プロパティの設定値
   */
  constructor(obj) {
    //プロパティで受け取らない方がが良いかも
    /**
     * 追加されたTODOタスクをまとめたulリスト
     * @type {Element || null}
     */
    this.todoTaskList = obj.todoTaskList;
    /**
     * @type {string || null} TODOタスク名入力値
     */
    this.inputValue = escapeChars(obj.inputValue);
    /**
     * TODOタスク期限入力値
     * @type {string}
     */
    this.inputDate = obj.inputDate;

    //プロパティで受け取らない方がが良いかも
    /**
     * TODOタスク数の表示領域
     * @type {Element || null}
     */
    this.counter = document.querySelector(obj.counter);
    /**
     * TODOタスクのid、新規の場合は生成
     * @type {string}
     */
    this.id = obj.id || crypto.randomUUID();
    /**
     * TODOタスクの完了状態、初期値はfalse
     * @type {boolean}
     */
    this.completed = obj.completed;
  }

  // 完了状態問わずTODOタスク数に反映させても良いかも
  /**
   * カウンターの値を未完了のTODOタスク数に更新
   */
  updateCount() {
    /**
     * storageTodoTasks内の未完了タスク
     * @type {Array<Todo>}
     */
    const incompleteTasks = Todo.storageTodoTasks.filter((todoTask) => !todoTask.completed);
    //counterの表示をincompleteTasks数に変更
    this.counter.innerHTML = incompleteTasks.length;
  }
  /**
   * TODOタスクを追加
   */
  addTodo() {
    // storageTodoTasksにTodoインスタンスを追加
    Todo.storageTodoTasks = [...Todo.storageTodoTasks, this];
    this.createTodoElements();
    setStorageTodoTasks(Todo.storageTodoTasks);
    this.updateCount();
  }
  /**
   * TODOタスクのDOMを作成
   */
  createTodoElements() {
    /**
     * HTML要素を作成
     * @param {string} tag
     * @param {string} className
     * @returns {Element} 作成したHTML要素
     */
    const createTodoElement = (tag, className) => {
      /**
       * @type {Element} tagで指定されたHTML要素
       */
      const todoElement = document.createElement(tag);
      todoElement.className = className;
      return todoElement;
    };
    //無駄な記述が多い、後でなんとかしたい、各値をオブジェクトに定義して一連の処理を行うと見やすくなるかも
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

    //todoTaskItemに各HTML要素を追加
    todoTaskItem.appendChild(checkButton);
    todoTaskItem.appendChild(todoTaskLabel);
    todoTaskItem.appendChild(todoDateLabel);
    todoTaskItem.appendChild(deleteButton);
    this.todoTaskList.prepend(todoTaskItem);

    this.todoAddEventListeners(checkButton, todoTaskLabel, todoDateLabel, deleteButton);
  }
  /**
   * Todoタスクの完了状態の切り替え
   * @param {Event} e
   */
  toggleCompletedTodo = (e) => {
    /**
     * イベントが起きたTodoインスタンスと同一idのローカルストレージのTodo
     */
    const targetTask = Todo.storageTodoTasks.find((todoTask) => todoTask.id === this.id);
    if (targetTask) {
      //完了状態とクラス名checkedを切り替え
      targetTask.completed = !targetTask.completed;
      e.currentTarget.classList.toggle('checked');
    }
    setStorageTodoTasks(Todo.storageTodoTasks);
    this.updateCount();
  };
  /**
   * TODOタスクを削除
   * @param {Event} e
   */
  deleteTodo = (e) => {
    // イベントが起きた削除ボタンのTODOタスクのHTML要素を削除
    e.currentTarget.closest('.js_todoTask_item').remove();
    // ローカルストレージのTODOタスクから対象TODOタスクを削除
    Todo.storageTodoTasks = Todo.storageTodoTasks.filter((todoTask) => todoTask.id !== this.id);
    setStorageTodoTasks(Todo.storageTodoTasks);
    this.updateCount();
  };
  /**
   * TODOタスク内容を更新
   * @param {Event} e
   */
  updateTodoValue = (e) => {
    /**
     * イベントが起きたTODOインスタンスと同一idのローカルストレージのTODO
     */
    const targetTask = Todo.storageTodoTasks.find((todoTask) => todoTask.id === this.id);
    if (targetTask) {
      //入力値が空白文字以外で始まる場合
      if (/^\S/.test(e.currentTarget.value)) {
        //ローカルストレージのTODO内容更新
        targetTask.inputValue = escapeChars(e.currentTarget.value);
        setStorageTodoTasks(Todo.storageTodoTasks);
      }
      //イベントが起きたinput要素の値をローカルストレージのTODOの既存の値で上書き（わかりにくい）
      e.currentTarget.value = unescapeChars(targetTask.inputValue);
    }
  };
  /**
   * TODOタスクの期日を更新
   * @param {Event} e
   */
  updateTodoDate = (e) => {
    /**
     * イベントが起きたTODOインスタンスと同一idのローカルストレージのTODO
     */
    const targetTask = Todo.storageTodoTasks.find((todoTask) => todoTask.id === this.id);
    if (targetTask) {
      //ローカルストレージのTODO内容更新
      targetTask.inputDate = e.currentTarget.value;
      setStorageTodoTasks(Todo.storageTodoTasks);
    }
  };
  /**
   * todoの状態変化ごとに処理を呼び出し
   * @param {Element} checkButton
   * @param {Element} todoTaskLabel
   * @param {Element} todoDateLabel
   * @param {Element} deleteButton
   */
  todoAddEventListeners(checkButton, todoTaskLabel, todoDateLabel, deleteButton) {
    checkButton.addEventListener('click', this.toggleCompletedTodo);
    todoTaskLabel.addEventListener('change', this.updateTodoValue);
    todoDateLabel.addEventListener('change', this.updateTodoDate);
    deleteButton.addEventListener('click', this.deleteTodo);
  }
}
