const saveBtn = document.querySelector("#saveBtn");
const todoInput = document.querySelector("#todoInp");

saveBtn.addEventListener("click", () => {
  const result = todoInput.value;
  console.log(result);
});
