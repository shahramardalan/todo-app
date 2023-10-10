const saveBtn = document.querySelector("#saveBtn");
const todoInput = document.querySelector("#todoInp");
const todoList = document.querySelector("#list");
let result = "";
const list = [];

function syncStorage(item) {
  list.push(item);
}

saveBtn.addEventListener("click", () => {
  result = todoInput.value;
  todoList.innerHTML += `
  <div class="list">
  <input type="checkbox" name="" id="" />
  ${result}
</div>
  `;
  syncStorage(result);
  console.log(list);
});
