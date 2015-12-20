function Utility(game){
	this.game = game;
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
   	var fontePonto = "25px Manamansalo";

	this.game.scoreCarrot = game.add.sprite((game.width-40),10,'carrotIcon');
	this.game.scoreCarrot.scale.setTo(0.6);

	this.game.scoreLabel = game.add.text((game.width-50),25,"0",{font:fontePonto,fill:"#000000"});
	this.game.scoreLabel.anchor.setTo(0.5,0.5);
	this.game.scoreLabel.align = 'center';

   }


}