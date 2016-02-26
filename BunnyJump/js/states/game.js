function Game(){
	this.cursors = game.input.keyboard.createCursorKeys();
	this.spaceBarKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	this.playerManager = PLAYER_MANAGER;
	this.gameUtility = GAME_UTILITY;

}
	Game.prototype = {
	create:function(){

		this.initConfig();

		this.gameUtility.createBackGround();
	
		this.createGroups();

		this.playerManager.createPlayer();

		this.gameUtility.createVisualControls();
		this.gameUtility.visualControlsFunctions(this.playerManager);

		this.initPlatform();


		game.delayGeradorPlataforma = 1800;

		this.gameUtility.showScore();
		this.gameUtility.pauseButton();
		this.gameUtility.audioHandlerButton();

		this.soundsConfig();

		
	},
	update : function(){
		this.platformGenerator();
		//Colisão de player com plataformas
		game.physics.arcade.collide(this.playerManager.player,game.normalTileGroup);
		game.physics.arcade.collide(this.playerManager.player,game.brokenTileGroup,this.collisionCallBack);

		this.playerMotionLogic();
		game.itemsSpeed += 0.05;
		game.physics.arcade.overlap(this.playerManager.player,game.carrots,this.collectCarrot,null,this);
	},

	initConfig:function(){

		//Tamanho dos tiles
		game.tileWidth = game.cache.getImage('normalTile').width;
		game.tileHeight = game.cache.getImage('normalTile').height;

		//Física
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.tempoInicio = game.time.now;

		game.playerJumped = true;	
	
		game.spacing = 3.8*game.tileHeight;

		game.checkHighScore = false;

		game.antigaPassagem = 0;

		game.itemsSpeed = 150.0;
		game.score = 0;

	},
    createGroups:function(){

	 	game.normalTileGroup = game.add.group();
		game.normalTileGroup.enableBody = true;

		game.brokenTileGroup = game.add.group();
		game.brokenTileGroup.enableBody = true;



		game.carrots = game.add.group();
		game.carrots.enableBody = true;

 	},
 	playerMotionLogic:function(){
 		
		if(this.playerManager.player.alive){
			if(this.playerManager.player.body.y == game.world.height - this.playerManager.player.height){
 				this.gameOver();
			}
			if((this.spaceBarKey.isDown || this.game.jumpButton.isDown) && this.playerManager.player.body.wasTouching.down){
				this.playerManager.jump();
				game.playerJumped = true;
			}
			if((this.cursors.left.isDown || this.game.leftButton.isDown) && (this.playerManager.player.x >= this.playerManager.player.width)){
				this.playerManager.goLeft();
				this.playerManager.accelerate();

			}else if((this.cursors.right.isDown || this.game.rightButton.isDown) && (this.playerManager.player.x < (game.width - this.playerManager.player.width))){
				this.playerManager.goRight();
				this.playerManager.accelerate();

			}else{
				this.playerManager.stop();
				this.playerManager.resetSpeed();
			}
		}   

 	},
 	soundsConfig:function() {
 		game.hitCarrotSound = game.add.audio('hitCarrot');
 		game.notificationSound = game.add.audio('notification');
 	},

	addTile:function(x,y,immovable){
		var tile;
		if(immovable){
		 tile = game.normalTileGroup.create(x,y,'normalTile');
		}else{
		 tile = game.brokenTileGroup.create(x,y,'brokenTile');	
		}
		tile.body.velocity.y = game.itemsSpeed;
		tile.body.immovable = true;

		tile.outOfBoundsKill = true;

	},


	addCarrot:function(x,y){
		var moeda = game.carrots.create(x,y,'carrot');
		moeda.scale.setTo(0.6);
		moeda.body.velocity.y = game.itemsSpeed;
		moeda.outOfBoundsKill = true;
	},

	addPlataform:function(y){
		if(typeof(y) == "undefined"){
			y = -game.tileHeight;
		}
		var tileNecessarios = Math.ceil(game.world.width / game.tileWidth);

		var passagem =  Math.floor(Math.random() * (tileNecessarios - 3)) + 1;

		if(passagem == game.antigaPassagem){
			passagem = Math.floor(Math.random() * (tileNecessarios - 3)) + 1; 	
		}
		game.antigaPassagem = passagem;

		for (var i = 0; i < tileNecessarios; i++) {
		 	if(i != passagem  && i%2 == 0 ){
		 		this.addTile(i * game.tileWidth,y,true);
		 	}else if(i != passagem ) {
		 		this.addTile(i * game.tileWidth,y,false);
		 	}else{
		 		this.addCarrot(i*game.tileWidth+(game.tileWidth/4),y);
		 	}
		 } 
	},

	initPlatform:function(){
		var base = game.world.height - game.tileHeight;
		var topo = game.tileHeight;

		var y = topo;
		while( y < base - game.tileHeight){
			this.addPlataform(y);
			y = y + game.spacing;
		}
	},

 	platformGenerator:function(){
		var tempoDecorrido = game.time.elapsedSince(game.tempoInicio);
		if(tempoDecorrido >= game.delayGeradorPlataforma ){
			var y = undefined;
			this.addPlataform(y);
			game.tempoInicio = game.time.now;
		}
	},
	

 	showSpeed:function(){
	//MÉTODO DE DEBUG
		var fonte = "25px Arial"
		game.labelVelocidade = game.add.text(5,5,game.time.fps,{font:fonte,fill:"#0000"});
	},

	collectCarrot:function(player,carrot){
		carrot.kill();
		this.scorePt();
		this.updateDifficulty();
		if(GAME_AUDIO_ON){
		 game.hitCarrotSound.play();
		}
	},

	scorePt:function(){
		game.score += 1;
		game.scoreLabel.text = game.score;
		var scoreLabelTween = game.add.tween(game.scoreLabel.scale).to({x:1.5,y:1.5},100,Phaser.Easing.Linear.In,true).to({x:1,y:1},200,Phaser.Easing.Linear.In,true);
		if(!game.checkHighScore){
			if(game.score > localStorage.getItem("higherScore")){
				GAME_UTILITY.newRecordNotification();
				if(GAME_AUDIO_ON){
				  game.notificationSound.play();
				}
				game.checkHighScore = true;
			}
		}
	},

	updateDifficulty:function(){
		if(game.score % 3 == 0 && game.score <16 ){
			game.delayGeradorPlataforma -= 170;
			game.scoreAntigo = game.score;
		}
	},

	 collisionCallBack:function(playerSprite,tileGroup){
		if(tileGroup.body.touching.up){
			tileGroup.body.allowGravity = true;
			tileGroup.body.immovable = false;
		}

	},
	gameOver:function(){
		var higher;
		this.playerManager.player.kill();
 		if(navigator.vibrate){
 			navigator.vibrate(200);
 		}
		if(localStorage.getItem('higherScore') == null){
			localStorage.setItem('higherScore',game.score);
			higher = true;
		}else{
			if(localStorage.getItem('higherScore') < game.score){
				localStorage.setItem('higherScore',game.score);
				higher = true;
			}else{
				higher = false
			}
		}
		this.gameUtility.gameOverMenu(this.playerManager,higher);	
	}
}
