const saveBtn = document.querySelector("#saveBtn");
const todoInput = document.querySelector("#todoInp");
const todoList = document.querySelector("#list");
let result = "";
const list = [];

function syncStorage(item) {
  list.push(item);
  const nextList = JSON.stringify(list);
  localStorage.setItem("todo_list", nextList);
}

function createItem(item) {
  todoList.innerHTML += `
  <div class="list">
  <input type="checkbox" name="" id="" />
  <span>${item}</span>  
  </div>
  `;
  syncStorage(result);
}

saveBtn.addEventListener("click", () => {
  result = todoInput.value;
  if (result === "") {
    alert("todo is empty!!!");
  } else {
    createItem(result);
    todoInput.value = "";
  }
});

const previousList = JSON.parse(localStorage.getItem("todo_list"))

for(let i=0; i < previousList.length; i++){
  const title = previousList[i];
  createItem(title)
}