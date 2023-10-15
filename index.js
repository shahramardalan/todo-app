const saveBtn = document.querySelector("#saveBtn");
const todoInput = document.querySelector("#todoInp");
const todoList = document.querySelector("#list");
const todoFilter = document.querySelector("#filter");

let list = [];

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function init() {
  loadFromStorage();
  renderList();
}

function syncStorage() {
  const nextList = JSON.stringify(list);
  localStorage.setItem("todo_list", nextList);
}

function loadFromStorage() {
  const listFromStorage = JSON.parse(localStorage.getItem("todo_list")) || [];
  list = listFromStorage;
}

function renderList() {
  todoList.innerHTML = "";
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    renderItem(item);
  }
}

function renderItem(item) {
  todoList.innerHTML += `
  <div class="list">
  <div>
    <input data-action="change" data-target="${item.target}" type="checkbox" ${
    item.status ? "checked" : ""
  } />
    <span data-target="${item.target}">${item.title}</span>  
  </div>
  <div>
    <button data-action="delete" data-target="${
      item.target
    }" class="delete">Delete Todo</button>
  </div>
  </div>
  `;
}

function clearInput() {
  todoInput.value = "";
}

function onAddItem() {
  const result = todoInput.value;
  const target = uuidv4();
  if (result === "") {
    alert("todo is empty!!!");
  } else {
    const item = {
      target: target,
      title: result,
      status: false,
    };
    list.push(item);
    syncStorage();
    renderList();
    clearInput();
  }
}

function onChangeStatus(item) {
  const target = item.target;
  if (target.dataset.action === "change") {
    const currentTodoTarget = target.dataset.target;
    const item = list.filter((item) => item.target === currentTodoTarget);
    if (item[0].status === false) {
      item[0].status = true;
    } else {
      item[0].status = false;
    }
    syncStorage();
  }
}

function onDeleteItem(item) {
  const target = item.target;
  if (target.dataset.action === "delete") {
    const currentTodoTarget = target.dataset.target;
    const item = list.filter((item) => item.target === currentTodoTarget);
    const index = list.indexOf(item[0]);
    list.splice(index, 1);
  }
  renderList();
  syncStorage();
}

function onFilterList(event) {
  if (event.target.value === "done") {
    const filtered = list.filter((item) => item.status === true);
    list = filtered;
    renderList();
    loadFromStorage();
  } else if (event.target.value === "todo") {
    const filtered = list.filter((item) => item.status === false);
    list = filtered;
    renderList();
    loadFromStorage();
  } else if (event.target.value === "all") {
    const filtered = list.filter(
      (item) => item.status === false || item.status === true
    );
    list = filtered;
    renderList();
    loadFromStorage();
  }
}

saveBtn.addEventListener("click", onAddItem);
todoList.addEventListener("click", onChangeStatus);
todoList.addEventListener("click", onDeleteItem);
todoFilter.addEventListener("change", onFilterList);

init();
