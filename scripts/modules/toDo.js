export default class ToDo {
  constructor(input, button, list) {
    this.input = document.querySelector(input);
    this.button = document.querySelector(button);
    this.list = document.querySelector(list)

    this.captureTask = this.captureTask.bind(this)
  }

  captureTask() {
    if(this.input.value)
      return this.createTask(this.input.value);
    
  }

  createTask(task) {
    const li = document.createElement('li');
    li.innerText = task;
    this.list.appendChild(li);
    this.clearInput();
    this.createRemoveBtn(li);
    this.saveTasks();
  }

  clearInput() {
    this.input.value = '';
    this.input.focus();
  }

  createRemoveBtn(task) {
    const img = document.createElement('img');
    img.setAttribute('src', './assets/remove.svg');
    img.setAttribute('alt', 'Remover');
    img.setAttribute('class', 'apagar')
    task.appendChild(img);
  }

  removeTask(task) {
    task.remove();
    this.saveTasks()
  }

  saveTasks() {
    const allTasks = this.list.querySelectorAll('li');
    const tasksList = [];
    for( let task of allTasks) {
      let taskText = task.innerText;
      tasksList.push(taskText);
      console.log(tasksList)
    }

    const tasksJSON = JSON.stringify(tasksList);
    localStorage.setItem('tasks', tasksJSON)
  }

  addSavedTasks() {
    const tasks = localStorage.getItem('tasks')
    const tasksList = JSON.parse(tasks);

    for(let task of tasksList) {
      this.createTask(task);
    }
  }


  addEventListeners() {
    this.button.addEventListener('click', this.captureTask);
    this.input.addEventListener('keypress', (e) => {
      if(e.keyCode === 13) 
        return this.captureTask();
    });

    document.addEventListener('click', (e) => {
      const el = e.target;
      if(el.classList.contains('apagar')) {
        const task = el.parentElement;
        this.removeTask(task);
      }
    });
  }

  

  init() {
    this.addEventListeners();
    this.addSavedTasks();
  }
}