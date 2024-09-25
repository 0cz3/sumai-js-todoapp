export default class TodoView {
  /**
   * タスク名の入力欄
   * @type {HTMLInputElement | null}
   */
  _inputName;

  /**
   * セレクトボタン
   * @type {HTMLSelectElement | null}
   */
  _selectButton;

  /**
   * エスケープ処理
   * @param {string} string
   * @return {string} エスケープしたstring
   */
  escapeChars(string) {
    return String(string)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * @returns {hasText}
   */
  hasText() {
    return Boolean(this._inputName.value.trim());
  }

  /**
   * @returns {string} セレクトボタンのステータス
   */
  selected() {
    return this._selectButton.options[this._selectButton.selectedIndex].value;
  }

  /**
   * セレクトボタン変更を検知
   * @param {function} handler
   */
  selectChange(handler) {
    this._selectButton.addEventListener('change', handler.bind(this));
  }
}
