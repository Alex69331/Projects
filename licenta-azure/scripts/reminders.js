const addReminder = document.querySelector(".plusSign");
const blankPage = document.querySelector(".page-blank");
const addReminderContainer = document.getElementById("add-reminder-container");
const firstPage = document.getElementById("reminders-workplace");
const addedRemindersPage = document.querySelector(".added-reminder");
const unpinned = document.querySelector(".unpinned");
const pinned = document.querySelector(".pinned");
const alarmOn = document.querySelector(".bell-on");
const alarmOff = document.querySelector(".bell-off");
let isPinned = false;
let isAlarmOn = false;
let selectedBgColor = false;
const calendar = document.querySelector(".select-date");
const alarmOnContainer = document.querySelector(".alarmOnContainer");
const checked = document.querySelector(".accept-sign");
const colorOptions = document.querySelectorAll(".color-option");
const titleInput = document.querySelector(".reminder-title");
const contentInput = document.querySelector(".reminder-text");
const saveAlarmBtn = document.getElementById("alarmSaveBtn");
const cancelAlarmBtn = document.getElementById("alarmCancelBtn");
const backButton = document.querySelector(".backBtnReminder");
const searchContainer = document.getElementById("search-container");
const searchBtn = document.querySelector(".lupa-emoji");
const alarmSound = "../images/alarm-sound.mp3";
let selectedColor = "";

addReminder.addEventListener("click", function () {
  blankPage.style.display = "none";
  addReminderContainer.style.display = "flex";
  addReminder.style.display = "none";
  checked.style.display = "flex";
  addedRemindersPage.style.display = "none";

  colorOptions.forEach((colorOption) => {
    colorOption.addEventListener("click", () => {
      selectedColor = colorOption.style.backgroundColor;

      addReminderContainer.style.backgroundColor = selectedColor;
      console.log("Selected color:", selectedColor);
      selectedBgColor = true;
    });
  });
});
searchBtn.addEventListener("click", function () {
  if (searchContainer.style.display === "flex") {
    searchContainer.style.display = "none";
  } else {
    searchContainer.style.display = "flex";
  }
});
const pinnedButtons = document.querySelectorAll(
  "#search-container .pinned-container button"
);
const reminderButtons = document.querySelectorAll(
  "#search-container .reminder-scheduled button"
);
const categoriesButtons = document.querySelectorAll(
  "#search-container .categories-searchBar button"
);
const colorsButtons = document.querySelectorAll(
  "#search-container .colors-container div"
);
colorsButtons.forEach((button) => {
  button.addEventListener("click", function () {
    colorsButtons.forEach((btn) => btn.classList.remove("selectedColor"));
    button.classList.add("selectedColor");
  });
});
document.addEventListener("DOMContentLoaded", function () {
  categoriesButtons.forEach((button) => {
    button.addEventListener("click", function () {
      categoriesButtons.forEach((btn) => btn.classList.remove("selected"));
      button.classList.add("selected");
      console.log(button);
    });
  });
});
pinnedButtons.forEach((button) => {
  button.addEventListener("click", function () {
    pinnedButtons.forEach((btn) => btn.classList.remove("selected"));
    button.classList.add("selected");
  });
});

reminderButtons.forEach((button) => {
  button.addEventListener("click", function () {
    reminderButtons.forEach((btn) => btn.classList.remove("selected"));
    button.classList.add("selected");
  });
});
unpinned.addEventListener("click", function () {
  unpinned.style.display = "none";
  pinned.style.display = "inline-block";
  isPinned = true;
});
pinned.addEventListener("click", function () {
  pinned.style.display = "none";
  unpinned.style.display = "";
  isPinned = false;
});
alarmOff.addEventListener("click", function () {
  alarmOff.style.display = "none";
  alarmOn.style.display = "inline-block";
  isAlarmOn = true;
  alarmOnContainer.style.display = "flex";
  document.querySelector(".blurContainer").style.filter = "blur(8px)";
});
alarmOn.addEventListener("click", function () {
  alarmOn.style.display = "none";
  alarmOff.style.display = "inline-block";
  isAlarmOn = false;
  document.querySelector(".blurContainer").style.filter = "none";
  alarmOnContainer.style.display = "none";
});
checked.addEventListener("click", function () {
  if (
    titleInput.value.length > 0 &&
    contentInput.value.length > 0 &&
    selectedBgColor === true
  ) {
    const reminderDiv = document.createElement("div");
    reminderDiv.classList.add("remindernr1");
    reminderDiv.style.backgroundColor = selectedColor;
    addReminderContainer.style.display = "none";
    addReminder.style.display = "flex";
    checked.style.display = "none";

    const deleteReminder = document.createElement("img");
    deleteReminder.classList.add("deleteReminder");
    deleteReminder.src = "../images/icon-cross.svg";
    deleteReminder.alt = "";
    reminderDiv.appendChild(deleteReminder);

    deleteReminder.addEventListener("click", function () {
      const parentReminderDiv = deleteReminder.parentElement;

      parentReminderDiv.remove();
    });

    const titleElement = document.createElement("h3");
    titleElement.textContent = titleInput.value;
    reminderDiv.appendChild(titleElement);

    const contentElement = document.createElement("p");
    contentElement.textContent = contentInput.value;
    reminderDiv.appendChild(contentElement);

    if (isAlarmOn === true) {
      const formattedDate = selectedDate.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      });
      const formattedTime = selectedTime.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      });

      const timeElement = document.createElement("span");
      timeElement.textContent = `${formattedDate}, ${formattedTime}`;
      reminderDiv.appendChild(timeElement);
    }
    const upcomingReminders = document.querySelector(".upcoming-reminders");
    const pinnedReminders = document.querySelector(".pinned-reminders");
    if (isPinned === true) {
      pinnedReminders.appendChild(reminderDiv);
      addedRemindersPage.style.display = "flex";
    } else {
      upcomingReminders.appendChild(reminderDiv);
      addedRemindersPage.style.display = "flex";
    }
  } else {
    console.error("Please fill in all required fields and select a color");
  }
});

const calendarInput = flatpickr("#todayInput", {
  dateFormat: "Y-m-d",
  minDate: "today",
  showButton: false,
  onClose: function (selectedDates, dateStr, instance) {
    console.log("Calendar closed");

    selectedDate = selectedDates[0];
  },
});

const timeInput = flatpickr("#timeInput", {
  enableTime: true,
  noCalendar: true,
  dateFormat: "H:i",
  showButton: false,
  onClose: function (selectedDates, dateStr, instance) {
    console.log("Time input closed");
    // Save the selected time
    selectedTime = selectedDates[0];
    setAlarm(selectedTime);
  },
});

backButton.addEventListener("click", function () {
  blankPage.style.display = "flex";
  addReminderContainer.style.display = "none";
  addReminder.style.display = "flex";
  checked.style.display = "none";
});

cancelAlarmBtn.addEventListener("click", function () {
  alarmOn.style.display = "none";
  alarmOff.style.display = "inline-block";
  isAlarmOn = false;
  document.querySelector(".blurContainer").style.filter = "none";
  alarmOnContainer.style.display = "none";
});

saveAlarmBtn.addEventListener("click", function () {
  if (selectedDate && selectedTime) {
    const alarmDateTime = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      selectedTime.getHours(),
      selectedTime.getMinutes()
    );

    setAlarm(alarmDateTime);
  } else {
    console.error("Please select a date and time for the alarm.");
  }
  document.querySelector(".blurContainer").style.filter = "none";
  alarmOnContainer.style.display = "none";
});

function setAlarm(alarmTime) {
  const alarmDateTime = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    selectedDate.getDate(),
    selectedTime.getHours(),
    selectedTime.getMinutes()
  );

  const now = new Date();
  const timeUntilAlarm = alarmDateTime.getTime() - now.getTime();

  setTimeout(() => {
    const alarmAudio = new Audio(alarmSound);
    alarmAudio.play();
    console.log("Alarm triggered!");
  }, timeUntilAlarm);
}

/////////////////////////////Create category////////////
const expandedBar = document.querySelector(".bar-emoji");
const categoryContainer = document.getElementById("category-container");
const createCatBtn = document.getElementById("createCategory");
const editCatBtn = document.querySelector(".editBtn");
const deleteCatBtn = document.querySelector(".deleteCategoryBtn");
const newCatInput = document.querySelector(".addNewCategory");
const binImg = document.getElementById("deletedCategoryBtn");
const saveRemindersBtn = document.querySelector(".saveInCategoryImg");

expandedBar.addEventListener("click", function () {
  if (categoryContainer.style.display === "flex") {
    categoryContainer.style.display = "none";
    addedRemindersPage.style.filter = "none";
  } else {
    categoryContainer.style.display = "flex";
  }
});

createCatBtn.addEventListener("click", function () {
  newCatInput.style.display = "flex";
});

newCatInput.addEventListener("keyup", function (event) {
  const inputValue = newCatInput.value;
  if (event.key === "Enter" && inputValue.length > 0) {
    const newCategoryDiv = document.createElement("div");
    newCategoryDiv.classList.add("newCategory");

    const img = document.createElement("img");
    img.classList.add("folderImg");
    img.src = "../images/folder.png";
    img.alt = "";

    const h4 = document.createElement("h4");
    h4.textContent = inputValue;

    const span = document.createElement("span");
    span.textContent = 0;

    const deleteBtn = document.createElement("img");
    deleteBtn.classList.add("deleteCategoryBtn");
    deleteBtn.src = "../images/icon-cross.svg";
    deleteBtn.alt = "";

    newCategoryDiv.appendChild(img);
    newCategoryDiv.appendChild(h4);
    newCategoryDiv.appendChild(span);
    newCategoryDiv.appendChild(deleteBtn);

    const categoryContainer = document.querySelector(".newInputCat");
    categoryContainer.appendChild(newCategoryDiv);

    newCatInput.value = "";
    newCatInput.style.display = "none";

    const deleteButtons = document.querySelectorAll(".deleteCategoryBtn");

    editCatBtn.addEventListener("click", function () {
      deleteButtons.forEach((deleteBtn) => {
        deleteBtn.style.display = "flex";
      });
    });
    const searchCatBtn = document.querySelector(".categories-searchBar");
    searchCatBtn.innerHTML = "";

    const newCategoryDivs = document.querySelectorAll(".newCategory");

    newCategoryDivs.forEach((div) => {
      const h4 = div.querySelector("h4");
      const newButton = document.createElement("button");
      newButton.textContent = h4.textContent;

      newButton.addEventListener("click", function () {
        const categoriesButtons = document.querySelectorAll(
          ".categories-searchBar button"
        );
        categoriesButtons.forEach((btn) => btn.classList.remove("selected"));

        newButton.classList.add("selected");

        console.log(newButton);
      });

      searchCatBtn.appendChild(newButton);
    });
    // const deletedCategoryTitles = [];

    // function moveDeletedCategory() {
    //   const deletedCategoriesUl = document.querySelector(
    //     ".deletedCategories ul"
    //   );

    //   deletedCategoriesUl.innerHTML = "";

    //   deletedCategoryTitles.forEach((title) => {
    //     const listItem = document.createElement("li");
    //     listItem.textContent = title;
    //     deletedCategoriesUl.appendChild(listItem);
    //   });
    // }

    deleteButtons.forEach((deleteBtn) => {
      deleteBtn.addEventListener("click", function () {
        const categoryDiv = deleteBtn.parentElement;

        categoryDiv.remove();
      });
    });
    deleteButtons.forEach((deleteBtn) => {
      deleteBtn.style.display = "none";
    });

    saveRemindersBtn.addEventListener("click", function () {
      categoryContainer.style.display = "flex";
      addedRemindersPage.style.filter = "blur(8px)";
    });
  }
});
binImg.addEventListener("click", function () {
  document.getElementById("deletedCategoriesDiv").style.display = "flex";
});
document
  .querySelector(".closeDeleteCatContainer")
  .addEventListener("click", function () {
    document.getElementById("deletedCategoriesDiv").style.display = "none";
  });
document
  .querySelector(".open-categories-container")
  .addEventListener("click", function () {
    categoryContainer.style.display = "flex";
  });

window.addEventListener("load", function () {
  if (loadRemindersFromLocalStorage()) {
    addedRemindersPage.style.display = "flex";
    blankPage.style.display = "none";
  } else {
    // No reminders found, do something else
    console.log("No reminders found in local storage.");
  }
});

function saveRemindersToLocalStorage() {
  const reminders = [];
  const pinnedReminders = document.querySelector(".pinned-reminders").innerHTML;
  const upcomingReminders = document.querySelector(
    ".upcoming-reminders"
  ).innerHTML;
  reminders.push({ pinned: pinnedReminders, upcoming: upcomingReminders });
  localStorage.setItem("reminders", JSON.stringify(reminders));
}

function loadRemindersFromLocalStorage() {
  const remindersString = localStorage.getItem("reminders");
  const reminders = JSON.parse(remindersString) || [];
  if (reminders.length > 0) {
    const pinnedReminders = reminders[0].pinned;
    const upcomingReminders = reminders[0].upcoming;
    document.querySelector(".pinned-reminders").innerHTML = pinnedReminders;
    document.querySelector(".upcoming-reminders").innerHTML = upcomingReminders;
    return true;
  } else {
    return false;
  }
}
addedRemindersPage.addEventListener("click", function (event) {
  if (event.target.classList.contains("deleteReminder")) {
    const parentReminderDiv = event.target.parentElement;

    parentReminderDiv.remove();
  }
});

window.addEventListener("load", function () {
  loadRemindersFromLocalStorage();
});

saveRemindersBtn.addEventListener("click", function () {
  saveRemindersToLocalStorage();
});
