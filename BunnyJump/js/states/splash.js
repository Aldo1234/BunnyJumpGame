function Splash (){

}


Splash.prototype = {
	loadStates:function(){
		game.state.add('Game',Game);
		game.state.add('GameMenu',GameMenu);
	},
	loadSounds:function(){
		game.load.audio('hitCarrot','assets/sounds/hitCarrot.wav')
		game.load.audio('pressButton','assets/sounds/pressButton.wav');

	},
	loadImages:function(){
		game.load.image('normalTile','assets/dirt_grass.png');
		game.load.image('brokenTile','assets/broken_dirt_grass.png');
		game.load.spritesheet('player','assets/spriteSheetCoelho.png',44,70);

		game.load.image('carrot','assets/carrot.png');
		game.load.image('carrotIcon','assets/carrots.png');

		//icons
		game.load.image('playIcon','assets/icons/play.png');
		game.load.image('pauseIcon','assets/icons/pause.png');
		game.load.image('restartIcon','assets/icons/return.png');
		game.load.image('concedeIcon','assets/icons/cross.png');

		//Buttons_up
		game.load.image('leftButton_up','assets/controlIcons/arrowLeft_up.png');
		game.load.image('rightButton_up','assets/controlIcons/arrowRight_up.png');
		game.load.image('jumpButton_up','assets/controlIcons/arrowUp_up.png');
		//Buttons_down
		game.load.image('leftButton_down','assets/controlIcons/arrowLeft_down.png');
		game.load.image('rightButton_down','assets/controlIcons/arrowRight_down.png');
		game.load.image('jumpButton_down','assets/controlIcons/arrowUp_down.png');
	},

	preload:function(){
		var status,logo;
		logo = game.add.sprite(game.world.centerX,game.world.centerY/5,"coelhoLogo");

		GAME_UTILITY.createBackGround();

		status = game.add.text(game.world.centerX,game.world.centerY,'Loading...');
		status.anchor.setTo(0.5);
		status.font = 'manamansalo';
		status.fontSize = '100px';

		this.loadImages();
		this.loadSounds();
		this.loadStates();


	},
	create:function(){
		game.state.start("GameMenu");
	}
}