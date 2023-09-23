let display = document.getElementById("display");
let currentInput = "";
let calculationHistory = [];

function appendToDisplay(value) {
  currentInput += value;
  display.value = currentInput;
}

function clearDisplay() {
  currentInput = "";
  display.value = "";
}

function calculateResult() {
  if (currentInput !== "") {
    try {
      const result = eval(currentInput);
      display.value = result;

      calculationHistory.push({
        expression: currentInput,
        result: result,
      });
    } catch (error) {
      display.value = "error";
    }
  } else {
    display.value = "";
  }
}

function displayHistory() {
  const historyElement = document.getElementById("history");
  historyElement.innerHTML = "";
  calculationHistory.forEach((calculation, index) => {
    historyElement.innerHTML += `${index + 1}: ${calculation.expression} = ${
      calculation.result
    }`;
  });
}
document.getElementById("history").addEventListener("click", function () {
  displayHistory();
});
