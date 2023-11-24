async function generate() {
  const res = await fetch("https://api.adviceslip.com/advice");
  const data = await res.json();
  document.querySelector("p").innerText = "ADVICE # " + data.slip.id;
  document.querySelector("h1").innerText = '"' + data.slip.advice + '"';
}
document.querySelector("button").onclick = () => {
  generate();
};
