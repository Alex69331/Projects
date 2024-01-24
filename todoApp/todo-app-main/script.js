const newTodoInput = document.getElementById("newTodoInput");
const numbersCheckbox = document.getElementById("numbersCheckbox");

newTodoInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const todoText = newTodoInput.value;

    if (todoText.trim() !== "") {
      const listItem = document.createElement("li");
      const spanElement = document.createElement("span");
      const clonedCheckbox = numbersCheckbox.cloneNode(true);
      const headingElement = document.createElement("h3");
      const numberItemsLeft = document.querySelector(".items-left-number");
      const imgElement = document.createElement("img");
      imgElement.src = "images/icon-cross.svg";
      imgElement.alt = "delete button";

      const allBtn = document.querySelector(".list-all");

      allBtn.click();

      const headingh3Elements = document.getElementsByTagName("h3");
      let numberOfH3Elements = headingh3Elements.length;
      if (numberOfH3Elements <= 5) {
        numberOfH3Elements++;
        numberItemsLeft.textContent = numberOfH3Elements;

        spanElement.classList.add("hover-effect");
        spanElement.style.display = "flex";
        spanElement.style.alignItems = "center";
        imgElement.classList.add("deleteImg");
        headingElement.textContent = todoText;
        const hrElement = document.createElement("hr");

        spanElement.appendChild(clonedCheckbox);
        spanElement.appendChild(headingElement);
        spanElement.appendChild(imgElement);
        listItem.appendChild(spanElement);
        listItem.appendChild(hrElement);

        document.getElementById("todo-list").appendChild(listItem);

        spanElement.classList.add("spanElement-active");

        document.getElementById("todo-list").appendChild(listItem);

        headingElement.classList.add("headingElement-dark");

        const container1 = document.getElementById("container1");
        if (container1.style.backgroundImage.includes("bg-desktop-dark.jpg")) {
          headingElement.classList.add("headingElement-dark");
          headingElement.classList.remove("headingElement-light");
        } else if (
          container1.style.backgroundImage.includes("bg-desktop-light.jpg")
        ) {
          headingElement.classList.remove("headingElement-dark");
          headingElement.classList.add("headingElement-light");

          const hrElements = document.getElementsByTagName("hr");
          for (const hrElement of hrElements) {
            hrElement.style.border = "none";
            hrElement.style.borderTop = "0.1px solid hsl(236, 33%, 92%)";
          }
        }

        clonedCheckbox.addEventListener("change", function () {
          headingElement.style.textDecoration = clonedCheckbox.checked
            ? "line-through"
            : "none";

          headingElement.style.color = clonedCheckbox.checked
            ? "hsl(234, 11%, 52%)"
            : "hsl(234, 39%, 85%)";
          if (
            container1.style.backgroundImage.includes("bg-desktop-light.jpg")
          ) {
            headingElement.style.color = clonedCheckbox.checked
              ? "hsl(234, 11%, 52%)"
              : "black";
          }
        });

        newTodoInput.value = "";

        imgElement.addEventListener("click", function () {
          listItem.remove();

          const hrElement = listItem.nextElementSibling;
          if (hrElement && hrElement.tagName === "HR") {
            hrElement.remove();
          }
          const updatedNumberOfH3Elements =
            document.querySelectorAll("#todo-list h3").length;

          numberItemsLeft.textContent = updatedNumberOfH3Elements;
        });

        const clearBtn = document.querySelector(".list-clear-completed");
        const activeBtn = document.querySelector(".list-active");
        const completedBtn = document.querySelector(".list-completed");

        clearBtn.addEventListener("click", function () {
          if (clonedCheckbox.checked) {
            listItem.remove();

            const updatedNumberOfH3Elements =
              document.querySelectorAll("#todo-list h3").length;
            numberItemsLeft.textContent = updatedNumberOfH3Elements;
          }
          allBtn.click();
        });

        const listItems = document.querySelectorAll(
          "li:not(#container-items-list li)"
        );

        allBtn.addEventListener("click", function () {
          listItems.forEach(function (item) {
            item.style.display = "block";
          });
          const allCheckboxes = document.querySelectorAll(
            'input[type="checkbox"]'
          );

          const numberOfCheckboxes = allCheckboxes.length;

          numberItemsLeft.textContent = numberOfCheckboxes - 1;
        });

        activeBtn.addEventListener("click", function () {
          listItems.forEach(function (item) {
            const clonedCheckbox = item.querySelector(".myCheckbox");

            if (clonedCheckbox && !clonedCheckbox.checked) {
              item.style.display = "block";
            } else {
              item.style.display = "none";
            }
            const checkedCheckboxes = document.querySelectorAll(
              'input[type="checkbox"]:not(:checked)'
            );
            const numberOfCheckedCheckboxes = checkedCheckboxes.length;

            numberItemsLeft.textContent = numberOfCheckedCheckboxes - 1;
          });
        });

        completedBtn.addEventListener("click", function () {
          listItems.forEach(function (item) {
            const clonedCheckbox = item.querySelector(".myCheckbox");

            if (clonedCheckbox && clonedCheckbox.checked) {
              item.style.display = "block";
            } else {
              item.style.display = "none";
            }
            const checkedCheckboxes = document.querySelectorAll(
              'input[type="checkbox"]:checked'
            );
            const numberOfCheckedCheckboxes = checkedCheckboxes.length;

            numberItemsLeft.textContent = numberOfCheckedCheckboxes;
          });
        });
      }
    } else {
      return;
    }
  }
});
const sunBtn = document.querySelector(".sun");
const moonBtn = document.querySelector(".moon");
const container1 = document.getElementById("container1");
const middleButtons = document.querySelector(".list-middle-buttons");

sunBtn.addEventListener("click", function () {
  sunBtn.style.display = "none";
  moonBtn.style.display = "flex";

  container1.style.backgroundImage = "url(images/bg-desktop-light.jpg)";

  document
    .querySelectorAll("li")
    .forEach((li) => (li.style.color = "hsl(234, 11%, 52%)"));

  document.getElementById("todo-list").style.backgroundColor = "hsl(0,0%,98%)";
  document.getElementById("container2").style.backgroundColor =
    "hsl(0, 0%, 96%)";

  document
    .querySelectorAll("h3")
    .forEach((header) => (header.style.color = "black"));

  document.querySelector(".list-all").style.color = "hsl(220, 98%, 61%)";
  document.querySelector(".create-container").style.backgroundColor = "white";
  document.getElementById("newTodoInput").style.color = "black";

  const hrElements = document.getElementsByTagName("hr");
  for (const hrElement of hrElements) {
    hrElement.style.border = "none";
    hrElement.style.borderTop = "0.1px solid hsl(236, 33%, 92%)";
  }

  document.getElementById("todo-list").style.boxShadow =
    "0 4px 8px rgba(0, 0, 0, 0.2)";

  if (window.visualViewport < 701) {
    middleButtons.style.backgroundColor = "hsl(235, 24%, 19%)";
  } else {
    middleButtons.style.backgroundColor = "hsl(0,3%,98%)";
    middleButtons.classList.add("class-box-shadow");
  }
});

moonBtn.addEventListener("click", function () {
  sunBtn.style.display = "flex";
  moonBtn.style.display = "none";

  container1.style.backgroundImage = "url(images/bg-desktop-dark.jpg)";

  if (window.visualViewport < 701) {
    middleButtons.style.backgroundColor = "hsl(235, 24%, 19%)";
  } else {
    middleButtons.style.backgroundColor = "hsl(235, 24%, 19%)";
  }
  document
    .querySelectorAll("li")
    .forEach((li) => (li.classList.add = "dark-mode-li"));
  document
    .querySelectorAll("h3")
    .forEach((header) => (header.style.color = "hsl(234, 39%, 85%)"));
  document.getElementById("todo-list").style.backgroundColor =
    "hsl(235, 24%, 19%)";

  document.getElementById("container2").style.backgroundColor =
    "hsl(235, 21%, 11%)";

  document.querySelector(".list-all").style.color = "hsl(220, 98%, 61%)";
  document.querySelector(".create-container").style.backgroundColor =
    "hsl(235, 24%, 19%)";
  document.getElementById("newTodoInput").style.color = "hsl(234, 11%, 52%)";

  const hrElements = document.getElementsByTagName("hr");
  for (const hrElement of hrElements) {
    hrElement.style.border = "0.1px solid hsl(237, 14%, 26%)";
  }
});
