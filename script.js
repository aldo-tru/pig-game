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
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;


score0El.textContent = 0;
score1El.textContent = 0;

diceEl.classList.add('hidden');

// Roll dice number functionality
btnRoll.addEventListener('click', function() {
    
    // 1. Generate a random dice roll between 1 and 6
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');

    // Displaying dynamically the dice number according its img name
    diceEl.src = `./img/dice-${dice}.png`;

    
    // 3. Check for rolled 1, if true, switch to next player
    if (dice !== 1) {

        // Add dice to current score
        currentScore += dice;

        // Selecting the player dynamically
        document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
        
    } else {
        
        document.querySelector(`#current--${activePlayer}`).textContent = 0;

        // Reset current score to 0
        currentScore = 0;
        
        // Switch to next player
        activePlayer = activePlayer === 0 ? 1 : 0;

        // Add active player class to the current player
        player0El.classList.toggle('player--active');
        player1El.classList.toggle('player--active');

    }

});