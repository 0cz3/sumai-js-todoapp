/**
 * エスケープ処理
 * @param {string} string
 * @return {string} エスケープしたstring
 */
export const escapeChars = (string) => {
  return String(string)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};
/**
 * 非エスケープ処理
 * @param {string} string
 * @return {string} 非エスケープしたstring
 */
export const unescapeChars = (string) => {
  return String(string)
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '/')
    .replace(/&#039;/g, '/');
};
