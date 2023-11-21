const cardNr = document.querySelector(".card-number");
const inputCardNr = document.getElementById("inputCardNr");
const inputName = document.getElementById("inputName");
const cardName = document.querySelector(".container-card-name");
const inpYear = document.getElementById("date-year");
const expYear = document.getElementById("card-year");
const inpMonth = document.getElementById("date-month");
const expMonth = document.getElementById("card-month");
const cvc = document.getElementById("cvcNr");
const inpCvc = document.getElementById("cvc");
const cvcError = document.querySelector(".cvcError");
const dateError = document.querySelector(".dateError");
const inputNameError = document.querySelector(".inputNameError");
const inputNrError = document.querySelector(".inputNrError");
const confirmBtn = document.getElementById("confirmBtn");
const pageContent = document.querySelector(".second-page");
const thanksPage = document.getElementById("thanksPage");
const continueBtn = document.getElementById("continueBtn");

inputName.addEventListener("input", function () {
  let enteredText = inputName.value;

  const formattedText = enteredText.replace(/[^a-zA-Z\s]/g, "").toUpperCase();

  const textWithMaxThreeConsecutive = formattedText.replace(
    /([a-zA-Z])\1{2,}/g,
    "$1$1"
  );

  const words = textWithMaxThreeConsecutive.split(/\s+/).filter(Boolean);

  if (words.length <= 2) {
    inputName.value = textWithMaxThreeConsecutive;
    cardName.textContent = textWithMaxThreeConsecutive;
  } else {
    inputName.value = words.slice(0, 2).join(" ");
    cardName.textContent = words.slice(0, 2).join(" ");
  }
  if (enteredText.length === 0) {
    inputName.style.border = "1px solid hsl(0, 100%, 66%)";
    inputNameError.style.display = "flex";
  } else {
    inputName.style.border = "1px solid gray";
    inputNameError.style.display = "none";
  }
});

inputCardNr.addEventListener("input", function () {
  let enteredNr = inputCardNr.value.replace(/\D/g, "");

  enteredNr = enteredNr.slice(0, 16);

  const formattedNr = enteredNr.replace(/(\d{4})/g, "$1 ").trim();

  inputCardNr.value = formattedNr;
  cardNr.textContent = formattedNr;

  if (enteredNr.length !== 16) {
    inputCardNr.style.border = "1px solid hsl(0, 100%, 66%)";
    inputNrError.style.display = "flex";
  } else {
    inputCardNr.style.border = "1px solid gray";
    inputNrError.style.display = "none";
  }
});

inpYear.addEventListener("input", function () {
  let enteredYear = inpYear.value;

  enteredYear = enteredYear.replace(/\D/g, "");

  inpYear.value = enteredYear;
  expYear.textContent = enteredYear;

  if (enteredYear.length !== 2 || parseInt(enteredYear, 10) < 23) {
    inpYear.style.border = "1px solid hsl(0, 100%, 66%)";
    dateError.style.display = "flex";
  } else {
    inpYear.style.border = "1px solid gray";
    dateError.style.display = "none";
  }
});

inpMonth.addEventListener("input", function () {
  let enteredMonth = inpMonth.value;

  enteredMonth = enteredMonth.replace(/\D/g, "");

  inpMonth.value = enteredMonth;
  expMonth.textContent = enteredMonth;

  if (enteredMonth.length !== 2 || parseInt(enteredMonth, 10) > 12) {
    inpMonth.style.border = "1px solid hsl(0, 100%, 66%)";
    dateError.style.display = "flex";
  } else {
    inpMonth.style.border = "1px solid gray";
    dateError.style.display = "none";
  }
});

inpCvc.addEventListener("input", function () {
  let enteredCvc = inpCvc.value;

  enteredCvc = enteredCvc.replace(/\D/g, "");

  inpCvc.value = enteredCvc;
  cvc.textContent = enteredCvc;

  if (enteredCvc.length !== 3) {
    inpCvc.style.border = "1px solid hsl(0, 100%, 66%)";
    cvcError.style.display = "flex";
  } else {
    inpCvc.style.border = "1px solid gray";
    cvcError.style.display = "none";
  }
});

confirmBtn.addEventListener("click", function () {
  if (
    inpMonth.value.length > 1 &&
    inpMonth.value < 13 &&
    inpYear.value.length > 1 &&
    inpYear.value > 22 &&
    inputName.value.length > 5 &&
    inputCardNr.value.length > 18 &&
    inpCvc.value.length > 2
  ) {
    pageContent.style.display = "none";
    thanksPage.style.display = "flex";
  } else {
    return;
  }
});

continueBtn.addEventListener("click", function () {
  location.reload();
});
