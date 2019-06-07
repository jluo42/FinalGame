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
		game.load.image('test', 'assets/img/test.png');
		game.load.image('bomb', 'assets/img/bomb.png');
		game.load.image('BombTray', 'assets/img/BombTray.png');
		game.load.image('bombWire', 'assets/img/bombWire.png');
		game.load.image('Disarmbackground', 'assets/img/DisarmBackground.png');
		game.load.image('MainMenu01', 'assets/img/MainMenu01.png');
		game.load.image('MainMenu02', 'assets/img/MainMenu02.png');
		game.load.image('MainMenu03', 'assets/img/MainMenu03.png');
		game.load.audio('click', 'assets/audio/click.mp3');
		game.load.audio('backAudio', 'assets/audio/backAudio.mp3');
		game.load.audio('beep', 'assets/audio/beep.mp3');
		game.load.audio('error', 'assets/audio/error.mp3');
		game.load.audio('explosion', 'assets/audio/explosion.mp3');
		game.load.atlas('bob', 'assets/img/Bob.png', 'assets/img/Bob.json'); 
		game.load.atlas('Beanie', 'assets/img/Beanie.png', 'assets/img/Beanie.json');
		game.load.atlas('Taylor', 'assets/img/Taylor.png', 'assets/img/Taylor.json');
		game.load.atlas('buffy', 'assets/img/Buffy.png', 'assets/img/Buffy.json');
		game.load.atlas('BombMan', 'assets/img/BombMan.png', 'assets/img/BombMan.json'); 
		game.load.atlas('cop', 'assets/img/Cop.png', 'assets/img/Cop.json');
		game.load.atlas('chopper', 'assets/img/Chopperspritesheet.png', 'assets/img/Choppersprites.json');
		game.load.atlas('copCar', 'assets/img/PoliceCar.png', 'assets/img/PoliceCar.json');
		game.load.atlas('van', 'assets/img/NewsVanspritesheet.png', 'assets/img/NewsVansprites.json');
		game.load.atlas('wires', 'assets/img/Wires.png', 'assets/img/Wires.json');
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

/*var BombCut = function(game){};
BombCut.prototype = {
	create: function() {
		bombWire = game.add.sprite(-200,0, 'bombWire');
		bombWire.scale.setTo(1,1);
	}
}*/

var menuInstruction;
var backgroundMusic;
var bomb;
var bombMan, taylor, beanie, cop, bob, buffy;
var bombWire, wires;
var click;
var chopper;
var van;
var copCar, copCar1;
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
var beep;
var error;
var explosion;

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


		//create beanie sprite and animations
		beanie = game.add.sprite(900,300, 'Beanie', 'sprite1');
		beanie.scale.setTo(.12,.12);
		beanie.animations.add('beanieCry', [0,1,2], 5, true);

		//create taylor sprite and animations
		taylor = game.add.sprite(150,300, 'Taylor', 'sprite2');
		taylor.scale.setTo(.12,.12);
		taylor.animations.add('cry', [0,1,2], 5, true);

		/*var civilian04 = game.add.sprite(1000,350, 'civilian04');
		civilian04.scale.setTo(.12,.12);*/

		//create diffuser sprite and animations
		bombMan = game.add.sprite(game.world.centerX-50, 250, 'BombMan', 'sprite2');
		bombMan.scale.setTo(.15,.15);
		bombMan.animations.add('sweat', [1,2,3], 10, true);

		//create cop sprite and animations
		cop = game.add.sprite(game.world.centerX-300, 300, 'cop', 'sprite1');
		cop.scale.setTo(.25,.25);
		cop.animations.add('donut', [0,1,2,3], 5, true);

		//create bob sprite and animations
		bob = game.add.sprite(1000,330, 'bob', 'sprite1');
		bob.animations.add('panic', [0,1,2,3], 5, true);

		//creating chopper sprite atlas
		chopper = game.add.sprite(0,0, 'chopper', 'Helicopter1');
		chopper.scale.setTo(0.08,0.08);
		this.physics.arcade.enable(chopper);
		chopper.enableBody = true;
		chopper.body.velocity.x = 100;

		//set chopper animations
		chopper.animations.add('chopperFly', [0,1], 10, true);

		//creating news van
		van = game.add.sprite(20,425, 'van', 'NewsVan1');
		van.scale.setTo(0.20, 0.20);

		//creating the police car.
		copCar = game.add.sprite(775,425, 'copCar', 'PoliceCar1');
		copCar.scale.setTo(0.25, 0.25);
		
		copCar1 = game.add.sprite(-100,575, 'copCar', 'PoliceCar1');
		copCar1.scale.setTo(-0.25, 0.25);
		game.physics.arcade.enable(copCar1);
		copCar1.body.velocity.x = 250;
		copCar1.animations.add('copDrive', [0,1,2], 10, true);


		//bomb added to the top left.
		bomb = game.add.sprite(940,-20, 'bomb');
		//set scale to fit screen
		bomb.scale.setTo(.25,.25);

		bomb.inputEnabled = true;
		bomb.input.enableDrag(true);
		game.physics.arcade.enable(bomb);
		bomb.enableBody = true;

		//bomb added to the top left.
		//bombWire = game.add.sprite(560,-100, 'bombWire');
		//bombWire.scale.setTo(.5,.5);

		//display bombNum UI text.
		displayNum1 = game.add.text(1020,55, '0', {fontSize: '40px', fill: '#000'});
		displayNum2 = game.add.text(1040,55, '0', {fontSize: '40px', fill: '#000'});
		displayNum3 = game.add.text(1060,55, '0', {fontSize: '40px', fill: '#000'});
		displayNum4 = game.add.text(1080,55, '0', {fontSize: '40px', fill: '#000'});

		//scoretext
		scoreText = game.add.text(10, 10, '0% PassCode', { fontSize: '32px', fill: '#000' });

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
		keyText1 = game.add.text(400, 500, num1.keyCode, {font: "38px Arial", fill: "#000"}); 
		keyText2 = game.add.text(500, 500, num2.keyCode, {font: "38px Arial", fill: "#000"}); 
		keyText3 = game.add.text(600, 500, num3.keyCode, {font: "38px Arial", fill: "#000"}); 
		keyText4 = game.add.text(700, 500, num4.keyCode, {font: "38px Arial", fill: "#000"}); 

		//checks for repeating numbers on the sequence. If so, get a new code.
		/*if (num1 == num2 || num1 == num3 || num1 == num4 || num2 == num3 || num2 == num4 || num3 == num4)
		{
			getNewCode();
		}
		*/

		//bomb sounds
		beep = game.add.audio('beep');
		error = game.add.audio('error');
		explosion = game.add.audio('explosion');
		
		//text UI for in-game instructions 
		keyNumInstruct = game.add.text(455, 550, "96 = 0;    101 = 5\n97 = 1;    102 = 6; \n\n98 = 2;    103 = 7; \n99 = 3;    104 = 8; \n100 = 4;  105 = 9 ", {font: "30px Arial", fill: "#000"});

		//game.add.text(400,550, "Cut the Red Wire \nConnect the Red Wire to the Green \n\n\nCut the Blue Wire \nConnect Blue to Yellow", {font: "25px Arial", fill: "#000"});
		//timer implementations
		var me = this;
		me.startTime = new Date();
		me.totalTime = 150;
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

        me.timeLabel = me.game.add.text(me.game.world.centerX-5, 0, "00:00", {font: "75px Arial", fill: "#000"}); 
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
        	explosion.play();
        	backgroundMusic.stop();
    	game.state.start('GameOver');
		}

    },

	update: function() {

		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      		game.state.start('WireCut');
		}
		//helicopter animation
		chopper.animations.play('chopperFly');
		//copCar animations
		copCar1.animations.play('copDrive');
		//play the bombman sweat animations
		bombMan.animations.play('sweat');
		//play taylor cry animations
		taylor.animations.play('cry');
		//play beanie animations
		beanie.animations.play('beanieCry');
		//play cop animations
		cop.animations.play('donut');
		//play office worker animations
		bob.animations.play('panic');

		//wraps the helicopter around the map
		game.world.wrap(chopper, 0, true);
		//wraps the cop car
		game.world.wrap(copCar1, 0 , true);
		
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
			//click.play();
			//beep.play();
			displayText(num1, displayNum1);
			if(num2.isDown == true) {
				console.log('hit');
				//click.play();
				//beep.play();
				displayText(num2, displayNum2);
				if(num3.isDown == true) {
					console.log('hit');
					//click.play();
					//beep.play();
					displayText(num3, displayNum3);
					if(num4.isDown == true) {
						console.log('hit');
						//click.play();
						beep.play();
						displayText(num4, displayNum4);
						//game.state.start('GameOver');
						score += 15;
   						scoreText.text = score + '% Diffused';

   						//win condition

   						if (score >= 100)
   						{
   							game.state.start('GameWin');
   						}
   						game.paused = true;
   						game.paused = false;
   						game.time.events.add(Phaser.Timer.SECOND * 4, getNewCode, this);
						//getNewCode();
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
	error.play();
	score -= 10;
	game.paused = true;
	game.paused = false;
	scoreText.text = score + '% Diffused';
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
	//game.paused = false;
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

		//score += 15;

}

var test, testbomb;
var speed;
var WireCut = function(game) {}; //physics not working on seperate states, currently only working on 'play' state.
WireCut.prototype = {
	preload: function() {
	},

	create: function() {
		/*this.physics.startSystem(Phaser.Physics.ARCADE);

		test = game.add.image(150,150, 'test');
		test.anchor.setTo(0.5,0.5);
		test.inputEnabled = true;
		test.input.enableDrag(true);

		this.physics.arcade.enable(test);
	
		testbomb = game.add.image(250,250, 'bomb');
		testbomb.scale.setTo(.15,.15);
		this.physics.arcade.enable(testbomb);
		//testbomb.body.velocity.x = 10;*/

		var bombTray = game.add.sprite(-150,-150,'BombTray');
		var yellow = game.add.sprite(0,0, 'wires', 'Yellow');
		yellow.anchor.setTo(0.5,0.5);
		

	},

	update: function() {
		//this.physics.arcade.enable(test);
		//var overlap = game.physics.arcade.collide(test, testbomb);
		//console.log(overlap);
		//test.body.velocity.x = 0;
		//test.body.velocity.x = -110;

		
	}
}

var GameOver = function(game) {};
GameOver.prototype = {
	preload: function() {
		game.load.image('GameOverScreen', 'assets/img/GameOverScreen.png')
	},

	create: function() {
		game.add.image(0,0, 'GameOverScreen');
		menuText = game.add.text(200, 750, 'YOU HAVE DIED!!! Press Spacebar to play again', { fontSize: '32px', fill: '#FFF' });
			
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
		game.load.image('WinScreen', 'assets/img/WinScreen.png');
	},

	create: function(){
		game.add.image(0,0, 'WinScreen');
		menuText = game.add.text(10, 720, 'You have defused the bomb!!!                             Press Spacebar to play again', { fontSize: '32px', fill: '#FFF' });
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
game.state.add('WireCut', WireCut);
game.state.add('GameOver', GameOver);
game.state.add('GameWin', GameWin);
game.state.start('MainMenu');
