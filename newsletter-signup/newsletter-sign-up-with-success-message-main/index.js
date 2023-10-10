const submitBtn = document.getElementById("subscribeBtn");
const dismissBtn = document.getElementById("dismissBtn");
const firstPage = document.getElementById("container1");
const emailInput = document.getElementById("email");
const invalidEmail = document.getElementById("invalid-mail");
const secondPage = document.getElementById("container2");
const infoConf = document.getElementById("confirmation-info");

dismissBtn.addEventListener("click", function (event) {
  event.preventDefault();

  secondPage.style.display = "none";
  firstPage.style.display = "flex";
});
emailInput.addEventListener("input", function () {
  const emailValue = emailInput.value;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const invalidEmailClass = "invalid";
  // Regular expression for a basic email pattern

  if (!emailPattern.test(emailValue)) {
    // If the email format is invalid
    emailInput.classList.add(invalidEmailClass);
    invalidEmail.style.opacity = 100;
  } else {
    // If the email format is valid
    emailInput.classList.remove(invalidEmailClass); // Reset the background color
    invalidEmail.style.opacity = 0;
  }
});
submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  if (emailInput.value === "") {
    alert("Email required!");
  } else {
    firstPage.style.display = "none";
    secondPage.style.display = "flex";
    infoConf.innerHTML = `A confirmation email has been sent to <strong>${emailInput.value}</strong>.
  Please open it and click the button inside to confirm your
  subscription.`;
  }
  emailInput.value = "";
});
