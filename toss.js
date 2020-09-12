/**
 * This is an excerpt Copied from a code at CodePen
 * Not edite yet...
 */

// Dice Roll

var winCount        = 0;
var lossCount       = 0;
var gameCount       = 0;
var thePoint        = 0;

// var cash         = 100;
// var betInput     = document.getElementById('betField').value;
// var bet          = parseInt(betInput);

var elDiceOne       = document.getElementById('dice1');
var elDiceTwo       = document.getElementById('dice2');
var elComeOut       = document.getElementById('comeOutButton');
var elPointRoll     = document.getElementById('pointRollButton');
var elWinOrLoss     = document.getElementById('winOrLoss');
var elCrapsWins     = document.getElementById('crapWins');
var elCrapsLosses   = document.getElementById('crapLosses');

elComeOut.onclick   = function () {comeOutRoll();};

elPointRoll.onclick = function () {pointRoll();};

// Come Out Roll Function
function comeOutRoll() {

  // Initial dice variables
  var diceOne   = Math.floor((Math.random() * 6) + 1);
  var diceTwo   = Math.floor((Math.random() * 6) + 1);
  var rollTotal = diceOne + diceTwo;

  console.log(rollTotal + ' ' + diceOne + ' ' + diceTwo);
  elDiceOne.classList.toggle('animate');
  elDiceTwo.classList.toggle('animate');

  //Dice reset and display
  for (var i = 1; i <= 6; i++) {
    elDiceOne.classList.remove('show-' + i);
    if (diceOne === i) {
      elDiceOne.classList.add('show-' + i);
    }
  }

  for (var k = 1; k <= 6; k++) {
    elDiceTwo.classList.remove('show-' + k);
    if (diceTwo === k) {
      elDiceTwo.classList.add('show-' + k);
    }
  }


}// END Come out roll function

//POINT ROLL FUNCTION
function pointRoll() {

  // sets dice variables
  var diceOne   = Math.floor((Math.random() * 6) + 1);
  var diceTwo   = Math.floor((Math.random() * 6) + 1);
  var rollTotal = diceOne + diceTwo;

  //Dice reset and display

  for (var i = 1; i <= 6; i++) {
    elDiceOne.classList.remove('show-' + i);
    if (diceOne === i) {
      elDiceOne.classList.add('show-' + i);
    }
  }

  for (var k = 1; k <= 6; k++) {
    elDiceTwo.classList.remove('show-' + k);
    if (diceTwo === k) {
      elDiceTwo.classList.add('show-' + k);
    }
  }

  // if player rolls a 7, player loses
  if (rollTotal === 7) {
    console.log('LOSER');
    thePoint = 0;
    lossCount++;
    gameCount++;
    elWinOrLoss.innerHTML = 'Loser!';

    // cash -= betField;
    elComeOut.style.display = 'block';
    elPointRoll.style.display = 'none';

  } else if (rollTotal === thePoint) {
    // If player rolls the point; player wins

    console.log('you won!');
    winCount++; // updates win count
    gameCount++;
    elWinOrLoss.innerHTML = 'You Won!';

    // cash += betField;
    thePoint = 0;// resests the point

    // Resets buttons
    elComeOut.style.display   = 'block';
    elPointRoll.style.display = 'none';

  } else {
    // Roll again if no winner

    console.log('roll again');
  }
} // END POINT ROLL FUNCTION

