
	var width = navigator.isCocoonJS ? window.innerWidth : 1000;
	var height = navigator.isCocoonJS ? window.innerHeight : 600;

	var game = new Phaser.Game(width, height, Phaser.AUTO, 'game',Main = function(){});
	var GAME_UTILITY = new Utility(game);
	var PLAYER_MANAGER = new PlayerManager();
	var GAME_AUDIO_ON = true;
	 
	Main.prototype = {
		loadStates:function(){
			game.state.add('Splash',Splash);
			
		},
		loadAssets:function(){
			game.load.image('bunnyLogo','assets/coelhoLogo.png');

			game.load.image('bgLayer1','assets/background/bg_layer1.png');
			game.load.image('bgLayer2','assets/background/bg_layer2.png');
			game.load.image('bgLayer3','assets/background/bg_layer3.png');
			game.load.image('bgLayer4','assets/background/bg_layer4.png');

		},
		preload:function(){
			this.loadStates();
			this.loadAssets();
		},

		create:function(){
			game.state.start('Splash');
		}
	}