import "./style.css";

document.body.innerHTML = `
  <h1> CMPM 121 Project </h1>
  <p> Rocks Collected: <span id="counter"> 0 </span></p>
  <button id = "button"> This is a button 🪨 </button>
`;

const counterElement = document.getElementById("counter")!;
const buttonElement = document.getElementById("button")!;

let counter = 0;
let last = performance.now();

buttonElement.addEventListener("click", () => {
  click();
});

function autoClick() {
  if ((performance.now() - last) > 1000) {
    click();
    last = performance.now();
  }
  requestAnimationFrame(autoClick);
}

function click() {
  counter += 1;
  counterElement.innerHTML = counter.toString();
}

requestAnimationFrame(autoClick);

console.log("my internet is no longer dead lets goooo");
