let id = 0;
export class Todo {
  constructor(obj) {
    this.ul = document.querySelector(obj.ul);
    this.inputValue = document.querySelector(obj.inputValue).value;
    this.counter = document.querySelector(obj.counter);
    this.id = id++;
  }
  addTodo() {
    this.counter.innerHTML = id;
    //li作る
    const li = document.createElement('li');
    li.className = 'todoTask__item';

    //checkButtonを作る
    const checkButton = document.createElement('button');
    checkButton.className = 'todoTask__check js_todoTask_check';

    //input作ってtodoをvalueに入れる
    const label = document.createElement('input');
    label.className = 'todoTask__label';
    label.value = this.inputValue;

    //deleteButtonを作る
    const deleteButton = document.createElement('button');
    deleteButton.className = 'todoTask__delete js_todoTask_delete';

    //ulに入れる
    this.ul.appendChild(li);
    li.appendChild(checkButton);
    li.appendChild(label);
    li.appendChild(deleteButton);

    checkButton.addEventListener('click', (e) => {
      e.target.classList.contains('checked') ? e.target.classList.remove('checked') : e.target.classList.add('checked');
    });

    //todo削除
    deleteButton.addEventListener('click', (e) => {
      e.target.parentNode.remove();
    });
  }
}


