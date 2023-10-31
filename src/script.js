"use strict";

// Selecting Elements
const dice = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const current0 = document.querySelector("#current--0");
const current1 = document.querySelector("#current--1");

let scores, currentScore, activePlayer, isPlaying, score;

const init = function () {
  dice.classList.add("hidden");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;
  score = document
    .querySelectorAll(".score")
    .forEach((score) => (score.textContent = "0"));
  document
    .querySelectorAll(".current-score")
    .forEach((score) => (score.textContent = "0"));
};
init();

// Working further with the elements

const playerToggle = function () {
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
};

btnRoll.addEventListener("click", function () {
  if (isPlaying) {
    dice.classList.remove("hidden");
    const diceNumber = Math.floor(Math.random() * 6) + 1;
    dice.setAttribute("src", `dice-${diceNumber}.png`);
    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      playerToggle();
    }
  }
});
btnHold.addEventListener("click", function () {
  if (isPlaying) {
    const activePlayerScore = document.getElementById(`score--${activePlayer}`);
    activePlayerScore.textContent = `${(scores[activePlayer] += currentScore)}`;
    if (scores[activePlayer] >= 100) {
      isPlaying = false;
      dice.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      currentScore = currentScore;
    } else {
      playerToggle();
    }
  }
});
btnNew.addEventListener("click", init);
