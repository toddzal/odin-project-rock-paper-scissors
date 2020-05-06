function playRound(computerSelection, playerSelection) {
let comp = computerSelection.toLowerCase();
let play = playerSelection.toLowerCase();
console.log("You guessed " + play);
console.log("The computer guessed " + comp);
let resultArray = [
[
"rock",
{
paper: [-1, "Sorry man. Better luck next time...paper beats rock"],
scissors: [1, "You won...lucky guess!...rock beats scissors"]
}
],
[
"paper",
{
scissors: [
-1,
"Sorry man. Better luck next time...scissors beats papaer"
],
rock: [1, "You won...lucky guess!...paper beats rock"]
}
],
[
"scissors",
{
rock: [-1, "Sorry man. Better luck next time...rock beats scissors"],
paper: [1, "You won...lucky guess!...scissors beats papaer"]
}
]
];

let spellCheck = 0;
for (let i = 0; i < resultArray.length; i++) {
if (resultArray[i][0] === play) {
spellCheck += 1;
}
}

if (spellCheck === 0) {
return "Something went wrong. Please check your spelling. Remember you can only guess rock, paper or scissors.";
} else if (comp === play) {
return [0, "What? Tie game! Play again."];
} else {
for (let i = 0; i < resultArray.length; i++) {
for (const property in resultArray[i][1]) {
if (resultArray[i][0] === play && property === comp) {
return resultArray[i][1][property];
}
}
}
}
}
function game() {
let score = 0;
let playerScore = 0;
let compScore = 0;
for (let i = 0; i < 5; i++) {
let result = playRound(
computerPlay(),
prompt("Enter rock, paper or scissors")
);
if (result[0] === 1) {
playerScore += 1;
} else if (result[0] === -1) {
compScore += 1;
}
console.log(result[1]);
console.log(
"Player: " + playerScore + " games vs Computer: " + compScore + " games"
);
}
if (score > 1) {
console.log("Congrats! You won the game!");
} else if (score === 0) {
console.log("Tie Game!");
} else {
console.log("Sorry, you lost the game. Better luck next time.");
}
}
