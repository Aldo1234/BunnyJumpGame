function Game(){
	this.cursors = game.input.keyboard.createCursorKeys();
	this.spaceBarKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	this.gameUtility = new Utility(game);

}
	Game.prototype = {
	create:function(){

		initConfig();

		this.gameUtility.createBackGround();
	
		createItems();

		initPlatform();


		game.delayGeradorPlataforma = 1800;

		this.gameUtility.showScore();
		this.gameUtility.pauseButton();
		showSpeed();

		soundsConfig();

		
	},
	update : function(){
		platformGenerator();
		//Colisão de player com plataformas
		game.physics.arcade.collide(game.player,game.normalTileGroup);
		game.physics.arcade.collide(game.player,game.brokenTileGroup,collisionCallBack);

		if(game.player.body.position.y >= game.world.height + game.player.body.height + 5){
			gameOver();
		}


		game.player.body.velocity.x = 0;

		if(this.spaceBarKey.isDown && game.player.body.wasTouching.down){
			game.player.body.velocity.y = -1200;
			game.player.frame = 0;
		}
		if(this.cursors.left.isDown){
			game.player.body.velocity.x = -game.velocidadePlayer;
			game.player.animations.play('andarEsquerda')
		}else if(this.cursors.right.isDown){
			game.player.body.velocity.x = +game.velocidadePlayer;
			game.player.animations.play('andarDireita');
		}else{
			game.player.animations.stop();
			game.player.frame= 2;
		}
		game.itemsSpeed += 0.05;
		game.labelVelocidade.text = game.itemsSpeed;
		game.physics.arcade.overlap(game.player,game.carrots,collectCoin,null,this);
		}


	}


	function initConfig(){
		//Tamanho dos tiles
		game.tileWidth = game.cache.getImage('normalTile').width;
		game.tileHeight = game.cache.getImage('normalTile').height;

		//Física
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.tempoInicio = game.time.now;


	
		game.spacing = 3.8*game.tileHeight;


		game.itemsSpeed = 150.0;
		game.score = 0;

	}


function createPlayer(){

	game.player = game.add.sprite(game.world.centerX,game.world.height - (game.spacing * 2 + (3 * game.tileHeight)),'player');

	game.player.scale.setTo(0.8);

	game.player.anchor.setTo(0.5,1.0);

	game.physics.arcade.enable(game.player);

	game.player.body.gravity.y = 2000;

	//Faz o jogador quicar um pouco
	game.player.body.bounce.y = 0.2;

	//Colidir com os limites do canvas
	game.player.body.checkWorldBounds = true;

	//Velocidade
	game.velocidadePlayer = 300;

	game.player.animations.add('andarEsquerda',[0,1],10,true);
	game.player.animations.add('andarDireita',[3,4],10,true);


}

 function createItems(){
 	game.normalTileGroup = game.add.group();
	game.normalTileGroup.enableBody = true;

	game.brokenTileGroup = game.add.group();
	game.brokenTileGroup.enableBody = true;



	game.carrots = game.add.group();
	game.carrots.enableBody = true;

	createPlayer();

 }


 function soundsConfig(){
 	game.hitCoinSound = game.add.audio('hitCoin');
 }


function addTile(x,y,immovable){
	var tile;
	if(immovable){
	 tile = game.normalTileGroup.create(x,y,'normalTile');
	}else{
	 tile = game.brokenTileGroup.create(x,y,'brokenTile');	
	}
	tile.body.velocity.y = game.itemsSpeed;
	tile.body.immovable = true;
	tile.body.allowGravity = true;

	tile.checkWorldBounds = true;
	tile.outOfBoundsKill = true;

}




function addCarrot(x,y){
	
	var moeda = game.carrots.create(x,y,'carrot');
	moeda.scale.setTo(0.6);
	moeda.body.velocity.y = game.itemsSpeed;
	moeda.outOfBoundsKill = true;
}

function addPlataform(y){
	if(typeof(y) == "undefined"){
		y = -game.tileHeight;
	}
	var tileNecessarios = Math.ceil(game.world.width / game.tileWidth);

	var passagem =  Math.floor(Math.random() * (tileNecessarios - 3)) + 1;

	for (var i = 0; i < tileNecessarios; i++) {
	 	if(i != passagem  && i%2 == 0 ){
	 		addTile(i * game.tileWidth,y,true);
	 	}else if(i != passagem ) {
	 		addTile(i * game.tileWidth,y,false);
	 	}else{
	 		addCarrot(i*game.tileWidth+(game.tileWidth/4),y);

	 	}
	 }; 
}


function initPlatform(){
	var base = game.world.height - game.tileHeight;
	var topo = game.tileHeight;

	var y = topo;
	while( y < base - game.tileHeight){
		addPlataform(y);
		y = y + game.spacing;
	}


}

function platformGenerator(){
	var tempoDecorrido = game.time.elapsedSince(game.tempoInicio);
	if(tempoDecorrido >= game.delayGeradorPlataforma ){
		var y = undefined;
		addPlataform(y);
		game.tempoInicio = game.time.now;
	}
}


function showSpeed(){
	//MÉTODO DE DEBUG

	var fonte = "25px Arial"

	game.labelVelocidade = game.add.text(5,5,"",{font:fonte,fill:"#0000"});

}

function collectCoin(player,estrela){
	estrela.kill();
	scorePt();
	updateDifficulty();
	game.hitCoinSound.play();
}	

function scorePt(){
	game.score += 1;
	game.scoreLabel.text = game.score;
}

function updateDifficulty(){
	if(game.score % 3 == 0 && game.score <20 ){
		game.delayGeradorPlataforma -= 170;
		game.scoreAntigo = game.score;
	}
		updatePlayerSpeed();
	
}

function collisionCallBack(playerSprite,tileGroup){
	if(tileGroup.body.touching.up){
		tileGroup.body.immovable = false;
		tileGroup.body.allowGravity = true;
	}

}
function updatePlayerSpeed(){
	game.velocidadePlayer += 15;
}

function gameOver(){
	game.player.kill();
	game.state.start("Game");
}
