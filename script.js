import { Player } from "./JS module/Person.js";
import Api from "./JS module/Api.js";
import { CssAction, TextColor, Spinner } from "./JS module/CssAction.js";
import Errors from "./JS module/Errors.js";

let data;
let player;

document.addEventListener("DOMContentLoaded", function () {
  player = new Player(getUserName());
  setNameToDom(player.name);

  const cost = document.getElementById("cost");
  const max = document.getElementById("max");
  const hyper = document.getElementById("hyper");
  const mglt = document.getElementById("mglt");
  const newGameBtn = document.getElementById("newGame");

  cost.addEventListener("click", () => compare(data.pCost, data.cCost));
  max.addEventListener("click", () => compare(data.pMax, data.cMax));
  hyper.addEventListener("click", () => compare(data.pHyper, data.cHyper));
  mglt.addEventListener("click", () => compare(data.pMGLT, data.cMGLT));
  newGameBtn.addEventListener("click", newGameHandler);
});
const textColor = new TextColor({
  selector: ".sw-title",
  color: "yellow",
});

const compCard = document.getElementById("computer");
const playerCard = document.getElementById("player");
const result = document.getElementById("result");
const allBtn = document.querySelectorAll(".compare");
const countWin = document.querySelector(".countWin");
const countLose = document.querySelector(".countLose");

const api = new Api("https://swapi.dev/api");

function newGameHandler() {
  newGame();
  textColor.colorChange();
}

function getUserName() {
  return prompt("Enter name") || "Unknown User";
}

function setNameToDom(name) {
  const playerName = document.querySelector(".playerName");
  playerName.innerHTML += name;
}

class Data {
  constructor(playShip, compShip) {
    this.playShip = playShip;
    this.compShip = compShip;
  }

  get pCost() {
    return this.getParam(this.playShip.cost_in_credits);
  }
  get cCost() {
    return this.getParam(this.compShip.cost_in_credits);
  }
  get pMax() {
    return this.getParam(this.playShip.max_atmosphering_speed);
  }
  get cMax() {
    return this.getParam(this.compShip.max_atmosphering_speed);
  }
  get pHyper() {
    return this.getParam(this.playShip.hyperdrive_rating);
  }
  get cHyper() {
    return this.getParam(this.compShip.hyperdrive_rating);
  }
  get pMGLT() {
    return this.getParam(this.playShip.MGLT);
  }
  get cMGLT() {
    return this.getParam(this.compShip.MGLT);
  }

  getParam(category) {
    let returnVal;
    if (isNaN(parseInt(category))) {
      returnVal = 0;
    } else {
      returnVal = parseInt(category);
    }
    return returnVal;
  }
}

let playShip, compShip;
const spiner = new Spinner("#result");
const hidden = new CssAction(".hidden");
const errorNetwork = new Errors("Check your network connection");

function compare(p1, c1) {
  hidden.show();
  if (p1 > c1) {
    result.innerHTML = "You WIN this round!";
    player.addWin();
    countWin.innerHTML = `Win = ${player.getWin()}`;
  } else if (p1 < c1) {
    result.innerHTML = `You LOST this round!`;
    player.addLose();
    countLose.innerHTML = `Lost = ${player.getLose()}`;
  } else if (p1 === c1) {
    result.innerHTML = "it is a tie";
  } else {
    result.innerHTML = "something went wrong...";
  }
  allBtn.forEach((item) => item.classList.add("disabled"));
}

async function newGame() {
  hidden.hide();
  allBtn.forEach((item) => item.classList.remove("disabled"));
  result.innerHTML = "";
  spiner.spinnerOn();

  try {
    playShip = await api.getRandomShip();
    compShip = await api.getRandomShip();
    spiner.spinnerOff();
  } catch (error) {
    console.log(errorNetwork);
    result.innerHTML = errorNetwork.message;
    allBtn.forEach((item) => item.classList.add("disabled"));
  }

  playerCard.innerHTML = formatDisplay(playShip);
  compCard.innerHTML = formatDisplay(compShip);

  data = new Data(playShip, compShip);
}

function formatDisplay(name) {
  return `
            <span class='card-title'>${name.name}</span>
            <p>Model:${name.model}</p>
            <p>Cost:${name.cost_in_credits}</p>
            <p>Max Atmos Spd:${name.max_atmosphering_speed}</p>
            <p>Hyperdrive Rtg:${name.hyperdrive_rating}</p>
            <p>MGLT:${name.MGLT}</p>
        `;
}
