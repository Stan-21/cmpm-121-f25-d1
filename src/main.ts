import "./style.css";

document.body.innerHTML = `
  <h1> CMPM 121 Project </h1>
  <p> Rocks Collected: <span id="counter"> 0 </span></p>
  <p> Mining Rate: <span id="status"> 0 rocks/sec </span></p>
  <button id = "rock"> 🪨 </button>
  <button id = "button"> ⛏️⛏️ </button>
  <p>
    <div class = "tooltip">
      <button id = "pickUpgrade" class = "upgrade"> Auto Pick (10 rocks) (x0) </button>
      <span class = "tooltiptext"> An auto pick! +0.1 rocks per second </span>
    </div>
    <div class = "tooltip">
      <button id = "drillUpgrade" class = "upgrade"> Driller (100 rocks) (x0) </button>
      <span class = "tooltiptext"> Drill goes burr. +2 rocks per second </span>
    </div>
    <div class = "tooltip">
      <button id = "bombUpgrade" class = "upgrade"> Bomber (1000 rocks) (x0) </button>
      <span class = "tooltiptext"> Small boom.  + 50 rocks per second </span>
    </div>
    <div class = "tooltip">
      <button id = "bigUpgrade" class = "upgrade"> Bigger Bomber (5000 rocks) (x0) </button>
      <span class = "tooltiptext"> Bigger boom.  + 400 rocks per second </span>
    </div>
  </p>
`;

interface Upgrade {
  name: string;
  description: string;
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
const biggerUpgrade = document.getElementById("bigUpgrade")!;

const availableItems: Upgrade[] = [
  {
    name: "Auto Pick",
    description: "An auto pick!  Slow, but does the trick!",
    cost: 10,
    rate: 0.1,
    count: 0,
    element: pickUpgrade,
  },
  {
    name: "Driller",
    description: "Drill goes burrr",
    cost: 100,
    rate: 2,
    count: 0,
    element: drillUpgrade,
  },
  {
    name: "Bomber",
    description: "Small boom",
    cost: 1000,
    rate: 50,
    count: 0,
    element: bombUpgrade,
  },
  {
    name: "Bigger Bomber",
    description: "Bigger boom",
    cost: 5000,
    rate: 400,
    count: 0,
    element: biggerUpgrade,
  },
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

let counter = 9999; // current money / score
let finalUpgradeFlag = false;

buttonElement.addEventListener("click", () => {
  click();
});

let yesButton: HTMLButtonElement;
let noButton: HTMLButtonElement;

function tick() {
  for (const i of availableItems) {
    if (counter >= i.cost) {
      (i.element as HTMLButtonElement).disabled = false;
    } else {
      (i.element as HTMLButtonElement).disabled = true;
    }
  }

  if (counter >= 10000 && !finalUpgradeFlag) {
    finalUpgradeFlag = true;
    const newText = document.createElement("div");
    newText.textContent =
      "A new possible upgrade appears...  It's an even bigger bomb.  Buy it (10000 rocks)?  ";
    document.body.append(newText);

    yesButton = document.createElement("button");
    yesButton.addEventListener("click", () => {
      counter -= 10000;
      document.body.innerHTML =
        "BOOM!  The mine blows up.  Nothing else can be mined";
    });
    yesButton.textContent = " yes ";
    newText.append(yesButton);
    noButton = document.createElement("button");
    noButton.addEventListener("click", () => {
      newText.innerHTML = "";
      newText.innerHTML =
        "The bomb fades away and is never seen again.  The idea of what could've been lingers in your head...";
    });
    noButton.textContent = " no ";
    newText.append(noButton);
  }

  if (finalUpgradeFlag && counter < 10000) {
    yesButton.disabled = true;
    noButton.disabled = true;
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
