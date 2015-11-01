var game = new Phaser.Game(800, 800, Phaser.AUTO, 'game',Main = function(){});


Main.prototype = {
	loadScripts:function(){
		game.load.script('gameUtils','js/gameUtils.js');
		game.load.script('splash','js/states/splash.js');
		game.load.script('game','js/states/game.js');
	},
	loadStates:function(){
		game.state.add('Splash',Splash);
		game.state.add('Game',Game);
	},
	loadAssets:function(){
		game.load.image('tile','assets/dirt_grass.png');
		game.load.spritesheet('player','assets/spriteSheetCoelho.png',44,70);
		game.load.image('loadingBar','assets/loading.png');
		game.load.image('sky', 'assets/sky.png');
		game.load.spritesheet('moeda','assets/MoedaGirando.png',44,40);
		game.load.audio('hitCoin','assets/sounds/ganharMoeda.wav');
		game.load.image('coelhoLogo','assets/coelhoLogo.png');
	},
	preload:function(){
		this.loadScripts();
		this.loadStates();
		this.loadAssets();
	},

	create:function(){
		game.state.start('Splash');
	}
}