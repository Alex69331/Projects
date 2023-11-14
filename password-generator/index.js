var slider = document.getElementById("myRange");
var output = document.querySelector(".charLength");

output.innerHTML = slider.value;

slider.oninput = function () {
  output.innerHTML = this.value;
};

slider.addEventListener("input", function () {
  var x = slider.value;
  var color =
    `linear-gradient(90deg,rgb(117,252,117)` +
    x * 5 +
    `%,
  rgb(214,214,214)` +
    x * 5 +
    `%)`;
  slider.style.background = color;
});

document.addEventListener("DOMContentLoaded", function () {
  const checkboxes = document.querySelectorAll(".myCheckbox");
  const generateBtn = document.querySelector(".generateBtn");

  generateBtn.addEventListener("click", generatePassword);

  function generatePassword() {
    const generatedPasswordElement = document.querySelector(
      ".generated-password"
    );

    const selectedCount = Array.from(checkboxes).filter(
      (checkbox) => checkbox.checked
    ).length;

    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

    let charset = "";
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", updateCharset);
    });

    function updateCharset() {
      charset = "";

      checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
          switch (index) {
            case 0:
              charset += uppercaseChars;
              break;
            case 1:
              charset += lowercaseChars;
              break;
            case 2:
              charset += numberChars;
              break;
            case 3:
              charset += symbolChars;
              break;
            default:
              break;
          }
        }
      });

      if (charset === "") {
        alert("Select at least one checkbox!");
      }
    }

    updateCharset();

    const slider = document.getElementById("myRange");
    const charLength = parseInt(slider.value);

    let password = "";
    for (let i = 0; i < charLength; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }

    generatedPasswordElement.textContent = password;

    document.querySelectorAll(".line").forEach((line) => {
      line.style.backgroundColor = "";
    });
    const passwordStrengthElement = document.getElementById("passwordStrength");
    if (selectedCount === 1) {
      passwordStrengthElement.textContent = "Easy";
      document.querySelector(".easy-line").style.backgroundColor = "Yellow";
    } else if (selectedCount === 2) {
      passwordStrengthElement.textContent = "Medium";
      document.querySelector(".easy-line").style.backgroundColor = "Yellow";
      document.querySelector(".medium-line").style.backgroundColor = "Yellow";
    } else if (selectedCount === 3) {
      passwordStrengthElement.textContent = "Hard";
      document.querySelector(".easy-line").style.backgroundColor = "Yellow";
      document.querySelector(".medium-line").style.backgroundColor = "Yellow";
      document.querySelector(".hard-line").style.backgroundColor = "Yellow";
    } else if (selectedCount === 4) {
      passwordStrengthElement.textContent = "Expert";
      document.querySelector(".easy-line").style.backgroundColor = "Yellow";
      document.querySelector(".medium-line").style.backgroundColor = "Yellow";
      document.querySelector(".hard-line").style.backgroundColor = "Yellow";
      document.querySelector(".expert-line").style.backgroundColor = "Yellow";
    } else {
      passwordStrengthElement.textContent = "None";
    }

    const copyIcon = document.getElementById("copyIcon");
    const generatedPassword = document.querySelector(".generated-password");

    copyIcon.addEventListener("click", function () {
      const range = document.createRange();
      const textArea = document.createElement("textarea");

      textArea.value = generatedPassword.textContent;

      document.body.appendChild(textArea);

      range.selectNodeContents(textArea);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      textArea.select();
      document.execCommand("copy");

      document.body.removeChild(textArea);

      copyIcon.textContent = "Ok!";
      setTimeout(() => {
        copyIcon.textContent = "";
      }, 1500);
    });
  }
});
