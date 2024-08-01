import { Todo } from './modules/todo.js';
import { getStorageTodoTasks } from './modules/localStorage.js';
import toggleSubmitActive from './modules/toggleSubmitActive.js';
import dropdown from './modules/dropdown.js';
const submitButton = document.querySelector('.js_addTodo_submit');
const todoTaskList = document.querySelector('.js_todoTask_list');
const inputForm = document.querySelector('.js_addTodo_form');
const inputField = document.querySelector('.js_addTodo_input');
const inputDate = document.querySelector('.js_addTodo_inputDate');
const toggleButton = document.querySelector('.js_todoTask_toggle');

const setTodoTasks = () => {
  getStorageTodoTasks().map((todoTask) => {
    const newTodo = new Todo({
      todoTaskList,
      inputValue: todoTask.inputValue,
      inputDate: todoTask.inputDate,
      counter: '.js_todoTask_count',
      id: todoTask.id,
      completed: todoTask.completed,
    });
    newTodo.createTodoElements();
    newTodo.updateCount();
  });
};

/**
 * Todoインスタンス生成、入力欄の初期化
 */
const newTodoTasks = () => {
  const newTodo = new Todo({
    todoTaskList: todoTaskList,
    inputValue: inputField.value,
    inputDate: inputDate.value,
    counter: '.js_todoTask_count',
    completed: false,
  });
  newTodo.addTodo();
  inputField.value = '';
  inputDate.value = '';
  toggleSubmitActive(inputField.value, submitButton);
};

/**
 * 入力欄の変更・送信時のイベントリスナーを追加
 */
const submitAddEventListener = () => {
  inputField.addEventListener('input', () => {
    toggleSubmitActive(inputField.value, submitButton);
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
  setTodoTasks();
  dropdown(toggleButton, todoTaskList);
  submitAddEventListener();
};

init();
