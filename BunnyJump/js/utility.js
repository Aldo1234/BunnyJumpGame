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
     audioHandlerButton:function(){
      if(GAME_AUDIO_ON){
        game.audioButton = game.add.sprite(50,150,'audioOnIcon');
      }else{
        game.audioButton = game.add.sprite(50,150,'audioOffIcon');
      }
      game.audioButton.anchor.setTo(0.5);

      game.audioButton.inputEnabled = true;

      game.audioButton.events.onInputDown.add(function(){
        if(GAME_AUDIO_ON){
          game.audioButton.loadTexture('audioOffIcon');
          GAME_AUDIO_ON = false;
          //TODO
        }else{
          game.audioButton.loadTexture('audioOnIcon');
          GAME_AUDIO_ON = true;
        }
      })
     },
     showScore:function(){

    	game.scoreCarrot = game.add.sprite((game.width-40),10,'carrotIcon');
    	game.scoreCarrot.scale.setTo(0.6);


      game.scoreLabel = game.add.text((game.width-60),25,"0");
      game.scoreLabel.font = 'manamansalo';
      game.scoreLabel.fontSize = "40px";



     },
     createVisualControls:function(){
     	var gameWidth = game.width;
     	var gameHeight = game.height;

      var leftButtonImage = game.cache.getImage("leftButton_up");
      var rightButtonImage = game.cache.getImage("rightButton_up");
      var jumpButtonImage = game.cache.getImage("jumpButton_up");

     	game.leftButton = game.add.sprite(10,gameHeight - ((leftButtonImage.height*1.5)+30),"leftButton_up");
     	game.leftButton.scale.setTo(2);

     	game.rightButton = game.add.sprite(200,gameHeight-((rightButtonImage.height*1.5) +30),"rightButton_up");
     	game.rightButton.scale.setTo(2);

     	game.jumpButton = game.add.sprite((gameWidth-((jumpButtonImage.width*1.5)+30)),(gameHeight-((jumpButtonImage.height*1.5)+30)),"jumpButton_up");
     	game.jumpButton.scale.setTo(2);

     },
     visualControlsFunctions:function(){


    	[game.leftButton,game.rightButton,game.jumpButton].forEach(function(bt){
    		bt.inputEnabled=true;
    		bt.events.onInputDown.add(function(){
          var imageStringUp =  bt.key;
          imageStringUp = imageStringUp.replace('_up',"_down");
          bt.loadTexture(imageStringUp);

    			bt.isDown = true;
    			console.log(bt.isDown);
    		});
    		bt.events.onInputUp.add(function(){
          var imageStringDown = bt.key;
          imageStringDown = imageStringDown.replace('_down','_up');
          bt.loadTexture(imageStringDown)

    			bt.isDown = false;
    			console.log(bt.isDown);
    		});
    	});
     },
     gameOverMenu:function(playerManager,higher){ 
     	var gameWidth = game.width;
     	var gameHeight = game.height;

      //Questões de alinhamento
      if(game.score >= 10){
        scoreLabelX = gameWidth/2.1;
      }else{
        scoreLabelX = gameWidth/2;
      }

     	var finalScoreLabel = game.add.text(scoreLabelX,-1);
      finalScoreLabel.font = "manamansalo";
      finalScoreLabel.fontSize = "120px";
     	finalScoreLabel.text = game.score;
      if(higher){
        finalScoreLabel.fill = "#22b14c";
      }else{
        finalScoreLabel.fill = "#5c5c3d";
      }

      var finalScoreLabelTween = game.add.tween(finalScoreLabel).to({y:gameHeight/6},800,Phaser.Easing.Bounce.Out,true)

     	var repeatButton = game.add.sprite(gameWidth/2.5,gameHeight/2,"restartIcon");
     	repeatButton.anchor.setTo(0.5);
      game.add.tween(repeatButton.scale).to({x:2.8,y:2.8},100,Phaser.Easing.Linear.In,true).to({x:1.8,y:1.8},250,Phaser.Easing.Linear.In,true);

      var exitButton = game.add.sprite(gameWidth/1.6 ,gameHeight/2,'concedeIcon');
      exitButton.anchor.setTo(0.5);
      game.add.tween(exitButton.scale).to({x:2.8,y:2.8},100,Phaser.Easing.Linear.In,true).to({x:1.5,y:1.5},250,Phaser.Easing.Linear.In,true);

     	repeatButton.inputEnabled = true;
     	repeatButton.events.onInputDown.add(function(){
     		playerManager.playerSpeed = 300;
        if(GAME_AUDIO_ON){
         game.pressButton.play();
        }
     		game.state.start('Game');
     	});


      exitButton.inputEnabled = true;
      exitButton.events.onInputDown.add(function(){
        if(GAME_AUDIO_ON){
          game.pressButton.play();
        }
        game.state.start('GameMenu');
      })
     }
  }