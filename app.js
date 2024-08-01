const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

todoForm.addEventListener("submit", function(event){
    event.preventDefault();
    const newTask = todoInput.value;

    if (newTask === '') {
        alert('Please enter a task!');
        return;
    }
    todoInput.value="";
    addTask(newTask);
});

function addTask(task){
    const listItem = document.createElement('li');
    const taskText = document.createElement('span');
    taskText.textContent = task;
    listItem.appendChild(taskText);

    const checkbox = document.createElement('input');
    checkbox.setAttribute("type", "checkbox");
    listItem.appendChild(checkbox);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    listItem.appendChild(deleteButton);
    
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    listItem.appendChild(editButton);

    todoList.appendChild(listItem);


    checkbox.addEventListener('change', function(){
        if(this.checked){
            taskText.style.textDecoration = "line-through";
        }
        else{
            taskText.style.textDecoration = "none";
    
        }
    });

    deleteButton.addEventListener('click', function(){
        todoList.removeChild(listItem);
    });

    editButton.addEventListener('click', function(){
        const isEditing = listItem.classList.contains("editing");

        if(isEditing){
            const input = listItem.querySelector('input[type="text"]');
            taskText.textContent = input.value;
            listItem.removeChild(input);
            listItem.insertBefore(taskText,checkbox);
            listItem.classList.remove('editing');
            editButton.textContent = 'Edit';
            checkbox.style.display='';
            deleteButton.style.display ='';
        }
        else{
            const input = document.createElement('input');
            input.type = 'text';
            input.value = taskText.textContent;
            listItem.insertBefore(input, taskText);
            listItem.removeChild(taskText);
            listItem.classList.add('editing');
            editButton.textContent = 'Save';
            checkbox.style.display='none';
            deleteButton.style.display ='none';
        }
    });

    saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
    const tasks = [];
    document.querySelectorAll('#todo-list li').forEach(task => {
        const taskText = task.querySelector('span').textContent;
        const isCompleted = task.classList.contains('completed');
        tasks.push({ text: taskText, completed: isCompleted });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
        addTask(task.text);
    });
  });