function buildElement(
    elementName,
    attributes,
    text,
    handlers,
    parent,
    assign = false
  ) {
    const element = document.createElement(elementName);
  
    for (let key in attributes) {
      if (key === "classes") {
        for (let i = 0; i < attributes[key].length; i++) {
          element.classList.add(attributes[key][i]);
        }
      } else {
        element.setAttribute(key, attributes[key]);
      }
  
    }
  
    element.innerText = text;
  
    for (let key in handlers) {
      element.addEventListener(key, handlers[key]);
    }
  
    parent.appendChild(element);
  
    if(assign) {
      return element;
    }
  }

  function save() {

    let unfinishedTaskArr = [];
    let finishedTaskArr = [];

    for (let i = 0; i < taskInProgressUl.children.length; i++){
    let currentUnfinTask = {}; 
    
    currentUnfinTask.text = taskInProgressUl.children[i].getElementsByTagName('label')[0].innerText;
    currentUnfinTask.priority =  taskInProgressUl.children[i].getElementsByTagName('select')[0].value;

    unfinishedTaskArr.push(currentUnfinTask);

    }

    for (let i = 0; i < taskCompletedUl.children.length; i++){
        let currentFinTask = {}; 

        currentFinTask.text = taskCompletedUl.children[i].getElementsByTagName('label')[0].innerText;
        currentFinTask.priority =  taskCompletedUl.children[i].getElementsByTagName('select')[0].value;

        finishedTaskArr.push(currentFinTask);

        }

    localStorage.setItem('todo',JSON.stringify
    (
        {
            unfinishTask: unfinishedTaskArr,
            finishedTask: finishedTaskArr,
        }
    ));
}

function createListElement(taskTextInner,priority = 'medium', completed) {

    let taskListItem = document.createElement('li');
    taskListItem.classList.add('task-list');
    let buttonTaskChecked = buildElement('button', {classes:['button', 'task-button', 'checkButton']},null,null,taskListItem,true);
    let taskText = buildElement('label', {classes:['task-text','taskLabel']},taskTextInner,null,taskListItem,true);
   
        if (completed) {
            buttonTaskChecked.classList.add('checkedButton');
            taskText.classList.add('task-text_transparent');
        }

    let taskInput = buildElement('input', {classes:['task-input','taskInput'], value:taskTextInner},null,null,taskListItem,true);
    let buttonSelect = buildElement('select', {classes:['select', 'task-select']},null,null,taskListItem,true);
    let buttonOptionDefault= buildElement('option', {classes:['option', 'task-option']},priority,null,buttonSelect,true);
    let buttonOptionLowPriority= buildElement('option', {classes:['option', 'task-option']},'low',null,buttonSelect,true);
    let buttonOptionHighPriority= buildElement('option', {classes:['option', 'task-option']},'high',null,buttonSelect,true);
    let priorityText = buildElement('p', {classes:['priority']},'Priority: ' + buttonSelect.selectedOptions[0].innerText,null,taskListItem,true);
    let buttonTaskEdit = buildElement('button', {classes:['button', 'task-button','editButton']},'edit',null,taskListItem,true);
    let buttonTaskDelete = buildElement('button', {classes:['button', 'task-button','removeButton']},'remove',null,taskListItem,true);
   
    return taskListItem;
}



function load() {
    let test = JSON.parse(localStorage.getItem('todo'));

let taskInProgressUl = document.getElementById("taskInProgress");
let taskCompletedUl = document.getElementById("completedTask");

for(let i = 0; i < test.unfinishTask.length; i++){
    let textInList = test.unfinishTask[i].text;
    let priorityInList = test.unfinishTask[i].priority;
    let taskListItem = createListElement(textInList,priorityInList,false);
    addListenersOnButtons(taskListItem,finishTaskButton);
    taskInProgressUl.appendChild(taskListItem);
}

for(let i = 0; i < test.finishedTask.length; i++){
    let textInList = test.finishedTask[i].text;
    let priorityInList = test.finishedTask[i].priority;
    let taskListItem = createListElement(textInList,priorityInList,true);
    addListenersOnButtons(taskListItem,unfinishTaskButton);
    taskCompletedUl.appendChild(taskListItem);
} 
}

function getDefaultTasksFromAjax() {

    if(!localStorage.todo) {
  let myRequest = new XMLHttpRequest();

  myRequest.open("GET", "assets/js/tasks.json", true);
  myRequest.onreadystatechange = function() {
  
    if (myRequest.readyState === 4) {
      if (myRequest.status !== 200) {
        
        console.log(myRequest.status + ": " + myRequest.statusText); 
      } else {
         let defaultTasks = JSON.parse(myRequest.responseText);

         for(let i = 0; i < defaultTasks.length; i++){
            let textInList = defaultTasks[i].text;
            let priorityInList = defaultTasks[i].priority;
            let taskListItem = createListElement(textInList,priorityInList,false);
            taskInProgressUl.appendChild(taskListItem); 
            addListenersOnButtons(taskListItem,unfinishTaskButton);
}

save();

      }
    }

  }; 
  myRequest.send();
} 
}