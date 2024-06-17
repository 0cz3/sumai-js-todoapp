const submitButton = document.querySelector('.js_addTodo_submit');
const todoTaskList = document.querySelector('.js_todoTask_list');
const inputForm = document.querySelector('.js_addTodo_form');
const inputField = document.querySelector('.js_addTodo_input');
const toggleButton = document.querySelector('.js_todoTask_toggle');
import { Todo } from './modules/todo.js';
import toggleSubmitActive from './modules/toggleSubmitActive.js';
import dropdown from './modules/dropdown.js';

const newTodoTasks = () => {
  const newTodo = new Todo({
    todoTaskList: todoTaskList,
    inputValue: inputField.value,
    counter: '.js_todoTask_count',
  });
  newTodo.addTodo();
  inputField.value = '';
  toggleSubmitActive(inputField, submitButton);
};

const submitAddEventListener = () => {
  inputField.addEventListener('input', () => {
    toggleSubmitActive(inputField, submitButton);
  });
  submitButton.addEventListener('click', () => {
    newTodoTasks();
  });
  inputForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (/^\S/.test(inputField.value)) {
      toggleSubmitActive(inputField, submitButton);
      newTodoTasks();
    }
  });
};

const init = () => {
  toggleSubmitActive(inputField, submitButton);
  dropdown(toggleButton, todoTaskList);
  submitAddEventListener(inputField, submitButton);
};

init();
