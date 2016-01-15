function GameMenu(){
	this.gameUtility = GAME_UTILITY;
}

GameMenu.prototype = {

	create:function(){
		this.gameUtility.createBackGround();		
		this.logoAnimation();
		this.playButton();	

	},
	logoAnimation:function(){
		var rabbitLogo = game.add.sprite((game.width/2),0,'bunnyLogo');
		rabbitLogo.anchor.setTo(0.5);

		game.physics.arcade.enable(rabbitLogo);
		rabbitLogo.body.gravity.y = 2000;
		rabbitLogo.body.collideWorldBounds = true;

		rabbitLogo.body.bounce.y = 0.8;
	},
	playButton:function(){
		var playBt = game.add.text(game.width/2,game.height/2);
		playBt.font ="manamansalo";
		playBt.text = "Play";
		playBt.anchor.setTo(0.5);
		playBt.fontSize = "200px";
		playBt.fill = "#339900";
		playBt.inputEnabled = true;


		playBt.events.onInputDown.add(function(){
			game.state.start("Game");
		});
	},
	
}