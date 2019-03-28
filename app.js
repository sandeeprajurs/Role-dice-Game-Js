/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

init();

var scores, roundScore, activePlayer, dice, gamePlaying, prevScore, scoreToWin;

var x = document.querySelector('#score-0').textContent;
console.log(x);

document.querySelector('.dice1').style.display = 'none';
document.querySelector('.dice2').style.display = 'none';

document.querySelector('.btn-roll').addEventListener('click', function(){       //JUST SPECIFY FUNCTION NAME RATHER THAN WRITING FUNCTION HERE

	scoreToWin = winScore();
	// 1. Random number
	if(gamePlaying){
		var dice1 = Math.floor(Math.random() * 6) + 1;
		var dice2 = Math.floor(Math.random() * 6) + 1;

		if(prevScore === 6){
			if(dice1 === 6 || dice2 === 6){
				scores[activePlayer] = 0;
				document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
				nextPlayer();
			}
		}
		if(dice1 === 6 || dice2 === 6){
			prevScore = 6;
		}

		if(dice1 === 1 || dice2 === 1){
			scores[activePlayer] = 0;
			document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
		}
		

		// 2. Display the result
		var diceDOM1 = document.querySelector('.dice1');
		var diceDOM2 = document.querySelector('.dice2');
		diceDOM1.style.display = 'block';
		diceDOM2.style.display = 'block';
		diceDOM1.src = 'dice-' + dice1 + '.png';
		diceDOM2.src = 'dice-' + dice2 + '.png';

		// 3. Update the round score if the rolled number was not 1
		if(dice1 > 1 && dice2 > 1){   					//if(dice !== 1){   !== no type conversion
			//Add score
			roundScore +=dice1 + dice2;              //!=  does type conversion
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		}else{
			nextPlayer();
		}
	}
});

document.querySelector('.btn-hold').addEventListener('click', function(){
	scoreToWin = winScore();
	// Add current score to global score
	if(gamePlaying){
		scores[activePlayer] += roundScore;

		//Update the UI
		document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
		

		//Check if player won the game
		if(scores[activePlayer] >= scoreToWin){
			document.getElementById('name-'+activePlayer).textContent = 'Winner!'; 
			document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
			document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
			document.querySelector('.dice1').style.display = 'none';
			document.querySelector('.dice2').style.display = 'none';
			gamePlaying = false;
		}else{
			nextPlayer();
		}
	}

});

function winScore(){
	var winningScore = document.getElementById('winning-score').value; 
	console.log(winningScore);
	if(winningScore) {       //if no input winscore will be "" >> blank string
		return winningScore;
	}
	else{
		return 100;
	}
}


function nextPlayer(){
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;  //Ternary operator(used instead of if else)
	roundScore = 0;
	prevScore = 0;

	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	document.querySelector('.player-0-panel').classList.toggle('active');  //toggle--if active present it removes it, if active not present it adds active
	document.querySelector('.player-1-panel').classList.toggle('active');
	// document.querySelector('.player-0-panel').classList.remove('active');
	// document.querySelector('.player-1-panel').classList.add('active');
}


document.querySelector('.btn-new').addEventListener('click', init);

function init(){
	scores = [0,0];
	roundScore = 0;
	activePlayer = 0;
	gamePlaying = true;
	prevScore = 0;

	// document.querySelector('#current-' + activePlayer).innerHTML = '<em>'+dice+'</em>';

	document.getElementById('score-0').textContent = 0;          //faster than querySelector METHOD
	document.getElementById('score-1').textContent = 0;
	document.getElementById('current-0').textContent = 0;
	document.getElementById('current-1').textContent = 0;
	document.getElementById('name-0').textContent = 'Player1';
	document.getElementById('name-1').textContent = 'Player2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.add('active');
}