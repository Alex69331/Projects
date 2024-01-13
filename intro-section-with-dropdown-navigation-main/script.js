const featureHeading = document.querySelector(".feature-heading");
const companyHeading = document.querySelector(".company-heading");
const dropdown = document.querySelector(".dropdown-content");
const arrowImg = document.querySelector(".arrow-img");
const arrowImg2 = document.querySelector(".arrow-img2");
const dropdown2 = document.querySelector(".dropdown-content-2");
const mobileMenu = document.querySelector(".mobile-menu");
const closeMobileMenu = document.querySelector(".mobile-menu-close");
const containerBar = document.getElementById("container-bar");

featureHeading.addEventListener("click", function () {
  dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
  if (dropdown.style.display === "block") {
    featureHeading.style.color = "black";
  } else {
    featureHeading.style.color = "hsl(0, 0%, 41%)";
  }
  arrowImg.src =
    dropdown.style.display === "block"
      ? "images/icon-arrow-up.svg"
      : "images/icon-arrow-down.svg";
});
companyHeading.addEventListener("click", function () {
  dropdown2.style.display =
    dropdown2.style.display === "none" ? "block" : "none";

  if (dropdown2.style.display === "block") {
    companyHeading.style.color = "black";
  } else {
    companyHeading.style.color = "hsl(0, 0%, 41%)";
  }

  arrowImg2.src =
    dropdown2.style.display === "block"
      ? "images/icon-arrow-up.svg"
      : "images/icon-arrow-down.svg";
});
mobileMenu.addEventListener("click", function () {
  containerBar.style.display = "flex";
  closeMobileMenu.style.display = "flex";
  document.getElementById("container").style.backgroundColor =
    "rgba(0, 0, 0, 0.5)";
  document.getElementById("container-photo").style.opacity = "80%";
});
closeMobileMenu.addEventListener("click", function () {
  containerBar.style.display = "none";
  closeMobileMenu.style.display = "none";
  document.getElementById("container").style.backgroundColor = "white";
  document.getElementById("container-photo").style.opacity = "100%";
});
