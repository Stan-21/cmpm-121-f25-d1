import "./style.css";

document.body.innerHTML = `
  <h1> CMPM 121 Project </h1>
  <p> Rocks Collected: <span id="counter"> 0 </span></p>
  <p> Status: <span id="status"> 0 rocks/sec </span></p>
  <button id = "rock"> 🪨 </button>
  <button id = "button"> 🪨⛏️ </button>
  <p>
    <button id = "pickUpgrade"> Auto Pick (x0) </button>
    <button id = "drillUpgrade"> Driller (x0) </button>
    <button id = "bombUpgrade"> Bomber (x0) </button>
  </p>
`;

interface Upgrade {
  name: string;
  cost: number;
  rate: number;
}

const counterElement = document.getElementById("counter")!;
const statusElement = document.getElementById("status")!;
const buttonElement = document.getElementById("button")!;

const pickUpgrade = document.getElementById("pickUpgrade")!;
const drillUpgrade = document.getElementById("drillUpgrade")!;
const bombUpgrade = document.getElementById("bombUpgrade")!;

let counter = 0;
let autoMineCount = 0;
let drillerCount = 0;
let bomberCount = 0;

buttonElement.addEventListener("click", () => {
  click();
});

pickUpgrade.addEventListener("click", () => {
  autoMineCount += 1;
  pickUpgrade.innerText = `Auto Pick (x${autoMineCount})`;
  counter -= 10;
  minePower += 0.1;
});

drillUpgrade.addEventListener("click", () => {
  drillerCount += 1;
  drillUpgrade.innerText = `Driller (x${drillerCount})`;
  counter -= 100;
  minePower += 2;
});

bombUpgrade.addEventListener("click", () => {
  bomberCount += 1;
  bombUpgrade.innerText = `Bomber (x${bomberCount})`;
  counter -= 1000;
  minePower += 50;
});

function tick() {
  if (counter >= 1000) {
    (pickUpgrade as HTMLButtonElement).disabled = false;
    (drillUpgrade as HTMLButtonElement).disabled = false;
    (bombUpgrade as HTMLButtonElement).disabled = false;
  } else if (counter >= 100) {
    (pickUpgrade as HTMLButtonElement).disabled = false;
    (drillUpgrade as HTMLButtonElement).disabled = false;
  } else if (counter >= 10) {
    (pickUpgrade as HTMLButtonElement).disabled = false;
  } else {
    (pickUpgrade as HTMLButtonElement).disabled = true;
    (drillUpgrade as HTMLButtonElement).disabled = true;
    (bombUpgrade as HTMLButtonElement).disabled = true;
  }
  autoClick();
  requestAnimationFrame(tick);
  counterElement.innerText = counter.toFixed(2).toString();
  statusElement.innerText = `${minePower.toFixed(2).toString()} rocks/sec`;
}

let lastTime = performance.now();
let interval = 1000;
let minePower = 0;

function autoClick() {
  const currentTime = performance.now();
  const elapsedTime = currentTime - lastTime;

  if (elapsedTime >= interval) {
    counter += minePower;
    lastTime = currentTime - (elapsedTime % interval);
  }
}

function click() {
  counter += 1;
}

requestAnimationFrame(tick);

console.log("my internet is no longer dead lets goooo");
