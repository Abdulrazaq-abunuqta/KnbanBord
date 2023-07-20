// Variable
const arStarted = document.querySelector(".inputAreano");
const arInProgress = document.querySelector(".inputAreain");
const arCompleted = document.querySelector(".inputAreaco");
//btn
const btnStarted = document.querySelector(".btn-no");
const btnInProgress = document.querySelector(".btn-in");
const btnCompleted = document.querySelector(".btn-co");
// drag and drop
const dropArea = document.querySelectorAll(".kanban-board > div");
let drag = null;

//input
let inputArea = document.getElementById("input-task");

// add Task
function addTask(task) {
  const creatInput = document.createElement("div");
  creatInput.className = "itemall";
  creatInput.draggable = true;
  creatInput.innerHTML = `
  <input class="input-task" type="text" id="input-task" placeholder="Type a task..." " ><ion-icon class="edit editt" name="create-outline"></ion-icon>
    <ion-icon class="specil-icon remove removew" name="trash-outline"></ion-icon>
  `;
  task.append(creatInput);

  const inputField = creatInput.querySelector(".input-task");
  inputField.addEventListener("input", function (e) {
    inputField.textContent = e.target.value;
    inputField.value = e.target.value;
  });
  inputField.addEventListener("blur", function (e) {
    inputField.setAttribute("readonly", true);
    inputField.setAttribute("readonly");
    storeData(task);
  });

  const iconEdit = creatInput.querySelector(".edit");
  iconEdit.addEventListener("click", function () {
    inputField.removeAttribute("readonly");
    editFromStorage(creatInput.parentElement, creatInput, inputField);
  });

  const iconRemove = creatInput.querySelector(".remove");
  iconRemove.addEventListener("click", function () {
    deleteFromStorage(creatInput.parentElement, creatInput, inputField);
  });

  dragItem();
}

// Drag Item
function dragItem() {
  let items = document.querySelectorAll(".itemall");
  items.forEach((item) => {
    item.addEventListener("dragstart", (event) => {
      item.style.opacity = ".5";
      drag = item;
    });
    item.addEventListener("dragend", (event) => {
      item.style.opacity = "1";
      drag = null;
    });
    dropArea.forEach((area) => {
      area.addEventListener("dragover", (event) => {
        event.preventDefault();
      });

      area.addEventListener("drop", (event) => {
        area.lastElementChild.before(drag, area.lastElementChild);
        renderEvents(drag);
        storeUpdate();
      });
    });
  });
}

// // local storage
function storeData(Task) {
  let notStarted;
  let inProgress;
  let completed;
  const notStartedContent = JSON.parse(localStorage.getItem("inputAreano"));
  const inProgressContent = JSON.parse(localStorage.getItem("inputAreain"));
  const completeContent = JSON.parse(localStorage.getItem("inputAreaco"));

  if (notStartedContent !== null) {
    notStarted = notStartedContent;
  } else {
    notStarted = [];
  }
  if (inProgressContent !== null) {
    inProgress = inProgressContent;
  } else {
    inProgress = [];
  }
  if (completeContent !== null) {
    completed = completeContent;
  } else {
    completed = [];
  }

  if (Task.parentElement.className === "inputAreano general") {
    const item = Task.previousElementSibling.querySelector("input");
    if (item && item.textContent.trim().length > 0) {
      notStarted.push(item.textContent);
    }
    localStorage.setItem("notStarted", JSON.stringify(notStarted));
  } else if (Task.parentElement.className === "inputAreain general") {
    const item = Task.previousElementSibling.querySelector("input");
    if (item && item.textContent.trim().length > 0) {
      inProgress.push(item.textContent);
    }
    localStorage.setItem("inProgress", JSON.stringify(inProgress));
  } else if (Task.parentElement.className === "inputAreaco general") {
    const item = Task.previousElementSibling.querySelector("input");
    if (item && item.textContent.trim().length > 0) {
      completed.push(item.textContent);
    }
    localStorage.setItem("completed", JSON.stringify(completed));
  }
}
// /**************************************************** */
// // store Update for Drag and Drop after reload
// function storeUpdate() {
//   let notStarted = [];
//   let inProgress = [];
//   let completed = [];
//   const notStartedTasks = notStartedArea.querySelectorAll(".Item input");
//   const inProgressTasks = inProgressArea.querySelectorAll(".Item input");
//   const completedTasks = completedArea.querySelectorAll(".Item input");
//   notStartedTasks.forEach((item) => {
//     if (item && item.value.trim().length > 0) {
//       notStarted.push(item.value);
//     }
//   });
//   localStorage.setItem("notStarted", JSON.stringify(notStarted));
//   inProgressTasks.forEach((item) => {
//     if (item && item.value.trim().length > 0) inProgress.push(item.value);
//   });
//   localStorage.setItem("inProgress", JSON.stringify(inProgress));
//   completedTasks.forEach((item) => {
//     if (item && item.value.trim().length > 0) completed.push(item.value);
//   });
//   localStorage.setItem("completed", JSON.stringify(completed));
// }

// /* *************************************************************** */
// // display DATA
// window.onload = function () {
//   displayData();
// };

// function displayData() {
//   const notStartedContent = JSON.parse(localStorage.getItem("notStarted"));
//   const inProgressContent = JSON.parse(localStorage.getItem("inProgress"));
//   const completeContent = JSON.parse(localStorage.getItem("completed"));
//   renderDisplay(notStartedContent, notStartedAdd);
//   renderDisplay(inProgressContent, inProgressAdd);
//   renderDisplay(completeContent, completedAdd);
//   dragItem();
// }
// /* ************************************************************************* */
// /* Render on screen */
// function renderDisplay(target, append) {
//   if (target !== null) {
//     target.forEach((task) => {
//       if (task) {
//         const createDiv = document.createElement("div");
//         createDiv.className = "Item";
//         createDiv.innerHTML = `
//     <input id="input-task" type="text" placeholder="enter a task" draggable="true"/>
//     <ion-icon class="edit" name="create-outline"></ion-icon>
//     <ion-icon class="specil-icon remove" name="trash-outline"></ion-icon>
//   `;
//         const inputField = createDiv.querySelector("#input-task");
//         inputField.value = task;
//         append.before(createDiv, append);
//         renderEvents(createDiv);
//       }
//     });
//   }
// }

// // render Events for each elements in local storage with events for edit and delete
// function renderEvents(createDiv) {
//   const inputField = createDiv.querySelector("#input-task");
//   createDiv.addEventListener("blur", function (e) {
//     inputField.setAttribute("readonly", true);
//     storeData(destination);
//   });
//   const iconEdit = createDiv.querySelector(".edit");
//   iconEdit.addEventListener("click", function () {
//     inputField.removeAttribute("readonly");
//   });
//   deleteFromStorage(createDiv.parentElement, createDiv, inputField);
//   editFromStorage(createDiv.parentElement, createDiv, inputField);
// }

// /* delete elements from storage */

// function deleteFromStorage(destinaion, createDiv, inputField) {
//   const iconRemove = createDiv.querySelector(".remove");
//   if (destinaion.className === "Not-Started general") {
//     iconRemove.addEventListener("click", function () {
//       let notStarted = [];
//       const notStartedContent = JSON.parse(localStorage.getItem("notStarted"));
//       notStartedContent.forEach((item) => {
//         if (item !== inputField.value) {
//           notStarted.push(item);
//         }
//       });
//       localStorage.setItem("notStarted", JSON.stringify(notStarted));
//       createDiv.remove();
//     });
//   } else if (destinaion.className === "in-Progress general") {
//     iconRemove.addEventListener("click", function () {
//       let inProgress = [];
//       const inProgressContent = JSON.parse(localStorage.getItem("inProgress"));
//       inProgressContent.forEach((item) => {
//         if (item !== inputField.value) {
//           inProgress.push(item);
//         }
//       });
//       localStorage.setItem("inProgress", JSON.stringify(inProgress));
//       createDiv.remove();
//     });
//   } else if (destinaion.className === "completed general") {
//     iconRemove.addEventListener("click", function () {
//       let completed = [];
//       const completedContent = JSON.parse(localStorage.getItem("completed"));
//       completedContent.forEach((item) => {
//         if (item !== inputField.value) {
//           completed.push(item);
//         }
//       });
//       localStorage.setItem("completed", JSON.stringify(completed));
//       createDiv.remove();
//     });
//   }
// }
// /* ****************************************************************** */
// /* edit elements from storage */
// function editFromStorage(destinaion, createDiv, inputField) {
//   const oldText = inputField.value;
//   let newText;

//   inputField.addEventListener("blur", function (e) {
//     newText = inputField.value;

//     if (destinaion.className === "Not-Started general") {
//       let notStarted = [];
//       const notStartedContent = JSON.parse(localStorage.getItem("notStarted"));
//       notStartedContent.forEach((item) => {
//         if (item !== oldText) {
//           notStarted.push(item);
//         } else {
//           notStarted.push(newText);
//         }
//       });
//       localStorage.setItem("notStarted", JSON.stringify(notStarted));
//     } else if (destinaion.className === "in-Progress general") {
//       let inProgress = [];
//       const inProgressContent = JSON.parse(localStorage.getItem("inProgress"));
//       inProgressContent.forEach((item) => {
//         if (item !== oldText) {
//           inProgress.push(item);
//         } else {
//           inProgress.push(newText);
//         }
//       });
//       localStorage.setItem("inProgress", JSON.stringify(inProgress));
//     } else if (destinaion.className === "completed general") {
//       let completed = [];
//       const completedContent = JSON.parse(localStorage.getItem("completed"));
//       completedContent.forEach((item) => {
//         if (item !== oldText) {
//           completed.push(item);
//         } else {
//           completed.push(newText);
//         }
//       });
//       localStorage.setItem("completed", JSON.stringify(completed));
//     }
//   });
// }

//event
btnStarted.addEventListener("click", function () {
  addTask(arStarted);
});

btnCompleted.addEventListener("click", function () {
  addTask(arCompleted);
});

btnInProgress.addEventListener("click", function () {
  addTask(arInProgress);
});
