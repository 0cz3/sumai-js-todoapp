const toggle = document.querySelector('.js_todoTask_toggle');
const ul = document.querySelector('.js_todoTask_list');

/**
 * todoタスクの表示非表示切り替え
 */
const dropdown = () => {
  toggle.addEventListener('click', (e) => {
    if (e.target.classList.contains('closed')) {
      e.target.classList.remove('closed');
      ul.style.display = 'block';
      return;
    }
    e.target.classList.add('closed');
    ul.style.display = 'none';
  });
};

export default dropdown;
