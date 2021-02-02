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
  }

  addEventListeners() {
    this.button.addEventListener('click', this.captureTask);
    this.input.addEventListener('keypress', (e) => {
      if(e.keyCode === 13) 
        return this.captureTask();
    });
  }

  init() {
    this.addEventListeners();
  }
}