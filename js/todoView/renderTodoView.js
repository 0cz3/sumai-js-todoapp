import TodoView from './todoView.js';
class RenderTodoView extends TodoView {
  /**
   * TODOタスクをまとめたulリスト
   * @type {HTMLUListElement | null}
   */
  #todoTaskList = document.querySelector('.js_todoTask_list');

  /**
   * TODOタスクのView反映
   */
  createTodoView(markup) {
    // todoTaskList内の先頭に追加
    this.#todoTaskList.insertAdjacentHTML('afterbegin', markup);
  }
  /**
   * TODOタスクのViewを全て消去
   */
  clearTodoView() {
    this.#todoTaskList.innerHTML = '';
  }
}

export default new RenderTodoView();
