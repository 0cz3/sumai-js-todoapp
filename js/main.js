const submitButton = document.querySelector('.js_addTodo_submit');
const todoTaskList = document.querySelector('.js_todoTask_list');
const inputForm = document.querySelector('.js_addTodo_form');
const inputField = document.querySelector('.js_addTodo_input');
const toggleButton = document.querySelector('.js_todoTask_toggle');
import { Todo } from './modules/todo.js';
import toggleSubmitActive from './modules/toggleSubmitActive.js';
import dropdown from './modules/dropdown.js';

/**
 * Todoインスタンス生成、入力欄の初期化
 */
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
/**
 * 入力欄の変更・送信時のイベントリスナーを追加
 */
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
      newTodoTasks();
    }
  });
};
/**
 * window読み込み時の処理を実行
 */
const init = () => {
  toggleSubmitActive(inputField, submitButton);
  dropdown(toggleButton, todoTaskList);
  submitAddEventListener();
};

init();
