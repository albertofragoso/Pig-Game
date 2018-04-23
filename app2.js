/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, roundScore, activePlayer, gamePlaying, six;
//var score = prompt('How many points?');

init();

document.querySelector('.btn-roll').addEventListener('click', function() {

  if(gamePlaying) {

    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
    console.log('Dice one: ' + dice1);
    console.log('Dice two: ' + dice2);
    var dice1DOM = document.querySelector('#dice-1');
    dice1DOM.style.display = 'block';
    dice1DOM.src = 'dice-' + dice1 + '.png';

    var dice2DOM = document.querySelector('#dice-2');
    dice2DOM.style.display = 'block';
    dice2DOM.src = 'dice-' + dice2 + '.png';

    // 2.- Display result.
    if (dice1 !== 1 && dice2 !==1) {
      roundScore += dice1 + dice2;
      document.getElementById('current-' + activePlayer).textContent = roundScore;
      // Add score
      if (dice1 === 6 || dice2 === 6) {
        six++;
        console.log('Six: ' + six);
        if (six === 2) {
          scores[activePlayer]  = 0;
          document.getElementById('score-' + activePlayer).textContent = 0;
          nextPlayer();
        }
      }
      /*1.- A player looses his ENTIRES score when he rolls six in a row. after that, it's the next player's turn.*/
    }
    else {
      nextPlayer();
      //Next player
    }
    // 3.- Update round score IF the rolled number was NOT a 1.
  }
  // 1.- Random number.
});
//Callback

document.querySelector('.btn-hold').addEventListener('click', function() {

  if (gamePlaying) {
    scores[activePlayer] += roundScore;
    // 1.- Add CURRENT to GLOBAL score.

    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
    // 2.- Update UI.

    var input = document.querySelector('.final-score').value;
    var winningScore;

    // Undefined, 0, null, "" are COERCED to false.
    // Anything else is COERCED to true.
    if(input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }
    /*2.- Add an input field to the HTML where players can set the winning score, so they can change the definided predefinided score to 100.*/
    if (scores[activePlayer] >= winningScore) {
      document.getElementById('name-' + activePlayer).textContent = 'Winner!';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      document.getElementById('dice-1').style.display = 'none';
      document.getElementById('dice-2').style.display = 'none';
      gamePlaying = false;
    } else {
      nextPlayer();
    }
    // 3.- Check if player won the game.
  }

})
//Callback


function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  six = 0;
  roundScore = 0;
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  //document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
  //document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');

  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click' , function() {
  init();
})

function init() {
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  six = 0;

  document.getElementById('score-0').textContent = 0;
  document.getElementById('score-1').textContent = 0;
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;

  document.querySelector('#dice-1').style.display = 'none';
  document.querySelector('#dice-2').style.display = 'none';

  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}

//////////////////////////////////
// Set value
/*document.querySelector('#current-' + activePlayer).textContent = dice;
document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';*/

//////////////////////////////////
// Get value
/*var score = document.querySelector('#score-' + activePlayer).textContent;
console.log(score);*/

//////////////////////////////////
// Change CSS
/*document.querySelector('.dice').style.display = 'none';*/


//////////////////////////////////
// Challenges
/*Change the game to follow his rules:

3.- Add another dice to the game, so that there are two dice now. The player looses his current score when one of them is one. (Hint: You will need CSS to position the second dice, so take a look at the CSS code for the first one).

*/
