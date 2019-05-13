"use strict";
var game = new Phaser.Game(1200, 800, Phaser.AUTO);
var menuText;
//var timer;
//var total = 0;

var MainMenu = function(game){};
MainMenu.prototype = {
	preload: function() {
		console.log("MainMenu: preload");
		game.load.image('bomb', 'assets/img/bomb.png');
		game.load.image('Disarmbackground', 'assets/img/Disarmbackground.png');
		game.load.spritesheet('civilian01', 'assets/img/civilian01.png', 128, 128);
		game.load.spritesheet('diffuser', 'assets/img/diffuser.png', 10, 128);
	},
	create: function() {
		 game.stage.backgroundColor  = '#736357';	
		 menuText = game.add.text(300, 400, 'DEFUZE OR DIE!!! Press Spacebar to play', { fontSize: '32px', fill: '#000' });
	},

	update: function() {
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      		game.state.start('Play');
		}
	}
}

var bomb;
var numPresent = false;
var bombNumText;
var rndbombNum;
var userInput;
var num1;
var num2; 
var num3;
var num4;
var keyNum0, keyNum1, keyNum2, keyNum3, keyNum4, keyNum5, keyNum6, keyNum7, keyNum8, keyNum9;
var numPadArray;

var Play = function(game) {};
Play.prototype = {
	init: function() {

	},
	
	preload: function() {
		console.log("MainMenu: play");
	},



	create: function() {

		//create background
		var Disarmbackground = game.add.sprite(0,0,'Disarmbackground');
		Disarmbackground.height = game.height;
		Disarmbackground.width = game.width;

		//create civilian
		var civilian01 = game.add.sprite( 200, 400, 'civilian01');

		//create diffuser
		var diffuser = game.add.sprite( 100, 400, 'diffuser');
		
		//bomb added to the top left.
		bomb = game.add.sprite(850,0, 'bomb');

		//set scale to fit screen
		bomb.scale.setTo(.3,.3);

		//display bombNum UI text.
		bombNumText = game.add.text(950,93, '0000', {fontSize: '40px', fill: '#000'});

		//userInput = game.input.keyboard;
		keyNum0 = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_0);
		keyNum1 = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_1);
		keyNum2 = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_2);
		keyNum3 = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_3);
		keyNum4 = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_4);
		keyNum5 = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_5);
		keyNum6 = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_6);
		keyNum7 = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_7);
		keyNum8 = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_8);
		keyNum9 = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_9);

		
		numPadArray = [keyNum0, keyNum1, keyNum2, keyNum3, keyNum4, keyNum5, keyNum6, keyNum7, keyNum8, keyNum9];
		num1 = game.rnd.pick(numPadArray);
		num2 = game.rnd.pick(numPadArray);
		num3 = game.rnd.pick(numPadArray);
		num4 = game.rnd.pick(numPadArray);

		
		//console.log(userInput);
		console.log(num1.keyCode);
		console.log(num2.keyCode);
		console.log(num3.keyCode);
		console.log(num4.keyCode);

		//timer
		//timer = game.time.create(false);
		//timer.loop(10000, updateCounter, this);
		//timer.start();
		//game.time.events.add(Phaser.Timer.SECOND * 180, fadePicture, this);
		var me = this;
		me.startTime = new Date();
		me.totalTime = 60;
		me.timeElapsed = 0;

		me.createTimer();

		me.gameTimer = game.time.events.loop(100, function(){
		me.updateTimer();
		});
		
	},

	createTimer: function(){

        var me = this;

        me.timeLabel = me.game.add.text(me.game.world.centerX, 100, "00:00", {font: "100px Arial", fill: "#000"}); 
        me.timeLabel.anchor.setTo(0.5, 0);
        me.timeLabel.align = 'center';

    },

    updateTimer: function(){

        var me = this;

        var currentTime = new Date();
        var timeDifference = me.startTime.getTime() - currentTime.getTime();

        //Time elapsed in seconds
        me.timeElapsed = Math.abs(timeDifference / 1000);

        //Time remaining in seconds
        var timeRemaining = me.totalTime - me.timeElapsed; 

        //Convert seconds into minutes and seconds
        var minutes = Math.floor(timeRemaining / 60);
        var seconds = Math.floor(timeRemaining) - (60 * minutes);

        //Display minutes, add a 0 to the start if less than 10
        var result = (minutes < 10) ? "0" + minutes : minutes; 

        //Display seconds, add a 0 to the start if less than 10
        result += (seconds < 10) ? ":0" + seconds : ":" + seconds; 

        me.timeLabel.text = result;

        if(me.timeElapsed >= me.totalTime){
    	game.state.start('GameOver');
}

    },
	/*render: function()
	{
		//game.debug.text("Time until event: " + game.time.totalElapsedSeconds(), 32, 32);
		 //game.debug.text('Time until event: ' + timer.duration.toFixed(0), 32, 32);
		 //game.debug.text('Time until event: ' + timer.duration.toFixed(0), 32, 32);
		// game.debug.text('Loop Count: ' + total, 32, 64);

	},
	*/


	update: function() {

		/*if(total == 1)
		{
			total = 0;
			game.state.start('GameOver');
		}*/

		if(userInput == keyNum2) {
			game.state.start('GameOver');
		}

		if(num1.isDown == true){
			console.log('hit');
			if(num2.isDown == true) {
				console.log('hit');
				if(num3.isDown == true) {
					console.log('hit');
					if(num4.isDown == true) {
						console.log('hit');
						//game.state.start('GameOver');
						getNewCode();
					}
				}
			}
			
		}
		//console.log(game.input.keyboard.isDown(Phaser.Keyboard.NUMPAD_1));
		//console.log(userInput);
	}
}

/*function fadePicture()
	{
		 game.state.start('GameOver');
	}
*/

function updateCounter() {

    total++;

}
	
function getNewCode() {
		num1 = game.rnd.pick(numPadArray);
		num2 = game.rnd.pick(numPadArray);
		num3 = game.rnd.pick(numPadArray);
		num4 = game.rnd.pick(numPadArray);
		rndbombNum = game.rnd.integerInRange(1000,9999);
		numPresent = true;
		bombNumText.text = rndbombNum;
}

var GameOver = function(game) {};
GameOver.prototype = {
	preload: function() {

	},

	create: function() {
		menuText = game.add.text(300, 400, 'YOU HAVE DIED!!! Press Spacebar to play again', { fontSize: '32px', fill: '#000' });
	},

	update: function() {
			if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      		game.state.start('Play');
		}
	}
}

//Game States
game.state.add('MainMenu', MainMenu);
game.state.add('Play', Play);
game.state.add('GameOver', GameOver);
game.state.start('MainMenu');