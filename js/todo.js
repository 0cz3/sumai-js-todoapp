let id = 0;
let todoTasks = [];

export class Todo {
  constructor(obj) {
    this.ul = obj.ul;
    this.inputValue = obj.inputValue;
    this.counter = document.querySelector(obj.counter);
    this.id = id++;
    this.completed = false;
  }
  addTodo() {
    todoTasks.push(this);

    const updateCount = () => {
      const incompleteTasks = todoTasks.filter((todoTask) => todoTask.completed === false);
      const incompleteCount = incompleteTasks.length;
      this.counter.innerHTML = incompleteCount;
    };
    updateCount();

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
      if (e.target.classList.contains('checked')) {
        e.target.classList.remove('checked');
        this.completed = false;
        updateCount();
        return;
      }
      e.target.classList.add('checked');
      this.completed = true;
      updateCount();
    });

    //todo削除
    deleteButton.addEventListener('click', (e) => {
      e.target.parentNode.remove();
      todoTasks = todoTasks.filter((todoTask) => todoTask.id !== this.id);
      updateCount();
    });
  }
}
