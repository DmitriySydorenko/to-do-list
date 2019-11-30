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

  if (assign) {
    return element;
  }
}

  function save() {
    let unfinishedTaskArr = [];
    let finishedTaskArr = [];

    Array.from(taskInProgressUl.children).forEach(elem => {
      let currentUnfinTask = {};

      currentUnfinTask.text = elem.getElementsByTagName("label")[0].innerText;
      currentUnfinTask.priority = elem.getElementsByTagName("select")[0].value;

      unfinishedTaskArr.push(currentUnfinTask);
    });

    Array.from(taskCompletedUl.children).forEach(elem => {
      let currentFinTask = {};

      currentFinTask.text = elem.getElementsByTagName("label")[0].innerText;
      currentFinTask.priority = elem.getElementsByTagName("select")[0].value;

      finishedTaskArr.push(currentFinTask);
    });

    localStorage.setItem(
      "todo",
      JSON.stringify({
        unfinishTask: unfinishedTaskArr,
        finishedTask: finishedTaskArr
      })
    );
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
  let downloadFromLocal = JSON.parse(localStorage.getItem("todo"));

  let taskInProgressUl = document.getElementById("taskInProgress");
  let taskCompletedUl = document.getElementById("completedTask");

  downloadFromLocal.unfinishTask.forEach(task => {
    let textInList = task.text;
    let priorityInList = task.priority;
    let taskListItem = createListElement(textInList, priorityInList, false);
    addListenersOnButtons(taskListItem, finishTaskButton);
    taskInProgressUl.appendChild(taskListItem);
  });

  downloadFromLocal.finishedTask.forEach(task => {
    let textInList = task.text;
    let priorityInList = task.priority;
    let taskListItem = createListElement(textInList, priorityInList, true);
    addListenersOnButtons(taskListItem, unfinishTaskButton);
    taskCompletedUl.appendChild(taskListItem);
  });
}

function getDefaultTasksFromAjax() {
  if (!localStorage.todo) {
    let myRequest = new XMLHttpRequest();

    myRequest.open("GET", "assets/js/tasks.json", true);
    myRequest.onreadystatechange = function() {
      if (myRequest.readyState === 4) {
        if (myRequest.status !== 200) {
          console.log(myRequest.status + ": " + myRequest.statusText);
        } else {
          let defaultTasks = JSON.parse(myRequest.responseText);

          defaultTasks.forEach(task => {
            let textInList = task.text;
            let priorityInList = task.priority;
            let taskListItem = createListElement(
              textInList,
              priorityInList,
              false
            );
            taskInProgressUl.appendChild(taskListItem);
            addListenersOnButtons(taskListItem, finishTaskButton);
          });

          save();
        }
      }
    };
    myRequest.send();
  }
}