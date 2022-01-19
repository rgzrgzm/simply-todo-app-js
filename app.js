const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const clearBtn = document.querySelector(".footer button");

let userData;
let listArr = [];

document.addEventListener("DOMContentLoaded", () => {
  userData = inputBox.value;
  if (userData.length === 0) {
    addBtn.classList.add("disable");
  }

  showTasks();
});

inputBox.addEventListener("keyup", () => {
  userData = inputBox.value;
  if (userData.length === 0) {
    addBtn.classList.add("disable");
    return;
  }
  addBtn.classList.remove("disable");
});

addBtn.addEventListener("click", () => {
  userData = inputBox.value;
  if (userData === "") return;
  let getLocalStorage = localStorage.getItem("todos");
  if (getLocalStorage === null) {
    listArr = [];
  } else {
    listArr = JSON.parse(getLocalStorage);
  }
  listArr.push(userData);
  localStorage.setItem("todos", JSON.stringify(listArr));

  showTasks();
});

clearBtn.addEventListener("click", () => {
  listArr = [];
console.log('click')
  localStorage.setItem("todos", JSON.stringify(listArr));
  showTasks();
});

function showTasks() {
  let getLocalStorage = localStorage.getItem("todos");
  if (getLocalStorage === null) {
    listArr = [];
  } else {
    listArr = JSON.parse(getLocalStorage);
  }

  if (listArr.length === 0) {
    clearBtn.classList.add("disable");
  } else {
    clearBtn.classList.remove("disable");
  }

  let newTask = "";
  listArr.forEach((task, index) => {
    newTask += `<li>${task} <span onclick="deleteTask(${index})"><i class="fa-solid fa-trash"></i></span> </li>`;
  });

  const pendingCount = document.querySelector(".pending");
  pendingCount.textContent = listArr.length;

  todoList.innerHTML = newTask;
  inputBox.value = "";
}

function deleteTask(index) {
  let getLocalStorage = localStorage.getItem("todos");
  listArr = JSON.parse(getLocalStorage);
  listArr.splice(index, 1);

  localStorage.setItem("todos", JSON.stringify(listArr));
  showTasks(); // Volver a mostrar las tareas actualizadas
}
