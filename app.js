const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

addBtn.addEventListener("click", (e) => {
  e.preventDefault();

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
  todoInputText.className = "todo-text";
  todoInputText.value = "A new task";
  todoInputText.setAttribute("readonly", "readonly");

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
});
