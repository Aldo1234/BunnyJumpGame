function Splash (){

}


Splash.prototype = {
	

	preload:function(){
		var logo,loadingBar,status;

		game.add.sprite(0,0,'sky');
		loadingBar = game.add.sprite(game.world.centerX,400,"loadingBar");

		logo = game.add.sprite(game.world.centerX,game.world.centerY/5,"coelhoLogo");

		status = game.add.text(game.world.centerX,380,'Loading...',{fill:'white'});

		gameUtils.centerObjects([logo,status]);


		this.load.setPreloadSprite(loadingBar);
	},
}