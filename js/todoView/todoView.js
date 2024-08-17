export default class todoView {
  /**
   * タスク名の入力欄
   * @type {HTMLInputElement | null}
   */
  _inputName;

  /**
   * エスケープ処理
   * @param {string} string
   * @return {string} エスケープしたstring
   */
  escapeChars(string) {
    return (
      String(string)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
    );
  }

  /**
   * @returns {hasText}
   */
  hasText() {
    return Boolean(this._inputName.value.trim());
  }
}
