function GameMenu(){
	this.gameUtility = GAME_UTILITY;
}

GameMenu.prototype = {
	preload:function(){
		game.pressButton = game.add.audio('pressButton');
	},
	create:function(){
		this.gameUtility.createBackGround();		
		this.logoAnimation();
		this.carrotsAnimation();
		this.playButton();
	},
	logoAnimation:function(){
		var rabbitLogo = game.add.sprite((game.width/2),0,'bunnyLogo');
		rabbitLogo.anchor.setTo(0.5);

		game.physics.arcade.enable(rabbitLogo);
		rabbitLogo.body.gravity.y = 2000;
		rabbitLogo.body.collideWorldBounds = true;

		rabbitLogo.body.bounce.y = 0.2;
	},
	carrotsAnimation:function(){
		var carrotLogo = game.add.sprite((game.width/3),0,'carrot');
		
		game.physics.arcade.enable(carrotLogo);
		carrotLogo.body.gravity.y = 2000;
		carrotLogo.body.collideWorldBounds = true;
		carrotLogo.body.bounce.y = 0.3;


	},
	playButton:function(){
		var playBt = game.add.text(game.width/2,game.height/2);
		playBt.anchor.setTo(0.5);
		playBt.font ="manamansalo";
		playBt.text = "Play";
		playBt.fontSize = "200px";
		playBt.fill = "#22b14c";
		playBt.inputEnabled = true;



		playBt.events.onInputDown.add(function(){
			game.state.start("Game");
			if(GAME_AUDIO_ON){
  			  game.pressButton.play();
			}
		});


	},
	
}