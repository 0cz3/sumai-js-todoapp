const toggle = document.querySelector('.js_todoTask_toggle');
const ul = document.querySelector('.js_todoTask_list');
import { IS_CLOSED } from './constant.js';

/**
 * todoタスクの表示非表示切り替え
 */
const dropdown = () => {
  toggle.addEventListener('click', (e) => {
    if (e.currentTarget.classList.contains(IS_CLOSED)) {
      e.currentTarget.classList.remove(IS_CLOSED);
      ul.classList.remove(IS_CLOSED);
      return;
    }
    e.currentTarget.classList.add(IS_CLOSED);
    ul.classList.add(IS_CLOSED);
  });
};

export default dropdown;
