function GameMenu(){

}

GameMenu.prototype = {


	preload:function(){

	}, 

	create:function(){
		game.add.sprite(0,0,'sky');

		game.add.text(game.width/6,game.height/(game.height-100),"Bunny JUMP", {font:'60pt Manamansalo',fill:'white',align:'left'});
		this.createMenuNavigation();

	},

	createMenuNavigation:function(){
		var startOption;

		startOption = game.add.text(game.world.width,game.height/2,'Start',{font:'40pt Manamansalo',fill :'white', align:'left'});

		startOption.inputEnabled = true;

		startOption.events.onInputOver.add(function(target) {
			target.fill = "00000"
		})

		startOption.events.onInputOut.add(function(target) {
			target.fill = "white"
		})

		startOption.events.onInputUp.add(function() { game.state.start("Game")});
	}
	
}