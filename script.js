"use strict";
const score0 = document.getElementById("score--0");
const score1 = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

score0.textContent = 0;
score1.textContent = 0;
diceEl.classList.add("hidden");

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let game = true;

const playerSwitch = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--active");
  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--active");
};

btnRoll.addEventListener("click", function () {
  if (game === true) {
    const dice = Math.round(Math.random() * 5) + 1;
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      playerSwitch();
    }
  }
});
btnHold.addEventListener("click", function () {
  if (game) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //
    if (scores[activePlayer] >= 100) {
      game = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      diceEl.classList.add("hidden");
    }

    playerSwitch();
  }
});
btnNew.addEventListener("click", function () {
  if (scores[0] >= 100) {
    document.querySelector(`.player--${0}`).classList.remove("player--winner");
  } else {
    document.querySelector(`.player--${1}`).classList.remove("player--winner");
  }
  scores[0] = 0;
  scores[1] = 0;
  activePlayer = activePlayer === 1 ? 0 : 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--active");
  score0.textContent = 0;
  score1.textContent = 0;
  game = true;
});
