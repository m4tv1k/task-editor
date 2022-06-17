let tasks;
!localStorage.tasks ? tasks = [] :tasks = JSON.parse(localStorage.getItem('tasks'));
let  todoItemElem = [];

const saveTaskBtn = document.getElementById('save');
const createTaskBtn = document.getElementById('create-new');
const nameTaskInput = document.getElementById('task-name');
const addSubTask = document.getElementById('add-sub');
const outTodoCase = document.querySelector('.task-list__container__output');


const nameSubTaskInput = document.getElementById('sub-name');
const timeSubTaskInput = document.getElementById('time');

function addSub () {
    document.querySelector('.subtasks__form').insertAdjacentHTML(
      'beforebegin',
      `
      <div class="subtasks__form-elem">

      <input type="text" id="sub-name" placeholder="Enter subtask name  (форма из js файла)" >
      <input type="number" id="time" placeholder="0" >
      <button id="delete-sub" onclick="removeSub(this)">×</button>

  </div>
        `)
  } 

  function removeSub (input) {
    input.parentNode.remove()
  }



function newTask () {
    document.querySelector('.tasks').insertAdjacentHTML(
      'beforebegin',
      `
      <div class="newTask">
                <div class="task-name__container padding">
                    <h1>Task name</h1>
                    <input type="text" placeholder="Enter task name (форма из js файла)" class="task-name_input" id="task-name" ></input>
                </div>

                <div class="subtasks__container padding">
                    <div class="subtasks__container-nametag">
                        <h1>Subtasks</h1>
                        <button id="add-sub" onclick="addSub()">+</button>
                    </div>
                    <div class="subtasks__container__forms">
                        <div class="forms-names">
                            <div id="tag-description"><span>Description</span></div>
                            <div id="tag-time"><span>Time</span></div>
                            <div id="tag-button"><span >Button</span></div>
                        </div>
                        <div class="subtasks__form ">
                            
                            

                        </div>
                        <div class="task-btns padding">
                            <button id="save" onclick= "saveBtn()">Save task in localstorage</button>
                        </div>
                    </div>
                </div>
            </div>
        `)
        
  }


const createTemplate = (task, index) => {
    return `
            <div class="task-list__elem padding">
                <div class="task-list__elem-block">
                    <div class="task-list__logo"></div>
                    <div class="task-list__elem-col">
                        <h3>${task.name}</h3>
                        <ul>
                            <li>${task.subname} - ${task.time}h</li>
                        </ul>
                        
                    </div>   
                </div>
                <div class="task-list__button">
                    <button onclick="deleteTask(${index})" id="delete-list-elem">×</button>
                    <button id="load">LOAD</button>   
                </div>       
            </div>          
    `
}

function fillHtmlList() {
    outTodoCase.innerHTML = "";
    if (tasks.length > 0) {
        tasks.forEach((item, index) => {
            outTodoCase.innerHTML += createTemplate(item, index);
        });
        todoItemElem = document.querySelectorAll('.task-list__elem');
    }
}

fillHtmlList();

// обновление хранилища
const updLocal = () =>{
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function Task(name, subname, time) {
    this.name = name;
    this.subname = subname;
    this.time = time;
}


// кнопка добавления
saveTaskBtn.addEventListener('click', () => {
    tasks.push(new Task(nameTaskInput.value, nameSubTaskInput.value, timeSubTaskInput.value));

    updLocal();
    fillHtmlList();
    nameTaskInput.value = '';
    nameSubTaskInput.value = '';
    timeSubTaskInput.value = '';
})

// удаление одного элемента
const deleteTask = index => {      
        tasks.splice(index, 1);
        updLocal();
        fillHtmlList();
}


// const name = document.name.value;
// const subname = document.subname.value;
// const time = document.time.value;

function saveBtn(){
    tasks.push(new Task(nameTaskInput.value, nameSubTaskInput.value, timeSubTaskInput.value));

    updLocal();
    fillHtmlList();
    nameTaskInput.value = '';
    nameSubTaskInput.value = '';
    timeSubTaskInput.value = '';
}
