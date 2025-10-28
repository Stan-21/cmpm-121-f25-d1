import "./style.css";

document.body.innerHTML = `
  <h1> CMPM 121 Project </h1>
  <p> Rocks Collected: <span id="counter"> 0 </span></p>
  <p> Mining Rate: <span id="status"> 0 rocks/sec </span></p>
  <button id = "rock"> 🪨 </button>
  <button id = "button"> ⛏️⛏️ </button>
  <p id = "upgradeList">
  </p>
`;

interface Upgrade {
  name: string;
  description: string;
  cost: number;
  rate: number;
  count: number;
  element: HTMLButtonElement | null;
}

const counterEl = document.getElementById("counter")!;
const statusEl = document.getElementById("status")!;
const buttonEl = document.getElementById("button")!;

const upgradeEl = document.getElementById("upgradeList")!;

const availableItems: Upgrade[] = [
  {
    name: "Auto Pick",
    description:
      "An auto pick!  Slow, but does the trick! +0.1 rocks per second",
    cost: 10,
    rate: 0.1,
    count: 0,
    element: null,
  },
  {
    name: "Driller",
    description: "Drill goes burrrrrr... +2 rocks per second",
    cost: 100,
    rate: 2,
    count: 0,
    element: null,
  },
  {
    name: "Bomber",
    description: "Small boom! +50 rocks per second",
    cost: 1000,
    rate: 50,
    count: 0,
    element: null,
  },
  {
    name: "Bigger Bomber",
    description: "Bigger boom!! +400 rocks per second",
    cost: 5000,
    rate: 400,
    count: 0,
    element: null,
  },
  {
    name: "Nuclear Bomber",
    description:
      "This doesn't seem safe...  For maniacs who want to see big numbers.  +1000 rocks per second",
    cost: 10000,
    rate: 1000,
    count: 0,
    element: null,
  },
];

availableItems.forEach((item) => {
  const toolTip = document.createElement("div");
  toolTip.className = "tooltip";
  upgradeEl.append(toolTip);

  const upgrade = document.createElement("button");
  upgrade.className = "upgrade";
  upgrade.innerText = `${item.name} (${item.cost} rocks) (x${item.count})`;
  toolTip.append(upgrade);

  const upgradeDescription = document.createElement("span");
  upgradeDescription.className = "tooltiptext";
  upgradeDescription.innerText = item.description;
  toolTip.append(upgradeDescription);

  item.element = upgrade;
  item.element.addEventListener("click", () => {
    item.count += 1;
    counter -= item.cost;
    item.cost = Math.round(item.cost * 1.15); // Calculate new cost
    if (item.element) {
      item.element.innerText =
        `${item.name} (${item.cost} rocks) (x${item.count})`;
      minePower += item.rate;
    }
  });
});

let counter = 0; // current money / score
let finalUpgradeFlag = false;

buttonEl.addEventListener("click", () => {
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

  if (counter >= 50000 && !finalUpgradeFlag) {
    finalUpgradeFlag = true;
    const newText = document.createElement("div");
    newText.textContent =
      "A new possible upgrade appears...  It's an even bigger bomb.  Buy it (50000 rocks)?  ";
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
  counterEl.innerText = counter.toFixed(2).toString();
  statusEl.innerText = `${minePower.toFixed(2).toString()} rocks/sec`;
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
