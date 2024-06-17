/**
 * エスケープ処理を実行
 * @param {string} str
 * @return {string}
 */
export const escapeChars = (str) => {
  if (str == null) return '';

  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};
/**
 * 非エスケープ処理を実行
 * @param {string} str
 * @return {string}
 */
export const unescapeChars = (str) => {
  if (str == null) return '';

  return String(str)
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '/')
    .replace(/&#039;/g, '/');
};
