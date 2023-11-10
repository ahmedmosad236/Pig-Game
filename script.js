'use strict';
// selecting elements
const score0EL = document.querySelector('#score--0');
const score1EL = document.querySelector('#score--1');
const diceEL = document.querySelector('.dice');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// starting state
score0EL.textContent = 0;
score1EL.textContent = 0;
diceEL.classList.add('hidden');
let score, currentScore, activePlayer, playing;

const intil = function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  current0El.textContent = 0;
  current1El.textContent = 0;
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  diceEL.classList.add('hidden');
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
};
intil();
const switchplayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
};

// Roling the dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generation number
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    // show the dice
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;

    // if 1 or not
    if (dice !== 1) {
      // add dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Active the player
      switchplayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      score[activePlayer];

    if (score[activePlayer] >= 20) {
      playing = false;
      diceEL.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchplayer();
    }
  }
});

btnNew.addEventListener('click', intil);
