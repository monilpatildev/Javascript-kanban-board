const statuses = [
  {
    id: "8d7e6f5e-4c3b-2a1b-9e8d-7f6e5c4b3a2a",
    title: "Backlog",
    color: "#6c757d", // Gray
  },
  {
    id: "1b2b3b4b-5c6c-7d8d-9e9e-1f2f3f4f5f6f",
    title: "To Do",
    color: "#007bff", // Blue
  },
  {
    id: "6a7a8a9a-0b1b-2c3c-4d4d-5e6e7e8e9e9e",
    title: "In Progress",
    color: "#fd7e14", // Orange
  },
  {
    id: "2c3c4c5c-6d7d-8e9e-0f0f-1g2g3g4g5g6g",
    title: "On Hold",
    color: "#ffc107", // Yellow
  },
  {
    id: "0f1f2f3f-4g5g-6h7h-8i8i-9j0j1j2j3j4j",
    title: "Completed",
    color: "#28a745", // Green
  },
];

let dataOfBoard = getBoardData();

let isValidalFieldFortitle = true;
let isValidalFieldForStatus = true;
let isValidalFieldForDate = true;
let isValidalFieldForDescription = true;

const today = new Date().toISOString().slice(0, 16);
document.getElementsByName("date")[0].min = today;

const hiddenField = document.getElementById("taskId");

const submitButton = document.getElementById("submit");
const resetButton = document.getElementById("reset");

const titleField = document.getElementById("title");
const errorFieldFortitle = document.getElementById("errorMessageForTitle");

const statusField = document.getElementById("status");
const errorFieldForStatus = document.getElementById("statusErrorMessage");

const dateField = document.getElementById("date");
const errorFieldForDate = document.getElementById("errorMessageDate");

const descriptionField = document.getElementById("description");
const errorFieldForDescription = document.getElementById("errorDescription");

const selectField = document.getElementById("statusField");

const searchBar = document.getElementById("search");
const searchButton = document.getElementById("searchButton");
const resetSearch = document.getElementById("resetField");

resetSearch.addEventListener("click", () => {
  displayDataToKanbanBoard(statuses);
});

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  const getData = getBoardData();
  const searchValue = document.getElementById("search").value;
  if (!searchValue) return displayDataToKanbanBoard(statuses, []);
  const filterData = getData.filter((item) => item.title.includes(searchValue));
  displayDataToKanbanBoard(statuses, filterData);
});

titleField.addEventListener("input", () => {
  const titleValue = document.getElementById("title").value;
  if (!titleValue) {
    titleField.style.borderColor = "red";
    errorFieldFortitle.innerText = "Enter valid title";
    isValidalFieldFortitle = false;
  } else if (titleValue.length < 20 || titleValue.length > 50) {
    titleField.style.borderColor = "red";
    errorFieldFortitle.innerText = "title should be between 20 to 40";
    isValidalFieldFortitle = false;
    return false;
  } else if (!/^[a-zA-Z0-9\s]+$/.test(titleValue)) {
    titleField.style.borderColor = "red";
    errorFieldFortitle.innerText = "Name should not include special character";
    isValidalFieldFortitle = false;
    return false;
  } else {
    isValidalFieldFortitle = true;
    errorFieldFortitle.innerText = "";
    titleField.style.borderColor = "gainsboro";
  }
});

statusField.addEventListener("change", () => {
  const statusValue = document.getElementById("status").value;
  if (!statusValue) {
    errorFieldForStatus.innerText = "Enter valid Status";
    isValidalFieldForStatus = false;
    return;
  }
  isValidalFieldForStatus = true;
  errorFieldForStatus.innerText = "";
  statusField.style.borderColor = "gainsboro";
});

dateField.addEventListener("change", () => {
  const dateValue = document.getElementById("date").value;
  const currentDate = formatDateISO(new Date());

  if (dateValue < currentDate) {
    errorFieldForDate.innerText = "Enter valid date";
    isValidalFieldForDate = false;
    return false;
  }
  isValidalFieldForDate = true;
  errorFieldForDate.innerText = "";
});

descriptionField.addEventListener("input", () => {
  const desriptionValue = document.getElementById("description").value;
  if (!desriptionValue) {
    errorFieldForDescription.innerHTML = "";
    errorFieldForDescription.innerText = "";
    isValidalFieldForDescription = true;
    descriptionField.style.borderColor = "gainsboro";
    return false;
  }
  if (desriptionValue.length < 20 || desriptionValue.length > 100) {
    descriptionField.style.borderColor = "red";
    errorFieldForDescription.innerText =
      "description should be between 40 to 80";
    isValidalFieldForDescription = false;
    return false;
  }
  console.log(desriptionValue);

  isValidalFieldForDescription = true;
  errorFieldForDescription.innerText = "";
  descriptionField.style.borderColor = "gainsboro";
});

resetButton.addEventListener("click", () => {
  removeField();
});

const taskListConatainer = document.getElementById("KanbanBoard");

function displayDataToKanbanBoard(statuses, serchVar) {
  const containeStatusList = document.createElement("div");
  setAttributes(containeStatusList, "class", "d-flex gap-3");
  const updatedData = serchVar || getBoardData();
  for (let element of statuses) {
    const statusList = createStatusList(element);
    for (const item of updatedData) {
      if (item.status === element.id) {
        const containerDataListForTask = createStatusListTasks(
          item,
          element.color
        );
        statusList.appendChild(containerDataListForTask);
      }
    }
    containeStatusList.appendChild(statusList);
  }

  taskListConatainer.replaceChildren(containeStatusList);
}
displayDataToKanbanBoard(statuses);

function createStatusListTasks(item, color) {
  const containerOfTask = document.createElement("div");
  setAttributes(containerOfTask, "class", "datalist m-2 p-2");
  setAttributes(containerOfTask, "id", `${item.taskId}`);
  setAttributes(containerOfTask, "style", `border-color: ${color}`);
  const titleEditDeleteDiv = document.createElement("div");
  setAttributes(
    titleEditDeleteDiv,
    "class",
    "title-edit-delete-btn flex-justify"
  );

  const titleElement = document.createElement("p");
  setAttributes(titleElement, "class", "w-75");
  titleElement.innerText = item.title;

  const containerOfEditDelete = document.createElement("div");
  setAttributes(containerOfEditDelete, "class", "edit-delete-btn w-25");
  const editField = document.createElement("a");
  const deleteField = document.createElement("a");
  setAttributes(editField, "class", "link-primary");
  setAttributes(editField, "onclick", `editField('${item.taskId}')`);
  editField.innerText = "Edit";
  setAttributes(deleteField, "class", "link-danger");
  setAttributes(deleteField, "onclick", `deleteTask('${item.taskId}')`);
  deleteField.innerText = "Delete";

  containerOfEditDelete.appendChild(editField);
  containerOfEditDelete.appendChild(deleteField);

  titleEditDeleteDiv.appendChild(titleElement);
  titleEditDeleteDiv.appendChild(containerOfEditDelete);

  const dateDisplay = document.createElement("p");
  dateDisplay.innerText = item.date;
  setAttributes(dateDisplay, "class", "w-100 flex-justify");

  const descDateDiv = document.createElement("div");
  setAttributes(descDateDiv, "class", "description-date flex-justify ");

  const descriptionText = document.createElement("p");
  setAttributes(descriptionText, "class", "w-75 text-secondary font-italic");
  descriptionText.innerText = item.description;
  console.log(descriptionText);

  descDateDiv.appendChild(descriptionText);

  containerOfTask.appendChild(titleEditDeleteDiv);
  containerOfTask.appendChild(dateDisplay);
  containerOfTask.appendChild(descDateDiv);
  return containerOfTask;
}

function updateSectionForTaskList(taskId, newBoardId) {
  const updatedStatus = statuses.find((status) => status.id === newBoardId);

  const previosSectionOfTask = document.getElementById(taskId);

  previosSectionOfTask.remove();
  if (newBoardId) {
    const sectionOfTask = document.getElementById(updatedStatus.id);
    const updatedData = getBoardData();
    const task = updatedData.find((task) => task.taskId === taskId);
    const newUpdatedTask = createStatusListTasks(task, updatedStatus.color);
    setAttributes(
      newUpdatedTask,
      "style",
      `border-color: ${updatedStatus.color}`
    );
    sectionOfTask.appendChild(newUpdatedTask);
  }
}
function createStatusList(element) {
  const containerList = document.createElement("div");
  setAttributes(containerList, "class", "container-list ");
  setAttributes(containerList, "id", element.id);
  setAttributes(containerList, "style", `border-color: ${element.color}`);
  const containerHeading = document.createElement("div");
  setAttributes(containerHeading, "class", "div-heading");
  containerHeading.innerText = element.title;
  setAttributes(
    containerHeading,
    "style",
    `background-color: ${element.color}`
  );
  containerList.appendChild(containerHeading);
  return containerList;
}

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (submitButton.value === "Save Task") {
    submitData("submit");
  }
  if (submitButton.value === "Update") {
    submitData("Update");
  }
});
function submitData(type) {
  const checkValidation = validation(type);
  if (!checkValidation) {
    return;
  }
  const titleValue = document.getElementById("title").value;
  const statusValue = document.getElementById("status").value;
  const dateValue = document.getElementById("date").value;
  const changeDateFormat = dateValue.replace("T", " ");
  const descriptionValue = document.getElementById("description").value;
  let boardDataOfObject = {};
  boardDataOfObject["title"] = titleValue;
  boardDataOfObject["date"] = changeDateFormat;
  boardDataOfObject["description"] = descriptionValue;

  if (type === "submit") {
    boardDataOfObject["taskId"] = getUuid();
    boardDataOfObject["status"] = "8d7e6f5e-4c3b-2a1b-9e8d-7f6e5c4b3a2a";

    dataOfBoard.push(boardDataOfObject);
    setBoardData(dataOfBoard);
    // updateSectionForTaskList(
    //   boardDataOfObject.taskId,
    //   "8d7e6f5e-4c3b-2a1b-9e8d-7f6e5c4b3a2a"
    // );
    displayDataToKanbanBoard(statuses);
    removeField();
  } else {
    const key = hiddenField.getAttribute("value");
    boardDataOfObject["taskId"] = key;
    boardDataOfObject["status"] = statusValue;

    const getDataFromLocals = getBoardData();

    const index = getDataFromLocals.findIndex(
      (itemIndex) => itemIndex.taskId === key
    );
    // const findingOldStatusOfTask = getDataFromLocals[index].status;
    getDataFromLocals.splice(index, 1, boardDataOfObject);
    setBoardData(getDataFromLocals);

    hiddenField.removeAttribute("value");
    setAttributes(selectField, "class", "mb-2 d-none");
    setAttributes(submitButton, "class", "btn btn-success");
    submitButton.value = "Save Task";
    removeField();
    const task = getDataFromLocals[index];
    updateSectionForTaskList(task.taskId, statusValue);
  }
}

function editField(id) {
  removeField();
  const getDataFromLocals = getBoardData();
  const taskData = getDataFromLocals.find((item) => item.taskId === id);
  selectField.classList.remove("d-none");
  document.getElementById("title").value = taskData.title;
  document.getElementById("status").value = taskData.status;
  document.getElementById("description").value = taskData.description;

  const changeDateFormat = taskData.date.replace(" ", "T");

  document.getElementById("date").value = changeDateFormat;
  submitButton.value = "Update";
  setAttributes(submitButton, "class", "btn btn-warning");
  hiddenField.value = taskData.taskId;
}

function validation(type) {
  let isValid = true;
  const titleValue = document.getElementById("title").value;
  const statusValue = document.getElementById("status").value;
  const dateValue = document.getElementById("date").value;

  if (!titleValue) {
    titleField.style.borderColor = "red";
    errorFieldFortitle.innerText = "Enter valid title";
    isValid = false;
  }
  if (type !== "submit") {
    if (!statusValue) {
      errorFieldForStatus.innerText = "Enter valid Status";
      isValid = false;
    }
  }
  if (!dateValue) {
    errorFieldForDate.innerText = "Enter valid date";
    isValid = false;
  }

  if (
    !isValidalFieldFortitle ||
    !isValidalFieldForStatus ||
    !isValidalFieldForDate ||
    !isValidalFieldForDescription
  ) {
    isValid = false;
  }
  return isValid;
}

function getUuid() {
  return "10000-4000-8000-1000".replace(/[018]/g, (c) =>
    (
      +c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
    ).toString(16)
  );
}

function setBoardData(data) {
  localStorage.setItem("boardData", JSON.stringify(data));
}

function getBoardData() {
  return JSON.parse(localStorage.getItem("boardData")) || [];
}

function removeField() {
  document.getElementById("title").value = "";
  document.getElementById("status").value = "";
  document.getElementById("description").value = "";
  document.getElementById("date").value = "";

  titleField.style.borderColor = "gainsboro";

  statusField.style.borderColor = "gainsboro";
  errorFieldFortitle.innerText = "";
  errorFieldForStatus.innerText = "";
  errorFieldForDate.innerText = "";
  selectField.classList.add("d-none");
  setAttributes(submitButton, "value", "Save Task");
  setAttributes(submitButton, "class", "btn btn-success");
}
const formatDateISO = (date) => {
  const isoString = date.toISOString();
  const formattedDate = isoString.split("T")[0];
  return formattedDate;
};

function setAttributes(element, attr, value) {
  element.setAttribute(attr, value);
}

function deleteTask(id) {
  const getDataFromLocals = getBoardData();
  const index = getDataFromLocals.findIndex(
    (itemIndex) => itemIndex.taskId === id
  );
  const taskData = getDataFromLocals[index];

  const result = confirm("Are you sure you want to delete this data?");
  if (!result) return;
  getDataFromLocals.splice(index, 1);
  setBoardData(getDataFromLocals);
  updateSectionForTaskList(taskData.taskId);
}

// const boardContainer = document.createElement("div");
// setAttributes(boardContainer, "class", "d-flex gap-3");
// let updatedData = serchVar || getBoardData();
// for (const element of statuses) {
//   const containerList = document.createElement("div");
//   setAttributes(containerList, "class", "container-list ");
//   setAttributes(containerList, "style", `border-color: ${element.color}`);
//   const containerHeading = document.createElement("div");
//   setAttributes(containerHeading, "class", "div-heading");
//   containerHeading.innerText = element.title;
//   setAttributes(
//     containerHeading,
//     "style",
//     `background-color: ${element.color};`
//   );

//   containerList.appendChild(containerHeading);
//   // const
//   // if(!serchVar){}
//   const filterData = updatedData.filter((item) => {
//     return item.status === element.id;
//   });
//   serchVar ? filterData : serchVar;
//   console.log("UUUUUUpdating", filterData);
//   // console.log("element is ", element.title, filterData);
//   // const itemsOfData = addTaskDataIntoBoard(filterData);
//   console.log(serchVar);

// for (const item of filterData) {
//   const containerDataList = document.createElement("div");
//   setAttributes(containerDataList, "class", "datalist m-2");
//   setAttributes(
//     containerDataList,
//     "style",
//     `border-color: ${element.color}`
//   );
//   const titleEditDeletetDiv = document.createElement("div");
//   setAttributes(
//     titleEditDeletetDiv,
//     "class",
//     "title-edit-delete-btn flex-1"
//   );
//   titleEditDeletetDiv.innerHTML = `<p class="w-75">${item.title}</p>
//           <div class="edit-delete-btn">
//             <a href="#" class="link-primary" onclick="editField('${item.taskId}')">Edit</a>
//             <a href="#" class="link-danger"  onclick="deleteTask('${item.taskId}')" >Delete</a>
//           </div>`;
//   const descDateDiv = document.createElement("div");
//   setAttributes(descDateDiv, "class", "description-date flex-1");

//   descDateDiv.innerHTML = `<p class="w-75">${item.description}</p>
//           <p>${item.date}</p>`;

//   containerDataList.appendChild(titleEditDeletetDiv);
//   containerDataList.appendChild(descDateDiv);
//   containerList.appendChild(containerDataList);
// }

// filterData.forEach((item) => {
//   const containerDataList = createStatusListTasks(item, element.color);
//   containerList.appendChild(containerDataList);
// });

//   boardContainer.appendChild(containerList);
// }
// taskListConatainer.replaceChildren(boardContainer);
// // taskListConatainer.

// const filterData = updatedData.filter((item) => item.status === element.id);
// for (const item of filterData) {
//   const containerDataListForTask = createStatusListTasks(
//     item,
//     element.color
//   );
//   statusList.appendChild(containerDataListForTask);
// }
