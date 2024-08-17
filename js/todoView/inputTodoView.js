import { IS_ACTIVE } from '../constants.js';
import todoView from './todoView.js';
class InputTodoView extends todoView {
  /**
   * TODOタスク入力フォーム
   * @type {HTMLFormElement | null}
   */
  #inputForm = document.querySelector('.js_addTodo_form');
  /**
   * inputFormのTODOタスク名入力欄
   * @type {HTMLInputElement | null}
   */
  _inputName = document.querySelector('.js_addTodo_input');
  /**
   * inputFormのTODOタスク期限入力欄
   * @type {HTMLInputElement | null}
   */
  #inputDate = document.querySelector('.js_addTodo_inputDate');
  /**
   * inputFormの送信ボタン
   * @type {HTMLInputElement | null}
   */
  #submitButton = document.querySelector('.js_addTodo_submit');

  /**
   * @returns {Array<name,date>} TODOタスク名と締切
   */
  getInput() {
    const todoInputs = [this.escapeChars(this._inputName.value), this.#inputDate.value];
    this.#clearInput();
    return todoInputs;
  }

  /**
   * 送信ボタンの有効化
   */
  allowSubmit() {
    this.#submitButton.disabled = false;
    this.#submitButton.classList.add(IS_ACTIVE);
  }
  /**
   * 送信ボタンの無効化
   */
  denySubmit() {
    this.#submitButton.disabled = true;
    this.#submitButton.classList.remove(IS_ACTIVE);
  }

  /**
   * 入力欄をクリア
   */
  #clearInput() {
    this._inputName.value = '';
  }

  /**
   * 入力フォームが送信されたらhandler実行
   * @param {handler} handler
   */
  addEventListenerSubmit(handler) {
    this.#inputForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handler();
    });
  }
  /**
   * 入力フォームが入力されたらhandler実行
   * @param {handler} handler
   */
  addEventListenerInput(handler) {
    this._inputName.addEventListener('input', () => {
      handler();
    });
  }
}

export default new InputTodoView();
