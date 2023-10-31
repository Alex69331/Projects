const billInput = document.getElementById("billInp");
const peopleInput = document.querySelector(".peopleInp");
const spanText = document.querySelector(".redText");
const tipBtns = document.querySelectorAll(".tip");
const resetBtn = document.querySelector(".resetBtn");
const totalResult = document.getElementById("totalResult");
const tipResult = document.getElementById("tipResult");
const customTip = document.getElementById("inputCustomBtn");

billInput.addEventListener("focus", function () {
  billInput.style.border = "2px solid hsl(185, 41%, 75%)";
});
peopleInput.addEventListener("input", function () {
  if (peopleInput.value.length > 4) {
    peopleInput.value = peopleInput.value.slice(0, 4);
  }
  if (/^(?!0$)[1-9]\d*$/.test(peopleInput.value)) {
    peopleInput.style.border = "none";
    spanText.style.opacity = 0;
  } else {
    peopleInput.style.border = "2px solid hsl(0, 100%, 70%)";
    spanText.style.opacity = 1;
  }
});

billInput.addEventListener("input", function () {
  if (billInput.value.length > 7) {
    billInput.value = billInput.value.slice(0, 7);
  }
});

customTip.addEventListener("input", function () {
  if (customTip.value.length > 3) {
    customTip.value = customTip.value.slice(0, 3);
  }
});
function updateTipAmount() {
  tipResult.textContent = "$0.00";
  tipResult.style.fontSize = "3rem";
  tipResult.style.marginTop = "0";
  const billValue = billInput.value;
  const peopleValue = peopleInput.value;
  const selectedTipButton = document.querySelector(".tip.selected");

  if (
    billValue &&
    peopleValue &&
    peopleValue !== "0" &&
    selectedTipButton &&
    !/^(0[1-9]+|0)$/.test(peopleValue) &&
    (!(isNaN(billValue) || isNaN(peopleValue)) ||
      (/^(?!0$)([1-9]\d*|0)$/.test(billValue) &&
        /^(?!0$)([1-9]\d*|0)$/.test(peopleValue)))
  ) {
    const billAmount = parseFloat(billValue);
    const persons = parseFloat(peopleValue);
    const selectedTipPercentage = parseFloat(selectedTipButton.value);

    const tip = (billAmount * selectedTipPercentage) / 100;
    const tipAmount = tip / persons;
    tipResult.textContent = `$${tipAmount.toFixed(2)}`;
    updateTotalAmount(tipAmount, billAmount, persons);
    if (tipAmount.toFixed(2).length >= 6 && tipAmount.toFixed(2).length <= 8) {
      totalResult.style.marginRight = "auto";
      totalResult.style.fontSize = "2.3rem";
      totalResult.style.marginTop = "0.5rem";
      tipResult.style.fontSize = "2.3rem";
      tipResult.style.marginTop = "0.5rem";
    } else if (tipAmount.toFixed(2).length > 8) {
      totalResult.style.marginRight = "1rem";
      tipResult.style.fontSize = "1.7rem";
      tipResult.style.marginTop = "0.8rem";
      totalResult.style.fontSize = "1.7rem";
      totalResult.style.marginTop = "0.8rem";
    } else {
      totalResult.style.fontSize = "3rem";
      totalResult.style.marginTop = "0rem";
      tipResult.style.fontSize = "3rem";
      tipResult.style.marginTop = "0";
      totalResult.style.marginRight = "1rem";
    }
  }
}

function updateTotalAmount() {
  totalResult.style.marginRight = "1.5rem";
  totalResult.textContent = "$0.00";
  totalResult.style.fontSize = "3rem";
  totalResult.style.marginTop = "0";

  const billValue = parseFloat(billInput.value);
  const peopleValue = parseFloat(peopleInput.value);
  const selectedTipButton = document.querySelector(".tip.selected");

  if (!isNaN(billValue) && !isNaN(peopleValue) && selectedTipButton) {
    // Perform your calculations
    const selectedTipPercentage = parseFloat(selectedTipButton.value);
    const tip = (billValue * selectedTipPercentage) / 100;
    const tipAmount = tip / peopleValue;

    totalResult.textContent = `$${(billValue / peopleValue + tipAmount).toFixed(
      2
    )}`;
  }
}

billInput.addEventListener("input", updateTipAmount);
peopleInput.addEventListener("input", updateTipAmount);

tipBtns.forEach((button) => {
  button.addEventListener("click", () => {
    tipBtns.forEach((btn) => {
      btn.classList.remove("selected");
    });
    button.classList.add("selected");

    updateTipAmount();
  });
});
resetBtn.addEventListener("click", function () {
  tipBtns.forEach((btn) => {
    btn.classList.remove("selected");
  });
  peopleInput.value = "0";
  billInput.value = "0";
  tipResult.textContent = "$0.00";
  totalResult.textContent = "$0.00";
  customTip.value = "";
  updateTipAmount();
  updateTotalAmount();
});
