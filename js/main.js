const submitButton = document.querySelector('.js_addTodo_submit');
const todoTaskList = document.querySelector('.js_todoTask_list');
const inputField = document.querySelector('.js_addTodo_input');
import { Todo } from './modules/todo.js';
import toggleSubmitActive from './modules/toggleSubmitActive.js';
import dropdown from './modules/dropdown.js';

toggleSubmitActive();
inputField.addEventListener('input', () => {
  toggleSubmitActive();
});

dropdown();

submitButton.addEventListener('click', () => {
  const newTodo = new Todo({
    todoTaskList: todoTaskList,
    inputValue: inputField.value,
    counter: '.js_todoTask_count',
  });
  newTodo.addTodo();
  inputField.value = '';
  toggleSubmitActive();

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
      newTodo.updateTodo(e);
    });
  });
});
