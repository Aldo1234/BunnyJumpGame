function Game(){


}
	Game.prototype = {
	create:function(){

		initConfig();

		createBackGround();
	
		createItems();

		initPlatform();


		game.delayGeradorPlataforma = 1800;

		showScore();
		pauseButton();
		//showSpeed();

		soundsConfig();

		
	},
	update : function(){
		platformGenerator();
		//Colisão de player com plataformas
		game.physics.arcade.collide(game.player,game.platforms);

		if(game.player.body.position.y >= game.world.height - game.player.body.height){
			gameOver();
		}


		cursors = game.input.keyboard.createCursorKeys();

		game.player.body.velocity.x = 0;

		if(cursors.up.isDown && game.player.body.wasTouching.down){
			game.player.body.velocity.y = -1200;
			game.player.frame = 0;
		}

		if(cursors.left.isDown){
			game.player.body.velocity.x = -game.velocidadePlayer;
			game.player.animations.play('andarEsquerda')
		}else if(cursors.right.isDown){
			game.player.body.velocity.x = +game.velocidadePlayer;
			game.player.animations.play('andarDireita');
		}else{
			game.player.animations.stop();
			game.player.frame= 2;
		}
		game.itemsSpeed += 0.1;
		//game.labelVelocidade.text = game.itemsSpeed;
		game.physics.arcade.overlap(game.player,game.coins,collectCoin,null,this);
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

 function createBackGround(){
 	var layer1 = game.add.group();
 	layer1.z = 0;

 	var layer2 = game.add.group();
 	layer2.z = 1;

 	var layer3 = game.add.group();
 	layer3.z = 2;

 	var layer4 = game.add.group();
 	layer4.z = 0;



 

 	var bg1 = game.add.sprite(0,0,'bgLayer1');
 	fitBackGroundToWorld(bg1);
 	layer1.add(bg1);


 	var bg2 = game.add.sprite(0,0,'bgLayer2');
 	fitBackGroundToWorld(bg2);
 	layer2.add(bg2);

 	var bg3 = game.add.sprite(0,0,'bgLayer3');
 	fitBackGroundToWorld(bg3);
 	layer3.add(bg3);


 	var bg4 = game.add.sprite(0,0,'bgLayer4');
 	fitBackGroundToWorld(bg4);
 	bg4.scale.setTo(0.4);
 	layer4.add(bg3); 	


}

 function createItems(){
 	game.platforms = game.add.group();
	game.platforms.enableBody = true;



	game.coins = game.add.group();
	game.coins.enableBody = true;

	createPlayer();

 }	

 function soundsConfig(){
 	game.hitCoinSound = game.add.audio('hitCoin');
 }


function addTile(x,y,immovable){
	var tile;
	if(immovable){
	 tile = game.platforms.create(x,y,'normalTile');
	}else{
	 tile = game.platforms.create(x,y,'brokenTile');	
	}


	tile.body.velocity.y = game.itemsSpeed;
	tile.body.immovable = immovable;

	//Tile saindo da tela
	tile.checkWorldBounds = true;
	tile.outOfBoundsKill = true;
}




function addCoin(x,y){
	
	var moeda = game.coins.create(x,y,'moeda');
	moeda.animations.add('girar',[0,1,2,3,4,5,6,7,8,9],10,true);
	moeda.body.velocity.y = game.itemsSpeed;
	moeda.animations.play('girar');
	moeda.outOfBoundsKill = true;
}

function addPlataform(y){
	if(typeof(y) == "undefined"){
		y = -game.tileHeight;
	}
	//Calcula quantos tiles necessarios(Math.ceil -> Arrendonda) para preencher a largur,a da tela 
	var tileNecessarios = Math.ceil(game.world.width / game.tileWidth);

	//Espaço por onde o jogador poderá passar
	var passagem =  Math.floor(Math.random() * (tileNecessarios - 3)) + 1;

	//Adiciona tiles até completar o numero de tiles necessarios para tela
	for (var i = 0; i < tileNecessarios; i++) {
	 	if(i != passagem  && i%2 == 0 ){
	 		addTile(i * game.tileWidth,y,true);
	 	}else if(i != passagem ) {
	 		addTile(i * game.tileWidth,y,false);
	 	}else{
	 		addCoin(i*game.tileWidth+(game.tileWidth/4),y);

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

function fitBackGroundToWorld(bgSprite){
	bgSprite.height = game.height;
	bgSprite.width = game.width;
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
	game.player.body.collideWorldBounds = true;

	//Velocidade
	game.velocidadePlayer = 300;

	game.player.animations.add('andarEsquerda',[0,1],10,true);
	game.player.animations.add('andarDireita',[3,4],10,true);


}

function pauseButton(){

	var fontePause = "30px Arial"
	game.pauseButton = game.add.text(50,50,"Pause",{font:fontePause,fill:"#0000"});
	game.pauseButton.anchor.setTo(0.5,0.5);
	game.pauseButton.align = 'center';


	game.pauseButton.inputEnabled = true;

	game.pauseButton.events.onInputUp.add(function(target) {
		game.paused=true;
	})

	game.input.onDown.add(function(){
		game.paused=false;
	});
}


function showScore(){
	var fontePonto = "100px Manamansalo";

	game.scoreLabel = game.add.text((game.width-40),40,"0",{font:fontePonto,fill:"#006699"});
	game.scoreLabel.anchor.setTo(0.5,0.5);
	game.scoreLabel.align = 'center';
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
	if(game.score % 3 == 0 && game.score <36 ){
		game.delayGeradorPlataforma -= 170;
		game.scoreAntigo = game.score;
	}
		updatePlayerSpeed();
	
}
function updatePlayerSpeed(){
	game.velocidadePlayer += 10;
}

function gameOver(){
	game.player.kill();
	game.gameOverLabel = game.add.text((game.world.width/5),(game.world.height/5),"Game Over",{font:"100px Arial",fill:"#000"});
	game.state.start("Main");
}
