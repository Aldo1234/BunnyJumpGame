function PlayerManager(game){
	this.game=game;
	this.playerSpeed = 300;
	this.player = null;
}

PlayerManager.prototype = {

		createPlayer:function(x,y){
			this.player = this.game.add.sprite(game.world.centerX,game.world.height - (game.spacing * 2 + (3 * game.tileHeight)),'player');
			this.player.scale.setTo(0.8);

			this.player.anchor.setTo(0.5,1.0);

			game.physics.arcade.enable(this.player);

			this.player.body.gravity.y = 2000;
			this.player.body.collideWorldBounds = true;

			this.player.body.bounce.y = 0.2;


			this.createAnimations();


		},
		createAnimations:function(){
			this.player.animations.add('andarEsquerda',[0,1],10,true);
			this.player.animations.add('andarDireita',[3,4],10,true);
		},
		jump:function(){
			this.player.body.velocity.y = -1200;
			this.player.frame = 0;
		},
		goLeft:function(){
			this.player.body.velocity.x = -this.playerSpeed;
			this.player.animations.play('andarEsquerda')
		},
		goRight:function(){
			this.player.body.velocity.x = +this.playerSpeed;
			this.player.animations.play('andarDireita');
		},
		stop:function(){
			this.player.animations.stop();
			this.player.frame=2;
			this.player.body.velocity.x = 0;
		}

}