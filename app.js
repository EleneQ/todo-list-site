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
  const todoCheckbox = createInputElement(
    newTodo,
    "checkbox",
    "completed",
    "todo-checkbox",
    false
  );

  //todo input text
  const todoInputText = createInputElement(
    newTodo,
    "text",
    "todo-text",
    "todo-text",
    true
  );
  todoInputText.value = task;

  //todo edit button
  const editBtn = createButtonElement(
    newTodo,
    "edit-btn",
    '<i class="fa-solid fa-pen-to-square"></i>'
  );

  //todo delete button
  const deleteBtn = createButtonElement(
    newTodo,
    "delete-btn",
    '<i class="fa-solid fa-xmark"></i>'
  );

  //FUNCTIONS
  checkCompletedTodo(newTodo, todoCheckbox, todoInputText);

  editTodo(todoInputText, editBtn, newTodo);
  deleteTodo(deleteBtn, newTodo);

  todoInputBox.value = "";
}

function createButtonElement(newTodo, className, innerHTML) {
  const btn = document.createElement("button");
  btn.classList.add(className);
  btn.innerHTML = innerHTML;
  newTodo.appendChild(btn);

  return btn;
}

function createInputElement(newTodo, type, name, className, readonly = false) {
  const input = document.createElement("input");
  input.type = type;
  input.name = name;
  input.classList.add(className);
  if (readonly) {
    input.setAttribute("readonly", "readonly");
  }
  newTodo.appendChild(input);

  return input;
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

function deleteTodo(deleteBtn, todo) {
  deleteBtn.addEventListener("click", () => {
    todo.classList.add("fall");

    //delete only after the transition animation has finished
    todo.addEventListener("transitionend", () => {
      removeLocalTodo(todo);
      todo.remove();
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
  todos = localStorageCheck(todos);

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  todos = localStorageCheck(todos);

  todos.forEach((task) => {
    //todo list el
    const newTodo = document.createElement("li");
    newTodo.className = "todo";
    todoList.appendChild(newTodo);

    //todo checkbox
    const todoCheckbox = createInputElement(
      newTodo,
      "checkbox",
      "completed",
      "todo-checkbox",
      false
    );

    //todo input text
    const todoInputText = createInputElement(
      newTodo,
      "text",
      "todo-text",
      "todo-text",
      true
    );
    todoInputText.value = task;

    //todo edit button
    const editBtn = createButtonElement(
      newTodo,
      "edit-btn",
      '<i class="fa-solid fa-pen-to-square"></i>'
    );

    //todo delete button
    const deleteBtn = createButtonElement(
      newTodo,
      "delete-btn",
      '<i class="fa-solid fa-xmark"></i>'
    );

    //FUNCTIONS
    checkCompletedTodo(newTodo, todoCheckbox, todoInputText);

    editTodo(todoInputText, editBtn, newTodo);
    deleteTodo(deleteBtn, newTodo);
  });
}

function localStorageCheck(todos) {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

function removeLocalTodo(todo) { //!!!
  let todos;
  todos = localStorageCheck(todos);

  // const todoIndex = todo.querySelector(".todo-text").value;
  const todoIndex = todo.children[1].value;
  const index = todos.indexOf(todoIndex);
  todos.splice(index, 1);

  localStorage.setItem("todos", JSON.stringify(todos));
}

// function resizeInput() {
//   todoInputText.style.width = todoInputText.value.length + "ch";
// }
