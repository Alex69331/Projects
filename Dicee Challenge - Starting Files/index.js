var randomNumber1 = Math.floor(Math.random() * 6) + 1;

var randomImage = "dice" + randomNumber1 + ".png";

var imageSource = "images/" + randomImage;

var image1 = document.querySelectorAll("img")[0];
image1.setAttribute("src", imageSource);

var randomNumber2 = Math.floor(Math.random() * 6) + 1;

var randomImage2 = "dice" + randomNumber2 + ".png";

var imageSource2 = "images/" + randomImage2;

var image2 = document.querySelectorAll("img")[1];
image2.setAttribute("src", imageSource2);

if (randomNumber1 > randomNumber2) {
  document.querySelector("h1").innerHTML = "Player1 wins";
} else if (randomNumber2 > randomNumber1) {
  document.querySelector("h1").innerHTML = "Player2 wins";
} else {
  document.querySelector("h1").innerHTML = "Draw";
}
var refreshButton = document.getElementById("refreshButton");
refreshButton.addEventListener("click", function () {
  location.reload();
});
