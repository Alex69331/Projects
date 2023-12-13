const inputPhone = document.getElementById("telNr");
const inputMail = document.getElementById("mailInput");
const inputName = document.getElementById("nameInput");
const nameForm = document.getElementById("nameForm");
const mailForm = document.getElementById("mailForm");
const telForm = document.getElementById("telForm");
const nextStepBtn = document.getElementById("nextBtn");
const container2 = document.getElementById("container2");
const phoneError = document.getElementById("telError");
const nameError = document.getElementById("nameError");
const mailError = document.getElementById("mailError");
const page1NextBtn = document.getElementById("nextBtn");

inputName.addEventListener("input", function () {
  let enteredText = inputName.value;

  if (enteredText.length < 8) {
    nameError.style.opacity = "1";
    inputName.style.border = "2px solid hsl(354, 84%, 57%)";
  } else {
    nameError.style.opacity = "0";
    inputName.style.border = "1px solid hsl(229, 24%, 87%)";
  }
  const formattedText = enteredText.replace(/[^a-zA-Z\s]/g, "").toLowerCase();

  const textWithFirstUppercase = formattedText.replace(
    /\b(?![0-9])[a-zA-Z]/g,
    (char) => char.toUpperCase()
  );

  inputName.value = textWithFirstUppercase;
});

inputMail.addEventListener("input", function () {
  let enteredMail = inputMail.value;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(enteredMail)) {
    mailError.style.opacity = "1";
    inputMail.style.border = "2px solid hsl(354, 84%, 57%)";
  } else {
    mailError.style.opacity = "0";
    inputMail.style.border = "1px solid hsl(229, 24%, 87%)";
  }
});

inputPhone.addEventListener("input", function () {
  let enteredNr = inputPhone.value.replace(/\D/g, "");

  enteredNr = enteredNr.slice(0, 16);

  const formattedNr = enteredNr.replace(/(\d{5})/g, "$1 ").trim();

  const countDigits = formattedNr.replace(/\s/g, "").length;

  inputPhone.value = formattedNr;
  if (countDigits < 8) {
    phoneError.style.opacity = "1";
    inputPhone.style.border = "2px solid hsl(354, 84%, 57%)";
  } else {
    phoneError.style.opacity = "0";
    inputPhone.style.border = "1px solid hsl(229, 24%, 87%)";
  }
});
page1NextBtn.addEventListener("click", function () {
  const enteredName = inputName.value;
  const enteredMail = inputMail.value;
  const enteredPhone = inputPhone.value;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (
    enteredPhone.length > 8 &&
    emailPattern.test(enteredMail) &&
    enteredName.length > 5
  ) {
    document.getElementById("container2").style.display = "none";
    document.getElementById("container3").style.display = "flex";
    document.getElementById("step1").style.backgroundColor = "inherit";
    document.getElementById("step1").style.color = "white";
    document.getElementById("step2").style.backgroundColor = "white";
    document.getElementById("step2").style.color = "black";
  }
});

//////////////////////////////////////
///Page2
const toggleBar = document.getElementById("toggleBar");
const indicator = document.querySelector(".indicator");
const monthlyPart = document.querySelector(".monthly");
const yearlyPart = document.querySelector(".yearly");
const plans = document.querySelectorAll(".plan");
const yearlySpans = document.querySelectorAll(".yearly-text");
const planTitles = document.querySelectorAll(".planTitle");
const planText1 = document.querySelector(".planText1");
const planText2 = document.querySelector(".planText2");
const planText3 = document.querySelector(".planText3");
const page2BackBtn = document.getElementById("page2-backBtn");
const page2NextBtn = document.getElementById("page2-nextBtn");
const addOn1 = document.getElementById("add-on-price1");
const addOn2 = document.getElementById("add-on-price2");
const addOn3 = document.getElementById("add-on-price3");

let isYearly = false;
const selectedFinalPlan = document.getElementById("selected-final-plan");
const selectedPlanPrice = document.getElementById("selected-plan-price");
const finalPrice = document.getElementById("total-price");
const totalPriceElement = document.getElementById("total-price-checkout");

let total = 0;
function updateTotal() {
  total = priceElement + totalPrice;
  console.log(total);
}

let selectedPlan = null;

toggleBar.addEventListener("click", function () {
  isYearly = !isYearly;
  var viewportWidth = window.innerWidth;
  var plans = document.querySelectorAll(".plan");

  if (isYearly) {
    indicator.style.transform = "translateX(100%)";
    document.querySelector(".monthly").style.color = "gray";
    document.querySelector(".yearly").style.color = "hsl(213, 96%, 18%)";

    yearlySpans.forEach((span) => {
      span.style.opacity = "1";
      planTitles.forEach((planTitle) => {
        if (viewportWidth <= 798) {
          planTitle.style.marginTop = "-2.8rem";
          span.style.marginLeft = "5rem";
          document.getElementById("container3").style.paddingBottom = "20px";
          plans.forEach(function (plan) {
            plan.style.height = "100px";
          });
        } else {
          planTitle.style.marginTop = "1.9rem";
        }
      });
      planText1.textContent = "$90/yr";
      planText2.textContent = "$120/yr";
      planText3.textContent = "$150/yr";

      addOn1.textContent = "+$10/yr";
      addOn2.textContent = "+$20/yr";
      addOn3.textContent = "+$20/yr";
    });

    selectedFinalPlan.textContent =
      selectedPlan.querySelector("h3").textContent + "(Yearly)";
    selectedPlanPrice.textContent = selectedPlan.querySelector("p").textContent;
    finalPrice.textContent = "Total (per Year)";

    totalPriceElement.textContent = `+$${total}/yr`;
    selectedPlan.classList.remove("plan-selected");
    selectedPlan = null;

    updateTotal();
  } else {
    indicator.style.transform = "translateX(0)";
    document.querySelector(".yearly").style.color = "gray";
    document.querySelector(".monthly").style.color = "hsl(213, 96%, 18%)";
    yearlySpans.forEach((span) => {
      span.style.opacity = "0";
      planTitles.forEach((planTitle) => {
        if (viewportWidth <= 798) {
          planTitle.style.marginTop = "-2.8rem";
          plans.forEach(function (plan) {
            plan.style.height = "80px";
          });
        } else {
          planTitle.style.marginTop = "2.9rem";
        }
      });
      planText1.textContent = "$9/mo";
      planText2.textContent = "$12/mo";
      planText3.textContent = "$15/mo";

      addOn1.textContent = "+$1/mo";
      addOn2.textContent = "+$2/mo";
      addOn3.textContent = "+$2/mo";
    });

    selectedFinalPlan.textContent =
      selectedPlan.querySelector("h3").textContent + "(Monthly)";
    selectedPlanPrice.textContent = selectedPlan.querySelector("p").textContent;
    finalPrice.textContent = "Total (per Month)";
    selectedPlan.classList.remove("plan-selected");
    selectedPlan = null;
    updateTotal();
  }
});

let priceElement = 0;
function updatePriceElement(newValue) {
  priceElement = newValue;
  console.log(priceElement);
  return priceElement;
  updateTotal();
}

plans.forEach((plan) => {
  plan.addEventListener("click", function () {
    if (selectedPlan !== null) {
      selectedPlan.classList.remove("plan-selected");
    }
    plan.classList.add("plan-selected");
    selectedPlan = plan;

    selectedPlanPrice.textContent = selectedPlan.querySelector("p").textContent;
    const spanText = selectedPlan.querySelector("p").textContent;
    const numericValue = parseFloat(spanText.replace(/[^\d.]/g, ""));

    if (!isNaN(numericValue)) {
      updatePriceElement(numericValue);
    } else {
      alert("select");
    }
    updateTotal();
    console.log(selectedPlan);
  });
});

page2BackBtn.addEventListener("click", function () {
  document.getElementById("container2").style.display = "flex";
  document.getElementById("container3").style.display = "none";
  document.getElementById("step1").style.backgroundColor = "white";
  document.getElementById("step1").style.color = "black";
  document.getElementById("step2").style.backgroundColor = "inherit";
  document.getElementById("step2").style.color = "white";
});

page2NextBtn.addEventListener("click", function () {
  if (selectedPlan !== null) {
    document.getElementById("container3").style.display = "none";
    document.getElementById("container4").style.display = "flex";
    document.getElementById("step2").style.backgroundColor = "inherit";
    document.getElementById("step2").style.color = "white";
    document.getElementById("step3").style.backgroundColor = "white";
    document.getElementById("step3").style.color = "black";
  }
});

//////////////////////////Page3
const page3BackBtn = document.getElementById("page3-backBtn");
const page3NextBtn = document.getElementById("page3-nextBtn");

document.addEventListener("DOMContentLoaded", function () {
  const checkboxes = document.querySelectorAll(".checkbox-input");

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const parentExtraService = this.closest(".extra-service");
      if (this.checked) {
        parentExtraService.classList.add("checkbox-checked");
      } else {
        parentExtraService.classList.remove("checkbox-checked");
      }
    });
  });
});

let totalPrice = 0;
function updateTotalPrice(newValue) {
  totalPrice = newValue;
  console.log(totalPrice);
  return totalPrice;
  updateTotal();
}
const addPrice = document.getElementById("add-on-price");
const addOnOption = document.getElementById("add-on-option");
document.addEventListener("DOMContentLoaded", function () {
  const serviceParents = document.querySelectorAll(".extra-service");

  const option = document.getElementById("check-out-option");

  serviceParents.forEach((service) => {
    service.addEventListener("click", function () {
      totalPrice = 0;
      const checkbox = this.querySelector(".checkbox-input");
      checkbox.checked = !checkbox.checked;
      const checkedCheckboxes = document.querySelectorAll(
        ".checkbox-input:checked"
      );
      let allH3Text = "";
      let allSpanText = "";

      checkedCheckboxes.forEach((checkedCheckbox) => {
        const parentExtraService = checkedCheckbox.closest(".extra-service");
        const h3Text =
          parentExtraService.querySelector(".extra-service h3").textContent;
        const spanText = parentExtraService.querySelector("span").textContent;
        const numberFromSpan = parseFloat(spanText.match(/\d+(\.\d+)?/)[0]);

        allH3Text += h3Text + "<br>";
        allSpanText += spanText + "<br>";

        totalPrice += numberFromSpan;
      });
      updateTotalPrice(totalPrice);

      addOnOption.innerHTML = allH3Text.trim();
      addPrice.innerHTML = allSpanText.trim();
      updateCheckboxState(this, checkbox.checked);

      updateTotal();
    });
  });

  function updateCheckboxState(parent, isChecked) {
    if (isChecked) {
      parent.classList.add("checkbox-checked");
    } else {
      parent.classList.remove("checkbox-checked");
    }
    updateTotal();
  }
});

page3BackBtn.addEventListener("click", function () {
  document.getElementById("container3").style.display = "flex";
  document.getElementById("container4").style.display = "none";
  document.getElementById("step2").style.backgroundColor = "white";
  document.getElementById("step2").style.color = "black";
  document.getElementById("step3").style.backgroundColor = "inherit";
  document.getElementById("step3").style.color = "white";
  const checkboxes = document.querySelectorAll(".checkbox-input:checked");
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
    checkbox.closest(".extra-service").classList.remove("checkbox-checked");
  });
  addOnOption.innerHTML = "";
  addPrice.innerHTML = "";
  updateTotalPrice(0);
  updateTotal();
});

page3NextBtn.addEventListener("click", function () {
  document.getElementById("container4").style.display = "none";
  document.getElementById("container5").style.display = "flex";
  if (isYearly) {
    totalPriceElement.textContent = `+$${total}/yr`;
  } else {
    totalPriceElement.textContent = `+$${total}/mo`;
  }
  updateTotal();
  document.getElementById("step3").style.backgroundColor = "inherit";
  document.getElementById("step3").style.color = "white";
  document.getElementById("step4").style.backgroundColor = "white";
  document.getElementById("step4").style.color = "black";
});

//////////////////Page4

const page4BackBtn = document.querySelector(".page4-backBtn");
const page4confirmBtn = document.querySelector(".page4-confirmBtn");
const changeBtn = document.querySelector(".change-text");
const addOnOption1 = document.getElementById("add-on-option1");

page4BackBtn.addEventListener("click", function () {
  document.getElementById("container5").style.display = "none";
  document.getElementById("container4").style.display = "flex";
  document.getElementById("step4").style.backgroundColor = "inherit";
  document.getElementById("step4").style.color = "white";
  document.getElementById("step3").style.backgroundColor = "white";
  document.getElementById("step3").style.color = "black";
});

changeBtn.addEventListener("click", function () {
  // Hide container5 and show container3
  document.getElementById("container5").style.display = "none";
  document.getElementById("container3").style.display = "flex";
  const checkboxes = document.querySelectorAll(".checkbox-input:checked");
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
    checkbox.closest(".extra-service").classList.remove("checkbox-checked");
  });
  addOnOption.innerHTML = "";
  addPrice.innerHTML = "";
  updateTotalPrice(0);
  updateTotal();
  document.getElementById("step4").style.backgroundColor = "inherit";
  document.getElementById("step4").style.color = "white";
  document.getElementById("step2").style.backgroundColor = "white";
  document.getElementById("step2").style.color = "black";
});
page4confirmBtn.addEventListener("click", function () {
  document.getElementById("container5").style.display = "none";
  document.getElementById("container6").style.display = "flex";
});
