import "./style.css";

document.body.innerHTML = `
  <h1> CMPM 121 Project </h1>
  <p> Rocks Collected: <span id="counter"> 0 </span></p>
  <p> Mining Rate: <span id="status"> 0 rocks/sec </span></p>
  <button id = "rock"> 🪨 </button>
  <button id = "button"> ⛏️⛏️ </button>
  <p>
    <button id = "pickUpgrade"> Auto Pick (10 rocks) (x0) </button>
    <button id = "drillUpgrade"> Driller (100 rocks) (x0) </button>
    <button id = "bombUpgrade"> Bomber (1000 rocks) (x0) </button>
  </p>
`;

interface Upgrade {
  name: string;
  cost: number;
  rate: number;
  element: HTMLButtonElement | HTMLElement;
}

const counterElement = document.getElementById("counter")!;
const statusElement = document.getElementById("status")!;
const buttonElement = document.getElementById("button")!;

const pickUpgrade = document.getElementById("pickUpgrade")!;
const drillUpgrade = document.getElementById("drillUpgrade")!;
const bombUpgrade = document.getElementById("bombUpgrade")!;

const availableItems: Upgrade[] = [
  { name: "pick", cost: 10, rate: 0.1, element: pickUpgrade },
  { name: "drill", cost: 100, rate: 2, element: drillUpgrade },
  { name: "bomb", cost: 1000, rate: 50, element: bombUpgrade },
];

let counter = 0;
let autoMineCount = 0;
let drillerCount = 0;
let bomberCount = 0;

buttonElement.addEventListener("click", () => {
  click();
});

pickUpgrade.addEventListener("click", () => {
  autoMineCount += 1;
  availableItems[0].cost = Math.round(availableItems[0].cost * 1.15);
  pickUpgrade.innerText = `Auto Pick (${
    availableItems[0].cost
  } rocks) (x${autoMineCount})`;
  counter -= 10;
  minePower += 0.1;
});

drillUpgrade.addEventListener("click", () => {
  drillerCount += 1;
  availableItems[1].cost = Math.round(availableItems[1].cost * 1.15);
  drillUpgrade.innerText = `Driller (${
    availableItems[1].cost
  } rocks) (x${drillerCount})`;
  counter -= 100;
  minePower += 2;
});

bombUpgrade.addEventListener("click", () => {
  bomberCount += 1;
  availableItems[2].cost = Math.round(availableItems[2].cost * 1.15);
  bombUpgrade.innerText = `Bomber (${
    availableItems[2].cost
  } rocks) (x${bomberCount})`;
  counter -= 1000;
  minePower += 50;
});

function tick() {
  for (const i of availableItems) {
    if (counter >= i.cost) {
      (i.element as HTMLButtonElement).disabled = false;
    } else {
      (i.element as HTMLButtonElement).disabled = true;
    }
  }
  autoClick();
  requestAnimationFrame(tick);
  counterElement.innerText = counter.toFixed(2).toString();
  statusElement.innerText = `${minePower.toFixed(2).toString()} rocks/sec`;
}

let lastTime = performance.now();
const interval = 1000;
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
