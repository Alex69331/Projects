"use strict";

const account1 = {
  owner: "Jonas Schmedtmann",
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

const btnLogin = document.querySelector(".login__btn");
const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");
const containerApp = document.querySelector(".containerApp");
const navBar = document.querySelector(".navbar-nav");
const row = document.querySelector("#row1");
const login = document.querySelector(".login");
const btnScrollTo = document.querySelectorAll(".btn-scroll");

const section1 = document.querySelector("#section--1");

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};

createUsernames(accounts);

let currentAccount;

// btnLogin.addEventListener("click", function (e) {
//   e.preventDefault();

//   currentAccount = accounts.find(
//     (acc) => acc.username === inputLoginUsername.value
//   );
//   console.log(currentAccount);

//   if (currentAccount?.pin === Number(inputLoginPin.value)) {
//     containerApp.style.opacity = 100;
//     row.style.opacity = 100;
//     navBar.style.opacity = 100;
//     login.style.opacity = 0;
//   } else {
//     alert("Incorrect user or password");
//   }
//   inputLoginPin.value = "";
//   inputLoginUsername.value = "";
// });

function handlePriceClick() {
  // Scroll to the pricing section
  document
    .getElementById("pricing target-section")
    .scrollIntoView({ behavior: "smooth" });
  return false; // Prevents the default link behavior
}

function handleDownloadClick() {
  // Scroll to the download section
  document.getElementById("cta").scrollIntoView({ behavior: "smooth" });
  return false; // Prevents the default link behavior
}
