const submitButton = document.querySelector('.js_addTodo_submit');
const ul = document.querySelector('.js_todoTask_list');
const input = document.querySelector('.js_addTodo_input');
import { Todo } from './todo.js';
import checkInput from './checkInput.js';
import dropdown from './dropdown.js';

checkInput();
dropdown();

input.addEventListener('input', () => {
  checkInput();
});

submitButton.addEventListener('click', () => {
  const newTodo = new Todo({
    ul: ul,
    inputValue: input.value,
    counter: '.js_todoTask_count',
  });
  newTodo.addTodo();
  input.value = '';
  checkInput();

  

  const label = document.querySelector('.js_todoTask_label');
  label.addEventListener('change', (e) => {
    newTodo.updateTodo(e);
  });
});
