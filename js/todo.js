import htmlspecialchars from 'htmlspecialchars';

let id = 0;
let todoTasks = [];

export class Todo {
  constructor(obj) {
    this.ul = obj.ul;
    this.inputValue = htmlspecialchars(obj.inputValue);
    this.counter = document.querySelector(obj.counter);
    this.id = id++;
    this.completed = false;
  }
  updateCount(){
    const incompleteTasks = todoTasks.filter((todoTask) => todoTask.completed === false);
      const incompleteCount = incompleteTasks.length;
      this.counter.innerHTML = incompleteCount;
  }
  addTodo() {
    todoTasks.push(this);
    this.updateCount();

    //li作る
    const li = document.createElement('li');
    li.className = 'todoTask__item';

    //checkButtonを作る
    const checkButton = document.createElement('button');
    checkButton.className = 'todoTask__check js_todoTask_check';

    //input作ってtodoをvalueに入れる
    const label = document.createElement('input');
    label.className = 'todoTask__label js_todoTask_label';
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
      if (e.target.classList.contains('checked')) {
        e.target.classList.remove('checked');
        this.completed = false;
        this.updateCount();
        return;
      }
      e.target.classList.add('checked');
      this.completed = true;
      this.updateCount();
    });

    //todo削除
    deleteButton.addEventListener('click', (e) => {
      e.target.parentNode.remove();
      todoTasks = todoTasks.filter((todoTask) => todoTask.id !== this.id);
      this.updateCount();
    });
  }
  updateTodo(e) {
      if (/^\S/.test(e.target.value)) {
        e.target.value = htmlspecialchars(e.target.value);
        this.inputValue = htmlspecialchars(e.target.value);
        return;
      }
      e.target.value = this.inputValue;
  }
}
