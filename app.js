//SELECTEURS
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//ECOUTEURS
document.addEventListener("DOMContentLoaded", getTodos)
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("input", filterTodo)


//FUNCTIONS
function addTodo(event) {
    event.preventDefault();
    //Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Créer le Li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //Ajouter la todo au localstorage
    saveLocalTodos(todoInput.value);
    //Button Check
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Button Supprimer
    const TrashButton = document.createElement("button");
    TrashButton.innerHTML = '<i class="fas fa-trash"></i>';
    TrashButton.classList.add("Trash-btn");
    todoDiv.appendChild(TrashButton);
    //AJOUTER NOTRE TODO A TODO-LIST
    todoList.appendChild(todoDiv);
    todoInput.value = "";
}

function deleteCheck(e){
    const item = e.target;
    //DELETE TODO
    if (item.classList[0] === "Trash-btn") {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo)
        todo.addEventListener("transitionend", function(){
          todo.remove();
        })
    }

    //CHECK MARK
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display ="none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display ="none";
                }
                break;
        }
    })
}


function saveLocalTodos(todo){
    //Checker si il y a des items exisants
    let todos; 
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    let todos; 
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
       //Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Créer le Li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //Button Check
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Button Supprimer
    const TrashButton = document.createElement("button");
    TrashButton.innerHTML = '<i class="fas fa-trash"></i>';
    TrashButton.classList.add("Trash-btn");
    todoDiv.appendChild(TrashButton);
    //AJOUTER NOTRE TODO A TODO-LIST
    todoList.appendChild(todoDiv); 
    });
}

function removeLocalTodos(todo){
    let todos; 
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}