"use strict";

const todoInputBox = document.querySelector(".todo-input-box");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const filterOption = document.querySelector(".filter-todos");

addBtn.addEventListener("click", addToDo);
filterOption.addEventListener("click", (e) => {
  filterTodos(e.target.value);
});
document.addEventListener("DOMContentLoaded", getTodos);

function addToDo(e) {
  e.preventDefault();

  let task = todoInputBox.value;

  if (!task) {
    alert("Please enter a task");
    return;
  }

  //todo list el
  const newTodo = document.createElement("li");
  newTodo.className = "todo";
  todoList.appendChild(newTodo);

  //saving to local storage
  saveLocalTodos(todoInputBox.value);

  //todo checkbox
  const todoCheckbox = document.createElement("input");
  todoCheckbox.type = "checkbox";
  todoCheckbox.name = "completed";
  todoCheckbox.classList.add("todo-checkbox");
  newTodo.appendChild(todoCheckbox);

  //todo input text
  const todoInputText = document.createElement("input");
  todoInputText.type = "text";
  todoInputText.name = "todo-text";
  todoInputText.classList.add("todo-text");
  todoInputText.setAttribute("readonly", "readonly");
  todoInputText.value = task;
  newTodo.appendChild(todoInputText);

  //todo edit button
  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-btn");
  editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
  newTodo.appendChild(editBtn);

  //todo delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  newTodo.appendChild(deleteBtn);

  //FUNCTIONS
  checkCompletedTodo(newTodo, todoCheckbox, todoInputText);

  editTodo(todoInputText, editBtn, newTodo);
  deleteTodo(deleteBtn, newTodo);

  todoInputBox.value = "";
}

function checkCompletedTodo(newTodo, todoCheckbox, todoInputText) {
  let hasBeenCompleted = false;

  todoCheckbox.addEventListener("click", () => {
    if (!todoInputText.readOnly) return;

    if (!hasBeenCompleted) {
      todoCheckbox.classList.add("todo-checkbox-checked");
      newTodo.classList.add("completed");
      hasBeenCompleted = true;
    } else {
      todoCheckbox.classList.remove("todo-checkbox-checked");
      newTodo.classList.remove("completed");
      hasBeenCompleted = false;
    }

    filterTodos(filterOption.value);
  });
}

function editTodo(todoInputText, editBtn, newTodo) {
  let isSaving = false;

  editBtn.addEventListener("click", () => {
    if (newTodo.classList.contains("completed")) return;

    if (!isSaving) {
      todoInputText.removeAttribute("readonly");
      todoInputText.focus();
      editBtn.innerHTML = "Save";
      isSaving = true;
    } else if (isSaving) {
      todoInputText.setAttribute("readonly", "readonly");
      editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
      isSaving = false;
    }
  });
}

function deleteTodo(deleteBtn, newTodo) {
  deleteBtn.addEventListener("click", () => {
    newTodo.classList.add("fall");

    //delete only after the transition animation has finished
    newTodo.addEventListener("transitionend", () => {
      newTodo.remove();
    });
  });
}

function filterTodos(option) {
  const todos = [...todoList.children];

  todos.forEach(function (todo) {
    switch (option) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        flterDisplay(todo, "flex", "none");
        break;
      case "uncompleted":
        flterDisplay(todo, "none", "flex");
        break;
      default:
        todo.style.display = "flex";
    }
  });

  function flterDisplay(todo, display1, display2) {
    if (todo.classList.contains("completed")) {
      todo.style.display = display1;
    } else {
      todo.style.display = display2;
    }
  }
}

function saveLocalTodos(todo) {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach((task) => {
    //todo list el
    const newTodo = document.createElement("li");
    newTodo.className = "todo";
    todoList.appendChild(newTodo);

    //todo checkbox
    const todoCheckbox = document.createElement("input");
    todoCheckbox.type = "checkbox";
    todoCheckbox.name = "completed";
    todoCheckbox.className = "todo-checkbox";
    newTodo.appendChild(todoCheckbox);

    //todo input text
    const todoInputText = document.createElement("input");
    todoInputText.type = "text";
    todoInputText.name = "todo-text";
    todoInputText.classList.add("todo-text");
    todoInputText.setAttribute("readonly", "readonly");
    todoInputText.value = task;
    newTodo.appendChild(todoInputText);

    //todo edit button
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    newTodo.appendChild(editBtn);

    //todo delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    newTodo.appendChild(deleteBtn);

    //FUNCTIONS
    checkCompletedTodo(newTodo, todoCheckbox, todoInputText);

    editTodo(todoInputText, editBtn, newTodo);
    deleteTodo(deleteBtn, newTodo);
  });
}

// function resizeInput() {
//   todoInputText.style.width = todoInputText.value.length + "ch";
// }
