const saveBtn = document.querySelector("#saveBtn");
const todoInput = document.querySelector("#todoInp");
const todoList = document.querySelector("#list");
let link = ""
let list = [];

function init() {
  loadFromStorage();
  renderList();
  link = document.querySelector('[data-target="8"]');
  
}

function syncStorage(item) {
  const next_item = {
    id: item.id,
    title: item.title,
    status: item.status,
  };
  list.push(next_item);
  const nextList = JSON.stringify(list);
  localStorage.setItem("todo_list", nextList);
}

function loadFromStorage() {
  const listFromStorage = JSON.parse(localStorage.getItem("todo_list")) || [];
  list = listFromStorage;
}

function renderList() {
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    renderItem(item);
  }
}
function renderItem(item) {
  todoList.innerHTML += `
  <div class="list">
  <input type="checkbox" ${item.status ? "checked" : ""} />
  <span data-target="${item.id}">${item.title}</span>  
  </div>
  `;
}

function clearInput() {
  todoInput.value = "";
}

function onAddItem() {
  const result = todoInput.value;
  if (result === "") {
    alert("todo is empty!!!");
  } else {
    const item = {
      id : list.length,
      title: result,
      status: false,
    };
    syncStorage(item);
    renderItem(item);
    clearInput();
  }
}

saveBtn.addEventListener("click", onAddItem);

init();
alert(link.innerHTML)
