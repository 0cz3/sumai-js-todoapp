class FilterTodoView {
  /**
   * 絞り込みボタン
   * @type {HTMLSelectElement | null}
   */
  #filterButton = document.querySelector('.js_todoTask_filter');

  /**
   * @returns {string} 絞り込みボタンのステータス
   */
  selected() {
    return this.#filterButton.options[this.#filterButton.selectedIndex].value;
  }

 /**
  * 絞り込みボタン変更を検知
  * @param {function} handler
  */
  filterChange(handler) {
    this.#filterButton.addEventListener('change', handler.bind(this));
  }
}
export default new FilterTodoView();
