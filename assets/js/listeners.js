function addNewTask() {
    if(taskSetInput.value){
    let taskListItem = createListElement(taskSetInput.value);
    taskInProgressUl.appendChild(taskListItem);
    addListenersOnButtons(taskListItem,finishTaskButton);
    taskSetInput.value = "";
    save();
}
};


function addListenersOnButtons(taskListItem,buttonTaskCheckEvent){
    let buttonTaskEdit = taskListItem.querySelector('.editButton');
    let buttonTaskDelete = taskListItem.querySelector('.removeButton');
    let buttonTaskChecked = taskListItem.querySelector('.checkButton');

    buttonTaskEdit.addEventListener('click',editTaskButton);
    buttonTaskDelete.addEventListener('click',removeTaskButton);
    buttonTaskChecked.addEventListener('click',buttonTaskCheckEvent);
}


function finishTaskButton(){
    let listItem = this.parentElement;
    let taskText = listItem.querySelector('.task-text');
    taskText.classList.add('task-text_transparent');
    let buttonTaskChecked = listItem.querySelector('.checkButton');
    taskCompletedUl.appendChild(listItem);
    buttonTaskChecked.classList.add('checkedButton');
    buttonTaskChecked.removeEventListener('click', finishTaskButton);

    save();
    addListenersOnButtons(listItem,unfinishTaskButton);
    
    
    };
    
    function unfinishTaskButton(){
        let listItem = this.parentElement;
        let taskText = listItem.querySelector('.task-text');
        taskText.classList.remove('task-text_transparent');
        let buttonTaskChecked = listItem.querySelector('.checkButton');
        buttonTaskChecked.classList.remove('checkedButton');
        taskInProgressUl.appendChild(listItem);

        buttonTaskChecked.removeEventListener('click', unfinishTaskButton);
        save();
        addListenersOnButtons(listItem,finishTaskButton);
    }
    
    function editTaskButton(){
        let buttonSelect = document.querySelector('.task-select');
        let priorityText = document.querySelector('.priority');

        let editButton = this;
        let listItem = this.parentElement;
        let label = listItem.querySelector('.taskLabel');
        let input = listItem.querySelector('.taskInput');
    
        let containClass = listItem.classList.contains('editMode');
    
        if(containClass) {
            label.innerText = input.value;
            editButton.innerHTML = "edit";
        } else  {
            input.value = label.innerText;
            editButton.innerHTML = "save";
        }
        //input.value = '';
        priorityText.innerHTML = 'Priority: ' + buttonSelect.options[buttonSelect.selectedIndex].value;

        listItem.classList.toggle('editMode');
        save();
    };
    
    function removeTaskButton(){
        let delConfirmAccepted = confirm('Are you sure you want to remove your task?');
        if (delConfirmAccepted) {
        let selectedListItem = this.parentElement;
        let selectedList = selectedListItem.parentElement;
        selectedList.removeChild(selectedListItem);
        save();
        } else {
            alert('canceled');
        }
    };
    



