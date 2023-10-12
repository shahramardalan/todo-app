const saveBtn = document.querySelector("#saveBtn");
const todoInput = document.querySelector("#todoInp");
const todoList = document.querySelector("#list");
let result = "";
let list = [];

function init() {
  const listFromStorage = JSON.parse(localStorage.getItem("todo_list")) || [];
  for (let i = 0; i < listFromStorage.length; i++) {
    const title = listFromStorage[i];
    list = listFromStorage;
    renderItem(title);
  }
}
function syncStorage(item) {
  list.push(item);
  const nextList = JSON.stringify(list);
  localStorage.setItem("todo_list", nextList);
}

function renderItem(item) {
  todoList.innerHTML += `
  <div class="list">
  <input type="checkbox" name="" id="" />
  <span>${item}</span>  
  </div>
  `;
}

saveBtn.addEventListener("click", () => {
  result = todoInput.value;
  if (result === "") {
    alert("todo is empty!!!");
  } else {
    renderItem(result);
    todoInput.value = "";
    syncStorage(result);
  }
});

init();
