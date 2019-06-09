# FinalGame
CMPM 120 Final Game Project




if (numPadArray[0] == keyNum1 && orangecheck == true)
		{
			orange = game.add.sprite(312,630,'orange');
			orange.scale.setTo(.35,.3);
			keyText1 = game.add.text(350, 635, num1.keyCode, {font: "40px Arial", fill: "#000"}); 
			orangecheck = false;
		}

		if (numPadArray[1] == keyNum1 && orangecheck == true)
		{
			orange = game.add.sprite(492,630,'orange');
			orange.scale.setTo(.35,.3);
			keyText2 = game.add.text(500, 635, num2.keyCode, {font: "40px Arial", fill: "#000"}); 
			orangecheck = false;
		}

		if (numPadArray[2] == keyNum1 && orangecheck == true)
		{
			green = game.add.sprite(672,630,'green');
			orange.scale.setTo(.35,.3);
			keyText3 = game.add.text(675, 635, num3.keyCode, {font: "40px Arial", fill: "#000"}); 
			orangecheck = false;
		}

		if (numPadArray[3] == keyNum1 && orangecheck == true)
		{
			orange = game.add.sprite(852,630,'green');
			orange.scale.setTo(.35,.3);
			keyText4 = game.add.text(850, 635, num4.keyCode, {font: "40px Arial", fill: "#000"}); 
			orangecheck = false;
		}