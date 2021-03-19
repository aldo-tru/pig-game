'use strict';

// Selecting our score elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const header = document.querySelector('.header');

let scores, currentScore, activePlayer, playing;

const switchPlayer = () => {
    // Selecting the current player dynamically using template literals
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    // Reset current score to 0
    currentScore = 0;
    // Switch to next player
    activePlayer = activePlayer === 0 ? 1 : 0;
    // Add active player class to the current player
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

// Game initalization/resets values and settings
const init = () => {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;

    // State variable
    playing = true; 
    
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    
    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    btnRoll.classList.remove('disabled');
    btnHold.classList.remove('disabled');
    header.classList.add('show');
};
init();

// Roll dice number functionality
btnRoll.addEventListener('click', function() {
    if (playing) {
        // Hide header
        header.classList.remove('show');
        header.classList.add('hidden');
        // 1. Generate a random dice roll between 1 and 6
        const dice = Math.trunc(Math.random() * 6) + 1;
        // 2. Display dice
        diceEl.classList.add('show');
        // Displaying dynamically the dice number according its img name
        diceEl.src = `./img/dice-${dice}.png`;
        // 3. Check for rolled 1, if true, switch to next player
        if (dice !== 1) {
            // Add dice to current score
            currentScore += dice;
            // Selecting the player dynamically using template literals
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
});

// Hold dice number functionality
btnHold.addEventListener('click', function() {
    if (playing) {
        // Math for adding current score to total score (working with our scores array)
        scores[activePlayer] += currentScore;
        // 1. Add current score to active player dynamically
        document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];
        // 2. Check if player's score is greater or equal to 30
        if (scores[activePlayer] >= 30) {
            playing = false;
            diceEl.classList.remove('show');
            btnRoll.classList.add('disabled');
            btnHold.classList.add('disabled');
            // If it is, player wins
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        } else {
            // 3. If not, switch player
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', init);