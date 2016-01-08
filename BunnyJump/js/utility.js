  function Utility(){
  }

  Utility.prototype = {

     createBackGround:function(){
     	var layer1 = game.add.group();
     	layer1.z = 0;

     	var layer2 = game.add.group();
     	layer2.z = 1;

     	var layer3 = game.add.group();
     	layer3.z = 2;

     	var layer4 = game.add.group();
     	layer4.z = 0;
     

     	var bg1 = game.add.sprite(0,0,'bgLayer1');
     	this.fitBackGroundToWorld(bg1);
     	layer1.add(bg1);


     	var bg2 = game.add.sprite(0,0,'bgLayer2');
     	this.fitBackGroundToWorld(bg2);
     	layer2.add(bg2);

     	var bg3 = game.add.sprite(0,0,'bgLayer3');
     	this.fitBackGroundToWorld(bg3);
     	layer3.add(bg3);


     	var bg4 = game.add.sprite(0,0,'bgLayer4');
     	this.fitBackGroundToWorld(bg4);
     	bg4.scale.setTo(0.4);
     	layer4.add(bg3); 	

    },

    fitBackGroundToWorld:function(bgSprite){
     	bgSprite.height = game.height;
    	bgSprite.width = game.width;
     },
     pauseButton:function(){
     	game.pauseButton = game.add.sprite(50,50,'pauseIcon');
  	  game.pauseButton.anchor.setTo(0.5,0.5);
  	  game.pauseButton.align = 'center';


    	game.pauseButton.inputEnabled = true;

    	game.pauseButton.events.onInputUp.add(function(target) {
    		game.paused=true;
    		game.pauseButton.loadTexture('playIcon');
    	})

    	game.input.onDown.add(function(){
    		game.paused=false;
    		game.pauseButton.loadTexture('pauseIcon');
    	});
     },
     showScore:function(){

    	game.scoreCarrot = game.add.sprite((game.width-40),10,'carrotIcon');
    	game.scoreCarrot.scale.setTo(0.6);


      game.scoreLabel = game.add.text((game.width-50),25,"A");
      
      game.scoreLabel.font = 'Revalia';
      game.scoreLabel.fontSize = 25
    	game.scoreLabel.anchor.setTo(0.5,0.5);
    	game.scoreLabel.align = 'center';

     },
     createVisualControls:function(){
     	var gameWidth = game.width;
     	var gameHeight = game.height;

      var leftButtonImage = game.cache.getImage("leftButton");
      var rightButtonImage = game.cache.getImage("rightButton");
      var jumpButtonImage = game.cache.getImage("jumpButton");

     	game.leftButton = game.add.sprite(10,gameHeight - (leftButtonImage.height+30),"leftButton");
     	game.leftButton.scale.setTo(1.5);

     	game.rightButton = game.add.sprite(200,gameHeight-(rightButtonImage.height +30),"rightButton");
     	game.rightButton.scale.setTo(1.5);

     	game.jumpButton = game.add.sprite((gameWidth-(jumpButtonImage.width+30)),(gameHeight-(jumpButtonImage.height+30)),"jumpButton");
     	game.jumpButton.scale.setTo(1.5);

     },
     visualControlsFunctions:function(){

    	[game.leftButton,game.rightButton,game.jumpButton].forEach(function(bt){
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
     	var gameWidth = game.width;
     	var gameHeight = game.height;


     	var finalScoreLabel = game.add.text((gameWidth/2),(gameHeight/3),{font:"50px Arial",fill:"#0000"});
     	finalScoreLabel.text = game.score;

     	var repeatButton = game.add.sprite(gameWidth/2,gameHeight/2,"restartIcon");
     	repeatButton.anchor.setTo(0.5);

     	repeatButton.inputEnabled = true;
     	repeatButton.events.onInputDown.add(function(){
     		playerManager.playerSpeed = 300;
     		game.state.start('Game');
     	});


     }



  }