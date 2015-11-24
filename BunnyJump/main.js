var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game',Main = function(){});


Main.prototype = {
	loadScripts:function(){
		game.load.script('gameUtils','js/gameUtils.js');
		game.load.script('splash','js/states/splash.js');
		game.load.script('game','js/states/game.js');
		game.load.script('gameMenu','js/states/gameMenu.js');
			
	},
	loadFonts:function(){
		WebFontConfig ={
			custom:{
				families:['Manamansalo'],
				urls:['css/Manamansalo.css']
			}
		}
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
		game.load.image('loadingBar','assets/loading.png');
		game.load.spritesheet('moeda','assets/MoedaGirando.png',44,40);
		game.load.image('coelhoLogo','assets/coelhoLogo.png');
		

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


	},
	preload:function(){
		this.loadScripts();
		this.loadStates();
		this.loadFonts();
		this.loadAssets();
	},

	create:function(){
		game.state.start('Game');
	}
}