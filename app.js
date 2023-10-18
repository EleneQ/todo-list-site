const todoInputBox = document.querySelector(".todo-input-box");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

addBtn.addEventListener("click", (e) => {
  addToDo(e);
});

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
  todoInputBox.value = "";
  // resizeInput();

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

  let hasBeenCompleted = false;
  todoCheckbox.addEventListener("click", () => {
    if (todoInputText.readOnly === true && !hasBeenCompleted) {
      todoInputText.style.textDecoration = "line-through";
      todoInputText.style.color = "gray";
      todoCheckbox.classList.add("todo-checkbox-checked");
      hasBeenCompleted = true;
    } else if (todoInputText.readOnly === true && hasBeenCompleted) {
      todoInputText.style.textDecoration = "none";
      todoInputText.style.color = "black";
      todoCheckbox.classList.remove("todo-checkbox-checked");
      hasBeenCompleted = false;
    }
  });

  let isSaving = false;
  editBtn.addEventListener("click", () => {
    if (!isSaving) {
      todoInputText.removeAttribute("readonly");
      todoInputText.focus();
      editBtn.innerHTML = "Save";
      isSaving = true;
    } else if (isSaving) {
      todoInputText.setAttribute("readonly", "readonly");
      editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
      isSaving = false;
      resizeInput();
    }
  });

  function resizeInput() {
    todoInputText.style.width = todoInputText.value.length + "ch";
  }

  deleteBtn.addEventListener("click", () => {
    todoList.removeChild(newTodo);
  });
}
