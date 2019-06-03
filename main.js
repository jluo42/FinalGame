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
		game.load.image('MainMenu01', 'assets/img/MainMenu01.png');
		game.load.image('MainMenu02', 'assets/img/MainMenu02.png');
		game.load.image('MainMenu03', 'assets/img/MainMenu03.png');
		game.load.audio('click', 'assets/audio/click.mp3');
		game.load.audio('backAudio', 'assets/audio/backAudio.mp3');
		game.load.spritesheet('civilian01', 'assets/img/civilian01.png', 128, 128);
		game.load.spritesheet('civilian02', 'assets/img/civilian02.png', 128, 128);
		game.load.spritesheet('civilian03', 'assets/img/civilian03.png', 128, 128);
		game.load.spritesheet('civilian04', 'assets/img/civilian04.png', 128, 128);
		game.load.spritesheet('diffuser01', 'assets/img/diffuser01.png', 128, 128);
		game.load.spritesheet('officer01', 'assets/img/officer01.png', 128, 128);
		game.load.atlas('chopper', 'assets/img/Chopperspritesheet.png', 'assets/img/Choppersprites.json');
	},
	create: function() {
		 game.stage.backgroundColor  = '#736357';
		 game.add.image(0,0, 'MainMenu01');	
		 menuText = game.add.text(750, 380, 'Press Spacebar \n     To Play', { fontSize: '35px', fill: '#000' });
		// menuInstruction = game.add.text(300, 300, 'The Keycodes represents a number in the number keypad. \nFor example the number 101 would be #5 on the number pad. \nDecode all the keycodes and press and hold all \nfour of the keycodes to defuse the bomb. \nDO NOT LET GO OF THE NUMBERS. ', { fontSize: '25px', fill: '#000' });
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
var chopper;
var displayNum1, displayNum2, displayNum3, displayNum4;
var numPresent = false;
var bombNumText;
var rndbombNum;
var userInput;
var num1;
var num2; 
var num3;
var num4;
var num5;
var num6;
var num7;
var num8;
var num9;
var num10;
var keyNum0, keyNum1, keyNum2, keyNum3, keyNum4, keyNum5, keyNum6, keyNum7, keyNum8, keyNum9;
var keyText1, keyText2, keyText3, keyText4;
var keyNumInstruct;
var numPadArray;
var check;

var Play = function(game) {};
Play.prototype = {
	init: function() {
		//reset score
		score = 0;

	},
	
	preload: function() {
		console.log("MainMenu: play");
	},



	create: function() {
		//enabling physics for the game
		game.physics.startSystem(Phaser.Physics.ARCADE);
		//create background
		var Disarmbackground = game.add.sprite(0,0,'Disarmbackground');
		Disarmbackground.height = game.height;
		Disarmbackground.width = game.width;


		//create civilian sprite
		//var civilian01 = game.add.sprite(200, 400, 'civilian01');
		var civilian02 = game.add.sprite(500,500, 'civilian02');

		//create diffuser sprite
		var diffuser01 = game.add.sprite(500, 400, 'diffuser01');

		//creating chopper sprite atlas
		chopper = game.add.sprite(0,0, 'chopper', 'Helicopter1');
		chopper.scale.setTo(0.08,0.08);
		this.physics.arcade.enable(chopper);
		chopper.enableBody = true;
		chopper.body.velocity.x = 100;

		//set chopper animations
		chopper.animations.add('chopperFly', [0,1], 10, true);


		//bomb added to the top left.
		bomb = game.add.sprite(850,0, 'bomb');

		//set scale to fit screen
		bomb.scale.setTo(.3,.3);

		//display bombNum UI text.
		//bombNumText = game.add.text(950,93, '0000', {fontSize: '40px', fill: '#000'});
		displayNum1 = game.add.text(945,93, '0', {fontSize: '40px', fill: '#000'});
		displayNum2 = game.add.text(970,93, '0', {fontSize: '40px', fill: '#000'});
		displayNum3 = game.add.text(995,93, '0', {fontSize: '40px', fill: '#000'});
		displayNum4 = game.add.text(1020,93, '0', {fontSize: '40px', fill: '#000'});

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
		shuffle(numPadArray);
		num1 = numPadArray[0];
		num2 = numPadArray[1];
		num3 = numPadArray[2];
		num4 = numPadArray[3];
		num5 = numPadArray[4];
		num6 = numPadArray[5];
		num7 = numPadArray[6];
		num8 = numPadArray[7];
		num9 = numPadArray[8];
		num10 = numPadArray[9];

		//creating the text with keyCodes
		keyText1 = game.add.text(250, 530, num1.keyCode, {font: "100px Arial", fill: "#000"}); 
		keyText2 = game.add.text(450, 530, num2.keyCode, {font: "100px Arial", fill: "#000"}); 
		keyText3 = game.add.text(650, 530, num3.keyCode, {font: "100px Arial", fill: "#000"}); 
		keyText4 = game.add.text(850, 530, num4.keyCode, {font: "100px Arial", fill: "#000"}); 

		//checks for repeating numbers on the sequence. If so, get a new code.
		/*if (num1 == num2 || num1 == num3 || num1 == num4 || num2 == num3 || num2 == num4 || num3 == num4)
		{
			getNewCode();
		}
		*/
		


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
		//helicopter animation
		chopper.animations.play('chopperFly');

		//wraps the helicopter around the map
		game.world.wrap(chopper, 0, true);
		
		/*if(total == 1)
		{
			total = 0;
			game.state.start('GameOver');
		}*/

		if(userInput == keyNum2) {
			game.state.start('GameOver');
		}

		//key presses for the mechanic of the game.
		

		if ( game.input.keyboard.isDown(Phaser.Keyboard.NUMPAD_0)﻿ || game.input.keyboard.isDown(Phaser.Keyboard.NUMPAD_1) || game.input.keyboard.isDown(Phaser.Keyboard.NUMPAD_2) || game.input.keyboard.isDown(Phaser.Keyboard.NUMPAD_3)﻿﻿﻿
		|| game.input.keyboard.isDown(Phaser.Keyboard.NUMPAD_4﻿ ) || game.input.keyboard.isDown(Phaser.Keyboard.NUMPAD_5) || game.input.keyboard.isDown(Phaser.Keyboard.NUMPAD_6)﻿ || game.input.keyboard.isDown(Phaser.Keyboard.NUMPAD_7)﻿
		|| game.input.keyboard.isDown(Phaser.Keyboard.NUMPAD_8)﻿ || game.input.keyboard.isDown(Phaser.Keyboard.NUMPAD_9)﻿ )
		{
			check = true;
		}

		else
		{
			check = false;
		}



		
		if(num1.isDown == true){
			console.log('hit');
			click.play();
			displayText(num1, displayNum1);
			if(num2.isDown == true) {
				console.log('hit');
				click.play();
				displayText(num2, displayNum2);
				if(num3.isDown == true) {
					console.log('hit');
					click.play();
					displayText(num3, displayNum3);
					if(num4.isDown == true) {
						console.log('hit');
						click.play();
						displayText(num4, displayNum4);
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

					else
						if (num1.isDown == false || num2.isDown == false || num3.isDown == false)
						{
							checker();
						}

						if (num5.isDown == true || num6.isDown == true || num7.isDown == true || num8.isDown == true || num9.isDown == true || num10.isDown == true)
							checker();
				}

				else
				{
					if (num1.isDown == false || num2.isDown == false)
					{
						checker();
					}

					if(num4.isDown == true || num5.isDown == true || num6.isDown == true || num7.isDown == true || num8.isDown == true || num9.isDown == true || num10.isDown == true)
						checker();

				}
			}
				
				else{
					if (num1.isDown == false)
					{
						checker();
					}

					if(num3.isDown == true || num4.isDown == true || num5.isDown == true || num6.isDown == true || num7.isDown == true || num8.isDown == true || num9.isDown == true || num10.isDown == true)
						checker();
				}
		
			
		} 
		else{
			if (check == true)
			{
				//check = false;
				checker();
			}
		}


		
		//console.log(game.input.keyboard.isDown(Phaser.Keyboard.NUMPAD_1));
		//console.log(userInput);
	}
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]]; // swap elements
  }
}

function checker()	{
	score -= 10;
	getNewCode();
}

function displayText(numCode, displayNum) {
	if(numCode.keyCode == 96) {
	displayNum.text = '0';
	} 
	if(numCode.keyCode == 97) {
	displayNum.text = '1';
	}
	if(numCode.keyCode == 98) {
	displayNum.text = '2';
	}
	if(numCode.keyCode == 99) {
	displayNum.text = '3';
	}
	if(numCode.keyCode == 100) {
	displayNum.text = '4';
	}
	if(numCode.keyCode == 101) {
	displayNum.text = '5';
	}
	if(numCode.keyCode == 102) {
	displayNum.text = '6';
	}
	if(numCode.keyCode == 103) {
	displayNum.text = '7';
	}
	if(numCode.keyCode == 104) {
	displayNum.text = '8';
	}
	if(numCode.keyCode == 105) {
	displayNum.text = '9';
	}
}
//updates the score counter
function updateCounter() {

    total++;

}

//grabs a new code for the mechanic whenever it is compeleted.
function getNewCode() {
		shuffle(numPadArray);
		num1 = numPadArray[0];
		num2 = numPadArray[1];
		num3 = numPadArray[2];
		num4 = numPadArray[3];
		num5 = numPadArray[4];
		num6 = numPadArray[5];
		num7 = numPadArray[6];
		num8 = numPadArray[7];
		num9 = numPadArray[8];
		num10 = numPadArray[9];


		
		rndbombNum = game.rnd.integerInRange(1000,9999);
		numPresent = true;
		//bombNumText.text = rndbombNum;
		keyText1.text = num1.keyCode;
		keyText2.text = num2.keyCode;
		keyText3.text = num3.keyCode;
		keyText4.text = num4.keyCode;

		

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
