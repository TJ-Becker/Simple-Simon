'use strict'

$(document).ready(function() {
	var solution = [];
	var buttons = $('.buttons');
	var index = 0;
	var dMajor = document.getElementById('d-major');
	var aMajor = document.getElementById('a-major');
	var bMinor = document.getElementById('b-minor');
	var gMajor = document.getElementById('g-major');
	var soundsArray = [dMajor, aMajor, bMinor, gMajor];
	var speedArray = [900, 600, 400, 240, 180];
	var currentScore = 0;
	var highScore = 0;
	var canPlay = false;
	var speed;

	function randomNumber(amount) {
		var random = Math.floor(Math.random() * (amount) + 1);
		return random;
	}

	function lightUp(value) {
		$('[data-value=' + (value) + ']').animate({
			'opacity': '.2'
		}, 100).animate({
			'opacity': '1'
		}, 100);
	}

	function playSound(value) {
		var sound = soundsArray[value - 1];
		if (sound.duration > 0 && !sound.paused) {
        	sound.pause();
            sound.currentTime = 0;
            sound.play();
        } else {
            sound.play();    
        }
	}

	function difficulty() {
		var level = parseInt(document.getElementById("difficulty").value)
		var speed = speedArray[level];
		return speed;
	}

	function simonSequence() {
		solution.forEach(function(element, index) {
			setTimeout(function() {
				lightUp(element);
				playSound(element);
			}, (speed * (index + 2)));
		})
		setTimeout(function() {
			canPlay = true;
		}, (speed * (solution.length + 2)));
	}

	function score(current) {
		$('#current-score').html("Current: " + currentScore);
		if (current > highScore) {
			highScore = current;
			$('#high-score').html("High: " + highScore);
		}
	}

	function newRound() {
		currentScore++;
		solution.push(randomNumber(buttons.length));
		console.log(solution);
		setTimeout(function() {
			simonSequence();
		}, 1000);
		score(currentScore);
	}

	buttons.click(function() {
		if (canPlay) {
			lightUp($(this).data('value'));
			playSound($(this).data('value'));
			if (solution[index] == $(this).data('value')) {
				index++;
				console.log("correct.")
			} else {
				index = 0;
				console.log("failure.")
				currentScore = 0;
				score();
				$('#loss').removeAttr('hidden');
				canPlay = false;
			}

			if ((index) == (solution.length)) {
				canPlay = false;
				console.log("success. resetting.")
				index = 0;
				newRound();
			}
		}
	});

	$('#start').click(function() {
		solution = [];
		index = 0;
		currentScore = 0;
		score();
		var starter = (randomNumber(buttons.length));
		solution.push(starter);
		console.log(solution);
		simonSequence();
		speed = difficulty();
		$('#loss').prop('hidden', true);
	})
});