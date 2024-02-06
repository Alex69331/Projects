const filterButtons = document.querySelectorAll(".filter-btn");

let selectedCategories = [];

const searchBar = document.getElementById("searchBar");

const clearBtn = document.getElementById("clearBtn");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    searchBar.style.opacity = "1";
    const category = button.dataset.category;

    if (selectedCategories.includes(category)) {
      selectedCategories = selectedCategories.filter((cat) => cat !== category);
    } else {
      selectedCategories.push(category);
    }

    updateSearchBar();

    filterJobListItems();
  });
});

clearBtn.addEventListener("click", () => {
  selectedCategories = [];
  searchBar.innerHTML = "";

  const jobListItems = document.querySelectorAll(".job-list");
  jobListItems.forEach((item) => {
    item.style.display = "flex";
  });
  searchBar.appendChild(clearBtn);
});

function updateSearchBar() {
  searchBar.innerHTML = "";

  selectedCategories.forEach((category) => {
    const categorySpan = document.createElement("span");
    categorySpan.textContent = category;
    categorySpan.classList.add("selected-category");

    const removeIcon = document.createElement("img");
    removeIcon.src = "images/icon-remove.svg";
    removeIcon.alt = "Remove";
    removeIcon.classList.add("remove-icon");
    removeIcon.addEventListener("click", () => {
      removeCategory(category);
    });

    categorySpan.appendChild(removeIcon);

    searchBar.appendChild(categorySpan);

    searchBar.appendChild(clearBtn);
  });
}

function removeCategory(category) {
  selectedCategories = selectedCategories.filter((cat) => cat !== category);

  updateSearchBar();

  filterJobListItems();
}

function filterJobListItems() {
  const jobListItems = document.querySelectorAll(".job-list");
  jobListItems.forEach((item) => {
    const categories = item.dataset.categories.split(",");
    if (selectedCategories.every((cat) => categories.includes(cat))) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}
