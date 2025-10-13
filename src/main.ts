import "./style.css";

document.body.innerHTML = `
  <h1> CMPM 121 Project </h1>
  <p> Rocks Collected: <span id="counter"> 0 </span></p>
  <p> Mining Rate: <span id="status"> 0 rocks/sec </span></p>
  <button id = "rock"> 🪨 </button>
  <button id = "button"> ⛏️⛏️ </button>
  <p>
    <button id = "pickUpgrade" class = "upgrade"> Auto Pick (10 rocks) (x0) </button>
    <button id = "drillUpgrade" class = "upgrade"> Driller (100 rocks) (x0) </button>
    <button id = "bombUpgrade" class = "upgrade"> Bomber (1000 rocks) (x0) </button>
  </p>
`;

interface Upgrade {
  name: string;
  cost: number;
  rate: number;
  count: number;
  element: HTMLButtonElement | HTMLElement;
}

const counterElement = document.getElementById("counter")!;
const statusElement = document.getElementById("status")!;
const buttonElement = document.getElementById("button")!;

const pickUpgrade = document.getElementById("pickUpgrade")!;
const drillUpgrade = document.getElementById("drillUpgrade")!;
const bombUpgrade = document.getElementById("bombUpgrade")!;

const availableItems: Upgrade[] = [
  { name: "Auto Pick", cost: 10, rate: 0.1, count: 0, element: pickUpgrade },
  { name: "Driller", cost: 100, rate: 2, count: 0, element: drillUpgrade },
  { name: "Bomber", cost: 1000, rate: 50, count: 0, element: bombUpgrade },
];

availableItems.forEach((item) => {
  item.element.addEventListener("click", () => {
    item.count += 1;
    counter -= item.cost;
    item.cost = Math.round(item.cost * 1.15); // Calculate new cost
    item.element.innerText =
      `${item.name} (${item.cost} rocks) (x${item.count})`;
    minePower += item.rate;
  });
});

let counter = 0;

buttonElement.addEventListener("click", () => {
  click();
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
