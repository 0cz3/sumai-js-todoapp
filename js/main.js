import { Todo } from './modules/todo.js';
import { getStorageTodoTasks } from './modules/localStorage.js';
import toggleSubmitActive from './modules/toggleSubmitActive.js';
import dropdown from './modules/dropdown.js';
/**
 * TODOタスク入力フォーム
 * @type {HTMLFormElement | null}
 */
const inputForm = document.querySelector('.js_addTodo_form');
/**
 * inputFormのTODOタスク名入力欄
 * @type {HTMLInputElement | null}
 */
const inputField = document.querySelector('.js_addTodo_input');
/**
 * inputFormのTODOタスク期限入力欄
 * @type {HTMLInputElement | null}
 */
const inputDate = document.querySelector('.js_addTodo_inputDate');
/**
 * inputFormの送信ボタン
 * @type {HTMLInputElement | null}
 */
const submitButton = document.querySelector('.js_addTodo_submit');
/**
 * 追加されたTODOタスクをまとめたulリスト
 * @type {HTMLUListElement | null}
 */
const todoTaskList = document.querySelector('.js_todoTask_list');
/**
 * todoTaskListの表示切り替えをボタン
 * @type {HTMLUListElement | null}
 */
const toggleButton = document.querySelector('.js_todoTask_toggle');
/**
 * ストレージからタスクの情報を呼び出して反映
 */
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
