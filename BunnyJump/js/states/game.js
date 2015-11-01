function Game(){


}
	Game.prototype = {
	preload: function (){
	
	},
	create:function(){

		initConfig();
	
		createItems();

		initPlatform();


		game.delayGeradorPlataforma = 1800;

		showScore();
		showSpeed();

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
			game.player.body.velocity.y = -1300;
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
		game.labelVelocidade.text = game.itemsSpeed;
		game.physics.arcade.overlap(game.player,game.coins,collectCoin,null,this);
		}


	}


	function initConfig(){
		//Tamanho dos tiles
		game.tileWidth = game.cache.getImage('tile').width;
		game.tileHeight = game.cache.getImage('tile').height;

		//Fundo
		game.add.sprite(0,0,'sky');

		//Física
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.tempoInicio = game.time.now;


	
		game.spacing = 3*game.tileHeight;


		game.itemsSpeed = 150.0;
		game.score = 0;

	}

 function createItems(){
 	game.platforms = game.add.group();
	game.platforms.enableBody = true;
	game.platforms.createMultiple(250,'tile');


	game.coins = game.add.group();
	game.coins.enableBody = true;

	createPlayer();

 }	

 function soundsConfig(){
 	game.hitCoinSound = game.add.audio('hitCoin');
 }


function addTile(x,y){
	var tile = game.platforms.getFirstDead();


	tile.reset(x,y);
	tile.body.velocity.y = game.itemsSpeed;
	tile.body.immovable = true;

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
	 	if(i != passagem ){
	 		addTile(i * game.tileWidth,y);
	 	}else {
	 		addCoin(i*game.tileWidth+(game.tileWidth/4),y);
	 	}
	 }; 
}


function initPlatform(){
	var base = game.world.height - game.tileHeight;
	var topo = game.tileHeight;

	for(var y = base; y >topo - game.tileHeight; y = y - game.spacing){
		addPlataform(y);
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



function createPlayer(){
	game.player = game.add.sprite(game.world.centerX,game.world.height - (game.spacing * 2 + (3 * game.tileHeight)),'player');

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


function showScore(){
	var fontePonto = "100px Arial";

	game.scoreLabel = game.add.text((game.world.centerX),40,"0",{font:fontePonto,fill:"#006699"});
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
	if(game.score % 4 == 0 && game.score <36 ){
		game.delayGeradorPlataforma -= 150;
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
