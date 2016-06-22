var solution = [];
var buttons = $('.buttons');
var index = 0;
var dMajor = document.getElementById('d-major');
var aMajor = document.getElementById('#a-major');
var bMinor = document.getElementById('#b-minor');
var gMajor = document.getElementById('#g-major');
var currentScore = 0;
var highScore = 0;

function randomNumber(amount) {
	var random = Math.floor(Math.random() * (amount) + 1);
	return random;
}

function playSound(value) {
	if (value == 1) {
		if(dMajor.duration > 0 && !dMajor.paused){

                //already playing
                dMajor.pause();
                dMajor.currentTime = 0;
                dMajor.play();

            }else{

                //not playing

                dMajor.play();    

            }
	} else if (value == 2) {
		$aMajor.currentTime = 0;
		$aMajor.trigger('play');
	} else if (value == 3) {
		$bMinor.currentTime = 0;
		$bMinor.trigger('play');
	} else if (value == 4) {
		$gMajor.currentTime = 0;
		$gMajor.trigger('play');
	}
}

buttons.each(function() {
	$(this).click(function() {
		$(this).animate({
			'opacity': '.5'
		}, 200).animate( {
			'opacity': '1'
		}, 200);
		playSound($(this).data('value'));
		if (solution[index] == $(this).data('value')) {
			index++;
			console.log("correct.")
			if ((index) == (solution.length)) {
				console.log("success. resetting.")
				index = 0;
				solution.push(randomNumber(buttons.length));
				console.log(solution);
				$(solution).each(function(index, element) {
					console.log("Element: " + element);
					setTimeout(function() {
						$('*[data-value=' + (element) + ']').animate({
							'opacity': '.2'
						});
					}, (1000 * (index + 2)));

					setTimeout(function() {
						$('*[data-value=' + (element) + ']').animate({
							'opacity': '1'
						});
					}, (1000 * (index + 2)));

					setTimeout(function() {
						playSound(element);
					}, (1000 * (index + 2)));
				})
			}
		} else {
			index = 0;
			solution = [];
			console.log("failure.")
		}
	});
});

$('#start').click(function() {
	solution = [];
	index = 0;
	solution.push(randomNumber(buttons.length));
	console.log(solution);
})