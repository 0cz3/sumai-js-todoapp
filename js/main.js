const submitButton = document.querySelector('.js_addTodo_submit');
const ul = document.querySelector('.js_todoTask_list');
const input = document.querySelector('.js_addTodo_input');
import { Todo } from './todo.js';
import checkInput from './checkInput.js';
import dropdown from './dropdown.js';

checkInput();
input.addEventListener('input', () => {
  checkInput();
});

dropdown();

submitButton.addEventListener('click', () => {
  const newTodo = new Todo({
    ul: ul,
    inputValue: input.value,
    counter: '.js_todoTask_count',
  });
  newTodo.addTodo();
  input.value = '';
  checkInput();

  const checkButtons = document.querySelectorAll('.js_todoTask_check');
  checkButtons.forEach((checkButton) => {
    checkButton.addEventListener('click', (e) => {
      e.stopImmediatePropagation();
      newTodo.toggleCompletedTodo(e);
    });
  });

  const deleteButtons = document.querySelectorAll('.js_todoTask_delete');
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener('click', (e) => {
      e.stopImmediatePropagation();
      newTodo.deleteTodo(e);
    });
  });

  const labels = document.querySelectorAll('.js_todoTask_label');
  labels.forEach((label) => {
    label.addEventListener('change', (e) => {
      e.stopImmediatePropagation();
      newTodo.updateTodo(e);
    });
  });
});
