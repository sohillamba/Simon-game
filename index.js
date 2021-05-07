let level = 0;
let flashed = 0;
let gameSeq = [];
let userSeq = [];
let isOn = false;
let isGood = false;
let isCompTurn = false;
let isHard = false;
let isWin = false;
let isNoice = true;
let id;
let maxLevel = 20;

const topLeft = document.querySelector("#topLeft");
const topRight = document.querySelector("#topRight");
const bottomLeft = document.querySelector("#bottomLeft");
const bottomRight = document.querySelector("#bottomRight");
const start = document.querySelector("#start");
const score = document.querySelector("#score");
const power = document.querySelector("#on-off");
const hard = document.querySelector("#hard");

const audio1 = document.querySelector("#clip1");
const audio2 = document.querySelector("#clip2");
const audio3 = document.querySelector("#clip3");
const audio4 = document.querySelector("#clip4");


function clearAllColor() {
  topLeft.style.backgroundColor = "darkgreen";
  topRight.style.backgroundColor = "darkred";
  bottomLeft.style.backgroundColor = "goldenrod";
  bottomRight.style.backgroundColor = "darkblue";
}

function flashAllColor() {
  topLeft.style.backgroundColor = "lightgreen";
  topRight.style.backgroundColor = "tomato";
  bottomLeft.style.backgroundColor = "yellow";
  bottomRight.style.backgroundColor = "lightskyblue";
}




function topLeftPressed() {
  if (isNoice) {
    audio1.play();
  }
  isNoice = true;
  topLeft.style.backgroundColor = "lightgreen";
}

function topRightPressed() {
  if (isNoice) {
    audio2.play();
  }
  isNoice = true;
  topRight.style.backgroundColor = "tomato";
}

function bottomLeftPressed() {
  if (isNoice) {
    audio3.play();
  }
  isNoice = true;
  bottomLeft.style.backgroundColor = "yellow";
}

function bottomRightPressed() {
  if (isNoice) {
    audio4.play();
  }
  isNoice = true;
  bottomRight.style.backgroundColor = "lightskyblue";
}





// event listeners

power.addEventListener("click", () => {
  if (power.checked) {
    isOn = true;
    score.innerHTML = "-";
  }
  else {
    isOn = false;
    score.innerHTML = "";
    clearAllColor();
    clearInterval(id);
  }
});

start.addEventListener("click", () => {
  if (isOn || isWin) {
    playFromStart();
  }
});

hard.addEventListener("click", () => {
  if (hard.checked) {
    isHard = true;
  }
  else {
    isHard = false;
  }
});




topLeft.addEventListener("click", () => {
  if (isOn && !isCompTurn) {
    userSeq.push(1);
    check();
    topLeftPressed();
    if (!isWin) {
      setTimeout(() => {
        clearAllColor();
      }, 300);
    }
  }
});

topRight.addEventListener("click", () => {
  if (isOn && !isCompTurn) {
    userSeq.push(2);
    check();
    topRightPressed();
    if (!isWin) {
      setTimeout(() => {
        clearAllColor();
      }, 300);
    }
  }
});

bottomLeft.addEventListener("click", () => {
  if (isOn && !isCompTurn) {
    userSeq.push(3);
    check();
    bottomLeftPressed();
    if (!isWin) {
      setTimeout(() => {
        clearAllColor();
      }, 300);
    }
  }
});

bottomRight.addEventListener("click", () => {
  if (isOn && !isCompTurn) {
    userSeq.push(4);
    check();
    bottomRightPressed();
    if (!isWin) {
        setTimeout(() => {
        clearAllColor();
      }, 300);
    }
  }
});





function playFromStart() {
  level = 1;
  flashed = 0;
  gameSeq = [];
  userSeq = [];
  isGood = true;
  isWin = false;
  score.innerHTML = 0;
  for (let i = 0; i < maxLevel; i++) {
    gameSeq.push(Math.floor(Math.random() * 4) + 1);
  }
  isCompTurn = true;
  id = setInterval(compTurn, 800);
}

function compTurn() {
  isOn = false;
  if (flashed == level) {
    clearInterval(id);
    isCompTurn = false;
    clearAllColor();
    isOn = true;
  }
  if (isCompTurn) {
    clearAllColor();
    setTimeout (() => {
      if (gameSeq[flashed] == 1) topLeftPressed();
      if (gameSeq[flashed] == 2) topRightPressed();
      if (gameSeq[flashed] == 3) bottomLeftPressed();
      if (gameSeq[flashed] == 4) bottomRightPressed();
      flashed++;
    }, 200);
  }
}





function check() {
  if (userSeq[userSeq.length - 1] !== gameSeq[userSeq.length - 1]) {
    isGood = false;
  }

  if (userSeq.length == maxLevel && isGood) {
    winGame();
  }

  if (!isGood) {
    flashAllColor();
    score.innerHTML = "NO!";
    setTimeout(() => {
      score.innerHTML = level - 1;
      clearAllColor();

      if (isHard) {
        playFromStart();
      } else {
        isCompTurn = true;
        flashed = 0;
        userSeq = [];
        isGood = true;
        id = setInterval(compTurn, 800);
      }
    }, 800);

    isNoice = false;
  }

  if (flashed == userSeq.length && isGood && !isWin) {
    level++;
    userSeq = [];
    isCompTurn = true;
    flashed = 0;
    score.innerHTML = level - 1;
    id = setInterval(compTurn, 800);
  }

}

function winGame() {
  flashAllColor();
  score.innerHTML = "WIN!";
  isOn = false;
  isWin = true;
}









//
