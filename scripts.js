const starterButton = document.querySelector("#play-button");
const rockButton = document.querySelector("#rock-button");
const paperButton = document.querySelector("#paper-button");
const scissorsButton = document.querySelector("#scissors-button");
let playerPlay = "";
let playerScore = 0;
let computerScore = 0;
let round = 1;
const delayTime = 2000;
let results = [];
let resultArray = [
  [
    "rock",
    {
      paper: [-1, "Paper beats rock"],
      scissors: [1, "Rock beats scissors"]
    }
  ],
  [
    "paper",
    {
      scissors: [-1, "Scissors beats paper"],
      rock: [1, "Paper beats rock"]
    }
  ],
  [
    "scissors",
    {
      rock: [-1, "Rock beats scissors"],
      paper: [1, "Scissors beats papaer"]
    }
  ]
];

starterButton.addEventListener("click", toggleStarter);
rockButton.addEventListener("click", getPlayerPlay);
paperButton.addEventListener("click", getPlayerPlay);
scissorsButton.addEventListener("click", getPlayerPlay);

function toggleStarter() {
  const starter = document.querySelector(".starter-wrapper");
  const play = document.querySelector(".play-wrapper");
  starter.setAttribute("id", "invisible");
  play.setAttribute("id", "visible");
  roundTitle(round, "Make your selection");
}

function computerPlay() {
  let rps = ["rock", "paper", "scissors"];
  let computerDraw = Math.random();
  if (computerDraw < 0.34) {
    return rps[0];
  } else if (computerDraw < 0.67) {
    return rps[1];
  } else {
    return rps[2];
  }
}

function getPlayerPlay(e) {
  switch (e.target.id) {
    case "rock-button":
      playerPlay = "rock";
      break;
    case "scissors-button":
      playerPlay = "scissors";
      break;
    case "paper-button":
      playerPlay = "paper";
      break;
    default:
      break;
  }
  scoreRound(playerPlay);
  //check for end
}

function scoreRound(play) {
  const items = document.querySelector(".items-wrapper");
  const newDiv = document.createElement("div");
  const newPlay = document.createElement("div");
  const newComp = document.createElement("div");
  newDiv.classList.add("item-round");
  newPlay.classList.add("player-item");
  newComp.classList.add("computer-item");
  let comp = computerPlay();
  if (comp === play) {
    roundTitle(round, `Tie: ${play} = ${comp} `);
    round += 1;
    setTimeout(function() {
      roundTitle(round, "Make your selection");
    }, delayTime);
  } else {
    for (let i = 0; i < resultArray.length; i++) {
      for (const property in resultArray[i][1]) {
        if (resultArray[i][0] === play && property === comp) {
          if (resultArray[i][1][property][0] === 1) {
            incrementPlayer();
            roundTitle(round, `${resultArray[i][1][property][1]}. You win!`);
            round += 1;
            setTimeout(function() {
              roundTitle(round, "Make your selection");
            }, delayTime);
          } else {
            incrementComputer();
            roundTitle(round, `${resultArray[i][1][property][1]}. You lose!`);
            round += 1;
            setTimeout(function() {
              roundTitle(round, "Make your selection");
            }, delayTime);
          }
        }
      }
    }
  }
  results.push([round, play, comp]);
  newDiv.textContent = round - 1;
  newPlay.textContent = play;
  newComp.textContent = comp;

  items.appendChild(newDiv);
  items.appendChild(newPlay);
  items.appendChild(newComp);
  checkScore();
}

function checkScore() {
  console.log(`player: ${playerScore} computer: ${computerScore}`);
  const title = document.querySelector("#intro > h2");
  if (playerScore >= 5) {
    title.textContent = `You win by a score of ${playerScore} to ${computerScore}`;
    setTimeout(function() {
      alert(`You win by a score of ${playerScore} to ${computerScore}`);
    }, delayTime);
    setTimeout(function() {
      window.location.reload();
    }, delayTime);
  } else if (computerScore >= 5) {
    title.textContent = `You lose by a score of ${playerScore} to ${computerScore}`;
    setTimeout(function() {
      alert(`You lose by a score of ${playerScore} to ${computerScore}`);
    }, delayTime);

    setTimeout(function() {
      window.location.reload();
    }, delayTime);
  }
}

function incrementPlayer() {
  const player = document.querySelector("#player-score");
  playerScore += 1;
  player.textContent = playerScore;
}
function incrementComputer() {
  const computer = document.querySelector("#computer-score");
  computerScore += 1;
  computer.textContent = computerScore;
}

function roundTitle(round, message) {
  const title = document.querySelector("#intro > h2");
  const messageOut = document.querySelector(".messageOut");
  title.textContent = `Round: ${round}`;
  messageOut.textContent = message;
}
