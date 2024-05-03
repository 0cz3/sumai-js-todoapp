const submitButton = document.querySelector('.js_addTodo_submit');
const toggle = document.querySelector('.js_todoTask_toggle');
const ul = document.querySelector('.js_todoTask_list');
const input = document.querySelector('.js_addTodo_input');
import { Todo } from './todo.js';

submitButton.addEventListener('click', () => {
  const newTodo = new Todo({
    ul: ul,
    inputValue: input.value,
    counter: '.js_todoTask_count',
  });
  newTodo.addTodo();
  input.value = "";
});

//ドロップダウン、closedクラスの付け外し
toggle.addEventListener('click', (e) => {
  if (e.target.classList.contains('closed')) {
    e.target.classList.remove('closed');
    ul.style.display = 'block';
    return;
  }
  e.target.classList.add('closed');
  ul.style.display = 'none';
});
