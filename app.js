"use strict";

const todoInputBox = document.querySelector(".todo-input-box");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const filterOption = document.querySelector(".filter-todos");

document.addEventListener("DOMContentLoaded", getTodos);
addBtn.addEventListener("click", addToDo);
filterOption.addEventListener("click", (e) => {
  filterTodos(e.target.value);
});

function addToDo(e) {
  e.preventDefault();

  let task = todoInputBox.value;

  if (!task) {
    alert("Please enter a task");
    return;
  }

  // Generate a unique ID for the todo
  const todoId = generateUniqueId();

  createTodo(todoId, task);

  // Saving to local storage
  saveLocalTodos(todoId, task);

  todoInputBox.value = "";
}

// FUNCTIONS
function createTodo(todoId, task) {
  // todo list el
  const newTodo = document.createElement("li");
  newTodo.className = "todo";
  todoList.appendChild(newTodo);

  // todo checkbox
  const todoCheckbox = createInputElement(
    newTodo,
    "checkbox",
    "completed",
    "todo-checkbox",
    false
  );

  // todo input text
  const todoInputText = createInputElement(
    newTodo,
    "text",
    "todo-text",
    "todo-text",
    true
  );
  todoInputText.value = task;

  // todo edit button
  const editBtn = createButtonElement(
    newTodo,
    "edit-btn",
    '<i class="fa-solid fa-pen-to-square"></i>'
  );

  // todo delete button
  const deleteBtn = createButtonElement(
    newTodo,
    "delete-btn",
    '<i class="fa-solid fa-xmark"></i>'
  );

  // FUNCTIONS
  checkCompletedTodo(newTodo, todoCheckbox, todoInputText);
  editTodo(todoInputText, editBtn, newTodo, todoId);
  deleteTodo(deleteBtn, newTodo, todoId);
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

function editTodo(todoInputText, editBtn, newTodo, todoId) {
  let editing = false;

  editBtn.addEventListener("click", () => {
    if (newTodo.classList.contains("completed")) return;

    if (!editing) {
      todoInputText.removeAttribute("readonly");
      todoInputText.focus();
      editBtn.innerHTML = "Save";
      editing = true;
    } else if (editing) {
      todoInputText.setAttribute("readonly", "readonly");
      editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
      editing = false;

      saveLocalTodos(todoId, todoInputText.value);
    }
  });
}

function deleteTodo(deleteBtn, todo, todoId) {
  deleteBtn.addEventListener("click", () => {
    todo.classList.add("fall");

    // Delete only after the transition animation has finished
    todo.addEventListener("transitionend", () => {
      removeLocalTodo(todoId);
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
        filterDisplay(todo, "flex", "none");
        break;
      case "uncompleted":
        filterDisplay(todo, "none", "flex");
        break;
      default:
        todo.style.display = "flex";
    }
  });

  function filterDisplay(todo, display1, display2) {
    if (todo.classList.contains("completed")) {
      todo.style.display = display1;
    } else {
      todo.style.display = display2;
    }
  }
}

function saveLocalTodos(todoId, todoText) {
  let todos = localStorageCheck();

  // Check if the todo with the same ID already exists
  const existingTodo = todos.find((todo) => todo.id === todoId);

  if (existingTodo) {
    existingTodo.text = todoText;
  } else {
    // Create a new todo if it doesn't exist
    todos.push({ id: todoId, text: todoText });
  }

  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos = localStorageCheck();

  todos.forEach((todo) => {
    createTodo(todo.id, todo.text);
  });
}

function localStorageCheck() {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  return todos;
}

function removeLocalTodo(todoId) {
  let todos = localStorageCheck();
  todos = todos.filter((todo) => todo.id !== todoId);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function generateUniqueId() {
  // Generate a unique ID using a timestamp or a library like uuid.
  return Date.now().toString();
}
