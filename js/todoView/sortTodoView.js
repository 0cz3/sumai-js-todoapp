import TodoView from './todoView.js';
class SortTodoView extends TodoView {
  /**
   * 絞り込みボタン
   * @type {HTMLSelectElement | null}
   */
  _selectButton = document.querySelector('.js_todoTask_sort');

  /**
   * @returns {string} 絞り込みボタンのステータス
   */
  selected() {
    return this._selectButton.options[this._selectButton.selectedIndex].value;
  }

 /**
  * 絞り込みボタン変更を検知
  * @param {function} handler
  */
  selectChange(handler) {
    this._selectButton.addEventListener('change', handler.bind(this));
  }
}
export default new SortTodoView();