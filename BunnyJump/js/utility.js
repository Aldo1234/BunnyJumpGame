function Utility(game,playerManager){
	this.game = game;
	this.playerManager = playerManager;
}

Utility.prototype = {

   createBackGround:function(){
   	var layer1 = this.game.add.group();
 	layer1.z = 0;

 	var layer2 = this.game.add.group();
 	layer2.z = 1;

 	var layer3 = this.game.add.group();
 	layer3.z = 2;

 	var layer4 = this.game.add.group();
 	layer4.z = 0;
 

 	var bg1 = this.game.add.sprite(0,0,'bgLayer1');
 	this.fitBackGroundToWorld(bg1);
 	layer1.add(bg1);


 	var bg2 = this.game.add.sprite(0,0,'bgLayer2');
 	this.fitBackGroundToWorld(bg2);
 	layer2.add(bg2);

 	var bg3 = this.game.add.sprite(0,0,'bgLayer3');
 	this.fitBackGroundToWorld(bg3);
 	layer3.add(bg3);


 	var bg4 = this.game.add.sprite(0,0,'bgLayer4');
 	this.fitBackGroundToWorld(bg4);
 	bg4.scale.setTo(0.4);
 	layer4.add(bg3); 	

   },

  fitBackGroundToWorld:function(bgSprite){
   	bgSprite.height = game.height;
  	bgSprite.width = game.width;
   },
   pauseButton:function(){
   	this.game.pauseButton = game.add.sprite(50,50,'pauseIcon');
	  this.game.pauseButton.anchor.setTo(0.5,0.5);
	  this.game.pauseButton.align = 'center';


	this.game.pauseButton.inputEnabled = true;

	this.game.pauseButton.events.onInputUp.add(function(target) {
		this.game.paused=true;
		this.game.pauseButton.loadTexture('playIcon');
	})

	this.game.input.onDown.add(function(){
		this.game.paused=false;
		this.game.pauseButton.loadTexture('pauseIcon');
	});
   },
   showScore:function(){

	this.game.scoreCarrot = game.add.sprite((game.width-40),10,'carrotIcon');
	this.game.scoreCarrot.scale.setTo(0.6);

	this.game.scoreLabel = game.add.text((game.width-50),25,"0",{font:"25px Manamansalo",fill:"#000000"});
	this.game.scoreLabel.anchor.setTo(0.5,0.5);
	this.game.scoreLabel.align = 'center';

   },
   createVisualControls:function(){
   	var gameWidth = this.game.width;
   	var gameHeight = this.game.height;

    var leftButtonImage = this.game.cache.getImage("leftButton");
    var rightButtonImage = this.game.cache.getImage("rightButton");
    var jumpButtonImage = this.game.cache.getImage("jumpButton");

   	this.game.leftButton = this.game.add.sprite(10,gameHeight - (leftButtonImage.height+30),"leftButton");
   	this.game.leftButton.scale.setTo(1.5);

   	this.game.rightButton = this.game.add.sprite(200,gameHeight-(rightButtonImage.height +30),"rightButton");
   	this.game.rightButton.scale.setTo(1.5);

   	this.game.jumpButton = this.game.add.sprite((gameWidth-(jumpButtonImage.width+30)),(gameHeight-(jumpButtonImage.height+30)),"jumpButton");
   	this.game.jumpButton.scale.setTo(1.5);

   },
   visualControlsFunctions:function(){

  	[this.game.leftButton,this.game.rightButton,this.game.jumpButton].forEach(function(bt){
  		bt.inputEnabled=true;
  		bt.events.onInputDown.add(function(){
  			bt.isDown = true;
  			console.log(bt.isDown);
  		});
  		bt.events.onInputUp.add(function(){
  			bt.isDown = false;
  			console.log(bt.isDown);
  		});
  	});

   },
   gameOverMenu:function(playerManager){
   	var gameWidth = this.game.width;
   	var gameHeight = this.game.height;


   	var finalScoreLabel = this.game.add.text((gameWidth/2),(gameHeight/3),{font:"50px Arial",fill:"#0000"});
   	finalScoreLabel.text = this.game.score;



   	var repeatButton = this.game.add.sprite(gameWidth/2,gameHeight/2,"restartIcon");
   	repeatButton.anchor.setTo(0.5);

   	repeatButton.inputEnabled = true;
   	repeatButton.events.onInputDown.add(function(){
   		playerManager.playerSpeed = 300;
   		this.game.state.start('Game');
   	});


   }



}