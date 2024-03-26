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
      ? "../images/icon-arrow-up.svg"
      : "../images/icon-arrow-down.svg";
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
      ? "../images/icon-arrow-up.svg"
      : "../images/icon-arrow-down.svg";
});
mobileMenu.addEventListener("click", function () {
  mobileMenu.style.display = "none";
  containerBar.style.display = "flex";
  containerBar.style.opacity = "1";
  closeMobileMenu.style.display = "flex";
  document.getElementById("container").style.backgroundColor =
    "rgba(0, 0, 0, 0.5)";
  document.getElementById("container-photo").style.filter = "blur(5px)";
  document.getElementById("container").style.filter = "blur(5px)";
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
closeMobileMenu.addEventListener("click", function () {
  mobileMenu.style.display = "flex";
  containerBar.style.display = "none";
  closeMobileMenu.style.display = "none";
  document.getElementById("container").style.backgroundColor = "white";
  document.getElementById("container-photo").style.opacity = "100%";
  document.getElementById("container-photo").style.filter = "none";
  document.getElementById("container").style.filter = "none";
});

const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const loginContainer = document.getElementById("loginContainer");
const container = document.getElementById("container");
const crossIcon = document.getElementById("icon-cross");
const snapLogo = document.querySelector(".snap-logo");
const registerContainer = document.getElementById("registerContainer");
const iconCross2 = document.querySelector(".icon-cross2");
const signIn = document.getElementById("signIn");
const signUp = document.getElementById("signUp");

loginBtn.addEventListener("click", function () {
  container.classList.add("blur");
  containerBar.classList.add("blur");
  snapLogo.classList.add("blur");
  loginContainer.style.display = "block";
});

registerBtn.addEventListener("click", function () {
  container.classList.add("blur");
  containerBar.classList.add("blur");
  snapLogo.classList.add("blur");
  registerContainer.style.display = "block";
});

signIn.addEventListener("click", function () {
  registerContainer.style.display = "none";
  loginContainer.style.display = "block";
});
signUp.addEventListener("click", function () {
  loginContainer.style.display = "none";
  registerContainer.style.display = "block";
});

crossIcon.addEventListener("click", function () {
  container.classList.remove("blur");
  containerBar.classList.remove("blur");
  snapLogo.classList.remove("blur");
  loginContainer.style.display = "none";
});
iconCross2.addEventListener("click", function () {
  container.classList.remove("blur");
  containerBar.classList.remove("blur");
  snapLogo.classList.remove("blur");
  registerContainer.style.display = "none";
});
$(document).ready(function () {
  $("#submitBtn").click(function () {
    submitForm();
  });
});

function submitForm() {
  var form = document.getElementById("registrationForm");
  var formData = new FormData(form);
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        if (xhr.responseText === "Registration successful") {
          document.getElementById("errorContainer").style.color = "blue";
          document.getElementById("errorContainer").style.fontSize = "15px";
          document.getElementById("errorContainer").innerText =
            xhr.responseText;
          setTimeout(function () {
            window.location.href = "../index.php";
          }, 2000);
        } else {
          document.getElementById("errorContainer").innerText =
            xhr.responseText;
        }
      } else {
        console.error("Error:", xhr.status);
      }
    }
  };
  xhr.open("POST", "../phps/register.php", true);
  xhr.send(formData);
}

function submitForm2() {
  var form = document.getElementById("loginForm");
  var formData = new FormData(form);
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        if (xhr.responseText === "success") {
          window.location.href = "../htmls/home.html";
        } else {
          document.getElementById("errorLogin").innerText = xhr.responseText;
        }
      } else {
        console.error("Error:", xhr.status);
      }
    }
  };
  xhr.open("POST", "../index.php", true);
  xhr.send(formData);
}
document.getElementById("loginForm").addEventListener("submit", function () {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  var loginSuccess = username === "user" && password === "password";
  console.log(username);
  console.log(password);
});

const nodemailer = require("nodemailer");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function generateConfirmationCode() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}

// Function to send a confirmation email with the code
function sendConfirmationEmail(email, confirmationCode) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "alexursa2@gmail.com",
      pass: "kckn ycuz kkip plvv",
    },
  });

  const mailOptions = {
    from: "alexursa2@gmail.com",
    to: email,
    subject: "Password Reset Confirmation Code",
    text: `Your confirmation code is: ${confirmationCode}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

// Main function
function main() {
  // Prompt the user to enter their email address
  rl.question("Enter your email address: ", (email) => {
    // Generate a confirmation code
    const confirmationCode = generateConfirmationCode();

    sendConfirmationEmail(email, confirmationCode);

    console.log("Confirmation code sent successfully!");
    rl.close();
  });
}

main();
