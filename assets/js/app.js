let taskSetInput = document.getElementById("taskSetInput");
let taskSetButton = document.getElementById("taskSetButton");
let taskInProgressUl = document.getElementById("taskInProgress");
let taskCompletedUl = document.getElementById("completedTask");

getDefaultTasksFromAjax();
taskSetButton.addEventListener('click',addNewTask);
load();



