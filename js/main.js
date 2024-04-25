const submitButton = document.querySelector('.js_addTodo_submit');
const toggle = document.querySelector('.js_todoTask_toggle');
const ul = document.querySelector('.js_todoTask_list');

submitButton.addEventListener('click', () => {
  const inputValue = document.querySelector('.js_addTodo_input').value;
  document.querySelector('.js_addTodo_input').value = '';

  //li作る
  const li = document.createElement('li');
  li.className = 'todoTask__item';

  //checkButtonを作る
  const checkButton = document.createElement('button');
  checkButton.className = 'todoTask__check js_todoTask_check';

  //input作ってtodoをvalueに入れる
  const label = document.createElement('input');
  label.className = 'todoTask__label';
  label.value = inputValue;

  //deleteButtonを作る
  const deleteButton = document.createElement('button');
  deleteButton.className = 'todoTask__delete js_todoTask_delete';

  //ulに入れる
  ul.appendChild(li);
  li.appendChild(checkButton);
  li.appendChild(label);
  li.appendChild(deleteButton);

  //checkedクラスの付け外し
  checkButton.addEventListener('click', (e) => {
    e.target.classList.contains('checked') ? e.target.classList.remove('checked') : e.target.classList.add('checked');
  });

  //todo削除
  deleteButton.addEventListener('click', (e) => {
    e.target.parentNode.remove();
  });
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
