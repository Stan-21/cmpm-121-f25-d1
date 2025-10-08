import "./style.css";

document.body.innerHTML = `
  <h1> CMPM 121 Project </h1>
  <p> Rocks Collected: <span id="counter"> 0 </span></p>
  <button id = "button"> This is a button 🪨 </button>
  <button id = "autoUpgrade"> Upgrade Auto Mine </button>
`;

const counterElement = document.getElementById("counter")!;
const buttonElement = document.getElementById("button")!;
const upgradeElement = document.getElementById("autoUpgrade")!;

let counter = 0;

buttonElement.addEventListener("click", () => {
  click();
});

upgradeElement.addEventListener("click", () => {
  autoMine = true;
  counter -= 10;
  interval = Math.ceil(interval / 2);
});

function tick() {
  if (counter < 10) {
    (upgradeElement as HTMLButtonElement).disabled = true;
  } else {
    (upgradeElement as HTMLButtonElement).disabled = false;
  }
  autoClick();
  requestAnimationFrame(tick);
}

let lastTime = performance.now();
let autoMine = false; // Auto mine flag
let interval = 2000;

function autoClick() {
  const currentTime = performance.now();
  const elapsedTime = currentTime - lastTime;

  if (elapsedTime >= interval) {
    if (autoMine) {
      click();
    }
    lastTime = currentTime - (elapsedTime % interval);
  }
}

function click() {
  counter += 1;
  counterElement.innerHTML = counter.toString();
}

requestAnimationFrame(tick);

console.log("my internet is no longer dead lets goooo");
