const ratingBtn = document.querySelectorAll("#circleBtn");

ratingBtn.forEach(function (btn) {
  btn.addEventListener("click", function () {
    ratingBtn.forEach(function (otherBtn) {
      otherBtn.classList.remove("clicked");
    });
    btn.classList.toggle("clicked");
  });
});
document
  .getElementById("submitBtn")
  .addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("fPage").style.display = "none";
    document.getElementById("newPage").style.display = "flex";
  });

ratingBtn.forEach(function (btn) {
  btn.addEventListener("click", function (event) {
    event.preventDefault();
    const selectedNumber = event.target.getAttribute("data-value");
    console.log(selectedNumber);
    document.getElementById(
      "ratingShow"
    ).textContent = `You selected ${selectedNumber} out of 5`;
  });
});
