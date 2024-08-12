class InputTodoView {
  /**
   * TODOタスク入力フォーム
   * @type {HTMLFormElement | null}
   */
  #inputForm = document.querySelector('.js_addTodo_form');
  /**
   * inputFormのTODOタスク名入力欄
   * @type {HTMLInputElement | null}
   */
  #inputField = document.querySelector('.js_addTodo_input');
  /**
   * inputFormのTODOタスク期限入力欄
   * @type {HTMLInputElement | null}
   */
  #inputDate = document.querySelector('.js_addTodo_inputDate');

  /**
   * @returns {Array<name,date>} TODOタスク名と締切
   */
  getInput() {
    // TODO escape,blank-check
    const todoInputs = [this.#inputField.value, this.#inputDate.value];
    this.#clearInput();
    return todoInputs;
  }

  /**
   * 入力欄をクリア
   */
  #clearInput() {
    this.#inputField.value = '';
  }

  /**
   * 入力フォームが送信されたらhandler実行
   * @param {handler} handler
   */
  addEventListenerInput(handler) {
    this.#inputForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handler();
    });
  }
}

export default new InputTodoView();
