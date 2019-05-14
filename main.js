// TEAM NUMBER 46
// TEAM NAME: DEFUSERS
// Johnny Luo
// Reese Chong
// Timothy Gee
// Benjamin Tran
// GITHUB REPO: https://github.com/jluo42/FinalGame

"use strict";
var game = new Phaser.Game(1200, 800, Phaser.AUTO);
var menuText;
var score = 0;
var scoreText;
//var timer;
//var total = 0;

var MainMenu = function(game){};
MainMenu.prototype = {
	preload: function() {
		console.log("MainMenu: preload");
		game.load.image('bomb', 'assets/img/bomb.png');
		game.load.image('Disarmbackground', 'assets/img/Disarmbackground.png');
		game.load.audio('click', 'assets/audio/click.mp3');
		game.load.audio('backAudio', 'assets/audio/backAudio.mp3');
		game.load.spritesheet('civilian01', 'assets/img/civilian01.png', 128, 128);
		game.load.spritesheet('diffuser', 'assets/img/diffuser.png', 128, 128);
	},
	create: function() {
		 game.stage.backgroundColor  = '#736357';	
		 menuText = game.add.text(300, 200, 'DEFUZE OR DIE!!! Press Spacebar to play', { fontSize: '32px', fill: '#000' });
		 menuInstruction = game.add.text(300, 300, 'The Keycodes represents a number in the number keypad. \nFor example the number 101 would be #5 on the number pad. \nDecode all the keycodes and press and hold all \nfour of the keycodes to defuse the bomb. \nDO NOT LET GO OF THE NUMBERS. ', { fontSize: '25px', fill: '#000' });
		//adding background music and looping it all the way.
		backgroundMusic = game.add.audio('backAudio');
		backgroundMusic.loopFull();
	},

	update: function() {
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      		game.state.start('Play');
		}
	}
}
var menuInstruction;
var backgroundMusic;
var bomb;
var click;
var numPresent = false;
var bombNumText;
var rndbombNum;
var userInput;
var num1;
var num2; 
var num3;
var num4;
var keyNum0, keyNum1, keyNum2, keyNum3, keyNum4, keyNum5, keyNum6, keyNum7, keyNum8, keyNum9;
var keyText1, keyText2, keyText3, keyText4;
var keyNumInstruct;
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

		//scoretext
		 scoreText = game.add.text(16, 16, '0% Diffused', { fontSize: '32px', fill: '#674' });

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

		//add all the nums to an array and having the variable randomly pick a index of the array.
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

		//creating the text with keyCodes
		keyText1 = game.add.text(250, 530, num1.keyCode, {font: "100px Arial", fill: "#000"}); 
		keyText2 = game.add.text(450, 530, num2.keyCode, {font: "100px Arial", fill: "#000"}); 
		keyText3 = game.add.text(650, 530, num3.keyCode, {font: "100px Arial", fill: "#000"}); 
		keyText4 = game.add.text(850, 530, num4.keyCode, {font: "100px Arial", fill: "#000"}); 


		//text UI for in-game instructions 
		keyNumInstruct = game.add.text(50, 700, "96 = 0; 97 = 1; 98 = 2; 99 = 3; 100 = 4; 101 = 5; 102 = 6; 103 = 7; 104 = 8; 105 = 9 ", {font: "30px Arial", fill: "#000"}); 

		//timer implementations
		var me = this;
		me.startTime = new Date();
		me.totalTime = 60;
		me.timeElapsed = 0;
		me.createTimer();
		me.gameTimer = game.time.events.loop(100, function(){
		me.updateTimer();
		});
		
		//sound for click
		click = game.add.audio('click');
	},

	//function for the timer
	createTimer: function(){

        var me = this;

        me.timeLabel = me.game.add.text(me.game.world.centerX, 10, "00:00", {font: "100px Arial", fill: "#000"}); 
        me.timeLabel.anchor.setTo(0.5, 0);
        me.timeLabel.align = 'center';

    },
    //function to update the timer
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


	update: function() {

		/*if(total == 1)
		{
			total = 0;
			game.state.start('GameOver');
		}*/

		if(userInput == keyNum2) {
			game.state.start('GameOver');
		}

		//key presses for the mechanic of the game.
		if(num1.isDown == true){
			console.log('hit');
			click.play();
			if(num2.isDown == true) {
				console.log('hit');
				click.play();
				if(num3.isDown == true) {
					console.log('hit');
					click.play();
					if(num4.isDown == true) {
						console.log('hit');
						click.play();
						//game.state.start('GameOver');
						score += 10;
   						scoreText.text = score + '% Diffused';

   						//win condition
   						if (score >= 100)
   						{
   							game.state.start('GameWin');
   						}
						getNewCode();
					}
				}
			}
			
		}
		//console.log(game.input.keyboard.isDown(Phaser.Keyboard.NUMPAD_1));
		//console.log(userInput);
	}
}

//updates the score counter
function updateCounter() {

    total++;

}

//grabs a new code for the mechanic whenever it is compeleted.
function getNewCode() {
		num1 = game.rnd.pick(numPadArray);
		num2 = game.rnd.pick(numPadArray);
		num3 = game.rnd.pick(numPadArray);
		num4 = game.rnd.pick(numPadArray);
		rndbombNum = game.rnd.integerInRange(1000,9999);
		numPresent = true;
		bombNumText.text = rndbombNum;
		keyText1.text = num1.keyCode
		keyText2.text = num2.keyCode
		keyText3.text = num3.keyCode
		keyText4.text = num4.keyCode

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

var GameWin = function(game) {};
GameWin.prototype = {
	preload: function(){

	},

	create: function(){
		menuText = game.add.text(300, 400, 'You have defused the bomb!!! Press Spacebar to play again', { fontSize: '32px', fill: '#000' });
	},

	update: function(){
			if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      		game.state.start('Play');
	}
	}
}

//Game States
game.state.add('MainMenu', MainMenu);
game.state.add('Play', Play);
game.state.add('GameOver', GameOver);
game.state.add('GameWin', GameWin);
game.state.start('MainMenu');
