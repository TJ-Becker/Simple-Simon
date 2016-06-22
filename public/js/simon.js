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

	function randomNumber(amount) {
		var random = Math.floor(Math.random() * (amount) + 1);
		return random;
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

	function score(current) {
		$('#current-score').html("Current: " + currentScore);
		if (current > highScore) {
			highScore = current;
			$('#high-score').html("High: " + highScore);
		}
	}
	buttons.each(function() {
		$(this).click(function() {
			$(this).animate({
				'opacity': '.2'
			}, 100).animate( {
				'opacity': '1'
			}, 100);
			var speed = difficulty();
			playSound($(this).data('value'));
			if (solution[index] == $(this).data('value')) {
				index++;
				console.log("correct.")
				if ((index) == (solution.length)) {
					console.log("success. resetting.")
					index = 0;
					currentScore++;
					solution.push(randomNumber(buttons.length));
					console.log(solution);
					setTimeout(function() {
						$(solution).each(function(index, element) {
							setTimeout(function() {
								$('[data-value=' + (element) + ']').animate({
									'opacity': '.2'
								}, 100).animate({
									'opacity': '1'
								}, 100);
								playSound(element);
							}, (speed * (index + 2)));
						})
					}, 1000);
					score(currentScore);
				}
			} else {
				index = 0;
				solution = [];
				console.log("failure.")
				currentScore = 0;
				score();
				$('#loss').removeAttr('hidden');
			}
		});
	});

	$('#start').click(function() {
		solution = [];
		index = 0;
		currentScore = 0;
		score();
		var starter = (randomNumber(buttons.length));
		solution.push(starter);
		console.log(solution);
		playSound(starter);
		$('[data-value=' + starter + ']').animate({
			'opacity': '.2'
		}).animate({
			'opacity': '1'
		});
		$('#loss').prop('hidden', true);
	})
});