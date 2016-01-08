
var width = navigator.isCocoonJS ? window.innerWidth : 900;
var height = navigator.isCocoonJS ? window.innerHeight : 600;

var game = new Phaser.Game(width, height, Phaser.AUTO, 'game',Main = function(){});
var GAME_UTILITY = new Utility(game);
 

Main.prototype = {
	loadFonts:function(){
		var teste = game.add.text(0,0,{font:'manamansalo'});
		game.time.events.add(1000,teste.text="o");
	},
	loadScripts:function(){
		var teste2 = game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

	},
	loadStates:function(){
		game.state.add('Splash',Splash);
		game.state.add('Game',Game);
		game.state.add('GameMenu',GameMenu);
	},
	loadAssets:function(){
		game.load.image('normalTile','assets/dirt_grass.png');
		game.load.image('brokenTile','assets/broken_dirt_grass.png');
		game.load.spritesheet('player','assets/spriteSheetCoelho.png',44,70);
		game.load.image('bunnyLogo','assets/coelhoLogo.png');
		game.load.image('carrot','assets/carrot.png');
		game.load.image('carrotIcon','assets/carrots.png');
		
		
		//Sounds
		game.load.audio('hitCoin','assets/sounds/ganharMoeda.wav');
		//BG
		game.load.image('bgLayer1','assets/background/bg_layer1.png');
		game.load.image('bgLayer2','assets/background/bg_layer2.png');
		game.load.image('bgLayer3','assets/background/bg_layer3.png');
		game.load.image('bgLayer4','assets/background/bg_layer4.png');

		//icons
		game.load.image('playIcon','assets/icons/play.png');
		game.load.image('pauseIcon','assets/icons/pause.png');
		game.load.image('restartIcon','assets/icons/return.png');
		game.load.image('concedeIcon','assets/icons/cross.png');


		//Buttons
		game.load.image('leftButton','assets/controlIcons/arrowLeft.png');
		game.load.image('rightButton','assets/controlIcons/arrowRight.png');
		game.load.image('jumpButton','assets/controlIcons/arrowUp.png');



	},
	preload:function(){
		this.loadFonts();
		this.loadScripts();
		this.loadStates();
		this.loadAssets();
	},

	create:function(){
		game.state.start('GameMenu');
	}
}