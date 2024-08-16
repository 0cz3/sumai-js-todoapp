export default class RenderTodoView {
  /**
   * TODOタスクの情報
   * @type {todoTask}
   */
  #todoTask;
  /**
   * TODOタスク
   * @type {HTMLLIElement | null}
   */
  #todoTaskItem;
  /**
   * @type {HTMLButtonElement | null}
   */
  #checkButton;
  /**
   * TODOタスク名の表示
   * @type {HTMLInputElement | null}
   */
  #todoTaskLabel;
  /**
   * TODOタスク締切日の表示
   * @type {HTMLInputElement | null}
   */
  #todoDateLabel;
  /**
   * @type {HTMLButtonElement | null}
   */
  #deleteButton;
  /**
   * TODOタスクをまとめたulリスト
   * @type {HTMLUListElement | null}
   */
  #todoTaskList = document.querySelector('.js_todoTask_list');

  /**
   * TODOタスクのコンストラクタ
   * @constructor
   * @param {todoTask} todoTask
   */
  constructor(todoTask) {
    this.#todoTask = todoTask;
    this.#createTodoView();
  }

  /**
   * TODOタスクのView作成
   */
  #createTodoView() {
    // todoTaskList内の先頭に追加
    this.#todoTaskList.insertAdjacentHTML('afterbegin', this.#markup());
    this.#selectElements();
  }

  /**
   * チェックボタンのクラス名切り替え
   * @returns {id} 対象TODOタスクのid
   */
  toggleCompletedTodo() {
    this.#checkButton.classList.toggle('checked');
    return this.#todoTask.id;
  }

  /**
   * TODOタスクの名前変更
   * @returns {Array<id,name>} 対象TODOタスクのidと名前
   */
  updateTodoName() {
    /**
     * @type {name}
     */
    const name = this.#todoTaskLabel.value;
    this.#todoTaskLabel.setAttribute('value',name);
    return [this.#todoTask.id, name];
  }

  /**
   * TODOタスクの締切日変更
   * @returns {Array<id,date>} 対象TODOタスクのidと締切日
   */
  updateTodoDate() {
    /**
     * @type {date}
     */
    const date = this.#todoDateLabel.value;
    this.#todoDateLabel.setAttribute('value',date);
    return [this.#todoTask.id, date];
  }

  /**
   * TODOタスク削除
   * @returns {id} 対象TODOタスクのid
   */
  deleteTodo() {
    this.#todoTaskItem.remove();
    return this.#todoTask.id;
  }

  /**
   * TODOタスクのマークアップ
   * @returns {string}
   */
  #markup() {
    return `
        <li class="todoTask__item js_todoTask_item">
          <button class="todoTask__check js_todoTask_check ${this.#todoTask.completed ? 'checked' : ''}"></button>
          <input class="todoTask__label js_todoTask_label" value="${this.#todoTask.name}">
          <input class="todoTask__dateLabel js_todoTask_dateLabel" type="date" value="${this.#todoTask.date || ''}">
          <button class="todoTask__delete js_todoTask_delete"></button>
        </li>
      `;
  }

  /**
   * DOM要素を取得
   */
  #selectElements() {
    this.#todoTaskItem = this.#todoTaskList.querySelector('.js_todoTask_item');
    this.#checkButton = this.#todoTaskItem.querySelector('.js_todoTask_check');
    this.#todoTaskLabel = this.#todoTaskItem.querySelector('.js_todoTask_label');
    this.#todoDateLabel = this.#todoTaskItem.querySelector('.js_todoTask_dateLabel');
    this.#deleteButton = this.#todoTaskItem.querySelector('.js_todoTask_delete');
  }

  /**
   * チェックボタンがクリックされたらhandler実行
   * @param {handler} handler
   */
  addEventListenerCheck(handler) {
    this.#checkButton.addEventListener('click', () => handler(this));
  }
  /**
   * TODOタスク名が変更されたらhandler実行
   * @param {handler} handler
   */
  addEventListenerLabel(handler) {
    // TODO escape,blank-check
    this.#todoTaskLabel.addEventListener('change', () => handler(this));
  }
  /**
   * TODOタスクの締切日が変更されたらhandler実行
   * @param {handler} handler
   */
  addEventListenerDate(handler) {
    this.#todoDateLabel.addEventListener('change', () => handler(this));
  }
  /**
   * TODOタスクの削除ボタンがクリックされたらhandler実行
   * @param {handler} handler
   */
  addEventListenerDelete(handler) {
    this.#deleteButton.addEventListener('click', () => handler(this));
  }
}
