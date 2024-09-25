class CountTodoView {
  /**
   * TODOタスク数の表示領域
   * @type {Element | null}
   */
  #counter = document.querySelector('.js_todoTask_count');

  /**
   * タスク数の表示を更新
   * @param {number} count - TODOタスク数
   */
  updateCount(count) {
    this.#counter.innerHTML = count;
  }
}
export default new CountTodoView();
