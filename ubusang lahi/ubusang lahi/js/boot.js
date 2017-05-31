bootGame = {
	create:function(){
		game.physics.startSystem(Phaser.Physics.ARCADE);
    	
		game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
    	game.scale.forceLascape = true;
    	game.scale.pageAlignHorizontally = true;
   		game.scale.pageAlignVertically = true;
    	game.world.setBounds(0,0,800,1200);

    	
    	game.state.start("preloadGame");
    	
    	
	},
		update: function () {
   		game.scale.pageAlignVertically = true;
    	game.scale.pageAlignHorizontally = true;
    	game.scale.setShowAll();
    	game.scale.refresh();
	}

}
preloadGame = {
	preload:function(){
	game.load.image('bg','img/bg.png');
    game.load.image("title","img/title.png");
    game.load.image('gameover','img/gameover.png');
    game.load.image('winner','img/winner.png');
    game.load.image('restart','img/restart.png',250,0);
    game.load.image('about1','img/about1.png');
    game.load.image('back','img/back.png');
    game.load.image('platform','img/plat1.png');
    game.load.image('platform1','img/plat2.png');
    game.load.image('platform3','img/plat2-1.png');
    game.load.image('platform4','img/plat3.png');
    game.load.image('platform5','img/plat3-1.png');
    game.load.image('platform6','img/plat2-2.png');
    game.load.image('platform7','img/plat2-3.png');

    game.load.audio('music','audio/kansyon.mp3');
    
    

    game.load.spritesheet('char','img/char.png',87,95);
    game.load.spritesheet("start","img/start.png",250,0);
    game.load.spritesheet("about","img/aboutbut.png",250,0);
    game.load.spritesheet('pauseButton','img/pause.png',50,0);
    game.load.spritesheet('leftButton','img/left.png',90,0);
    game.load.spritesheet('rightButton','img/right.png',90,0);
    game.load.spritesheet('upButton','img/up.png',90,0);
    game.load.spritesheet('downButton','img/down.png',90,0);

    game.load.spritesheet('enemy','img/enemy.png',56,0);
    game.load.spritesheet('enemy2','img/enemy2.png',56,0);
    game.load.spritesheet('enemy3','img/enemy3.png',56,0);
    game.load.spritesheet('enemy4','img/enemy4.png',56,0);
    game.load.spritesheet('enemy5','img/enemy5.png',56,0);
    game.load.spritesheet('enemy6','img/enemy6.png',56,0);
    game.load.spritesheet('enemy7','img/enemy7.png',56,0);
    game.load.spritesheet('enemy8','img/enemy8.png',56,0);
    game.load.spritesheet('enemy9','img/enemy9.png',56,0);
    game.load.spritesheet('enemy10','img/enemy10.png',56,0);


	},
	create:function(){
		game.state.start("menuGame");
	}
}
menuGame = {
	create:function(){
		titlepage = game.add.sprite(0,0, "title");
        startButton = game.add.button(500,400,'start',this.actionOnClick, this);
        aboutButton = game.add.button(500,600,'about',this.aboutOnClick, this);
        //menu = game.add.sprite(100,350,"menu");

	},
	actionOnClick: function(){
        titlepage.visible =! startButton.visible;
        startButton.destroy();
        game.state.start("playGame");

    },
    aboutOnClick: function(){
            aboutpage=game.add.image(0,0,"about1");
            restartButton=game.add.button(50,70,"back",restartB,this);
            function restartB() {
            aboutpage.visible =! restartButton.visible;
            restartButton.destroy();

            game.state.start("menuGame");
            }
           }
}
playGame = {
	create:function(){
	game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
    game.scale.forceLascape = true;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.world.setBounds(0,0,1200,800);
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0,0,'bg');
    player = game.add.sprite(450,700,'char');

    kansyon =game.add.audio("music",1,true);
    kansyon.Loop =true;
    kansyon.play();

    this.countdownTimer(60,1000);


    scoreText = game.add.text(100, 50, 'Score: 0', {fill: '#FFFFFF'})
    textTime = game.add.text(600,50,"Time:  "+time,{fill:'#FFFFFF'});
    gameOverText = game.add.text(w/2-100,h/2-50,"",{fontSize:'32px Arial',fill:"red"});

    platform = game.add.sprite(580,200,"platform");
    game.physics.arcade.enable(platform);
    platform.body.immovable = true;

    platformn = game.add.sprite(100,500,"platform1");
    game.physics.arcade.enable(platformn);
    platformn.scale.y=1
    platformn.body.immovable = true;

    platform3 = game.add.sprite(100,100,"platform3");
    game.physics.arcade.enable(platform3);
    platform3.body.immovable = true;

    platform4 = game.add.sprite(250,390,"platform4");
    game.physics.arcade.enable(platform4);
    platform4.body.immovable = true;

    platform5 = game.add.sprite(800,390,"platform5");
    game.physics.arcade.enable(platform5);
    platform5.body.immovable = true;

    platform6 = game.add.sprite(1050,100,"platform6");
    game.physics.arcade.enable(platform6);
    platform6.body.immovable = true;

    platform7 = game.add.sprite(1050,500,"platform7");
    game.physics.arcade.enable(platform7);
    platform7.body.immovable = true;

    player.animations.add('walk-right',[1,2,3,4],7,true);
    player.animations.add('walk-left',[8,7,6,5],7,true);
    player.animations.add('walk-up',[9,10,11],7,true);
    player.animations.add('walk-down',[13,14,15,16],7,true);


    
    buttonLeft = game.add.button(150,650,"leftButton",this.walkLeft);
    buttonRight = game.add.button(300,650,"rightButton",this.walkRight);
    buttonUp = game.add.button(850,650,"upButton",this.walkUp);
    buttonDown = game.add.button(1000,650,"downButton",this.walkDown);

    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;

    
    
    this.pauseButton = this.game.add.sprite(920, 20, 'pauseButton');
    this.pauseButton.inputEnabled = true;
    this.pauseButton.events.onInputUp.add(function () {this.game.paused = true;},this);
    this.game.input.onDown.add(function () {if(this.game.paused)this.game.paused = false;},this); 

    
    stateText = game.add.text(170,450,' ', { font: '30px Times New Roman', fill: 'black' });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;

    enemy = game.add.sprite(40,500,"enemy");
    game.physics.arcade.enable(enemy);
    enemy.body.collideWorldBounds = true;
    enemy.body.velocity.y=-200;
    enemy.body.bounce.y=1;

    enemy2 = game.add.sprite(150,300,"enemy2");
    game.physics.arcade.enable(enemy2);
    enemy2.body.collideWorldBounds = true;
    enemy2.body.velocity.x=-200;
    enemy2.body.bounce.x=1;

    enemy3 = game.add.sprite(300,50,"enemy3");
    game.physics.arcade.enable(enemy3);
    enemy3.body.collideWorldBounds = true;
    enemy3.body.velocity.x=-200;
    enemy3.body.bounce.x=1;

    enemy4 = game.add.sprite(1000,200,"enemy4");
    game.physics.arcade.enable(enemy4);
    enemy4.body.collideWorldBounds = true;
    enemy4.body.velocity.x=-200;
    enemy4.body.bounce.x=1;    

    enemy5 = game.add.sprite(300,500,"enemy5");
    game.physics.arcade.enable(enemy5);
    enemy5.body.collideWorldBounds = true;
    enemy5.body.velocity.y=-200;
    enemy5.body.bounce.y=1;    


    enemy6 = game.add.sprite(1000,600,"enemy6");
    game.physics.arcade.enable(enemy6);
    enemy6.body.collideWorldBounds = true;
    enemy6.body.velocity.y=-200;
    enemy6.body.bounce.y=1;    


    enemy7 = game.add.sprite(1100,100,"enemy7");
    game.physics.arcade.enable(enemy7);
    enemy7.body.collideWorldBounds = true;
    enemy7.body.velocity.y=-200;
    enemy7.body.bounce.y=1;    


    enemy8 = game.add.sprite(700,500,"enemy8");
    game.physics.arcade.enable(enemy8);
    enemy8.body.collideWorldBounds = true;
    enemy8.body.velocity.x=-200;
    enemy8.body.bounce.x=1;  

    enemy9 = game.add.sprite(800,700,"enemy9");
    game.physics.arcade.enable(enemy9);
    enemy9.body.collideWorldBounds = true;
    enemy9.body.velocity.y=-200;
    enemy9.body.bounce.y=1;    

    enemy10 = game.add.sprite(200,600,"enemy10");
    game.physics.arcade.enable(enemy10);
    enemy10.body.collideWorldBounds = true;
    enemy10.body.velocity.y=-200;
    enemy10.body.bounce.y=1;  
    

},
	update:function(){
	game.scale.pageAlignVertically = true;
    game.scale.pageAlignHorizontally = true;
    game.scale.setShowAll();
    game.scale.refresh();
    
    game.physics.arcade.collide(player,platform);
    game.physics.arcade.collide(player,platformn);
    game.physics.arcade.collide(player,platform3);
    game.physics.arcade.collide(player,platform4);
    game.physics.arcade.collide(player,platform5);
    game.physics.arcade.collide(player,platform6);
    game.physics.arcade.collide(player,platform7);

    game.physics.arcade.collide(enemy,platform);
    game.physics.arcade.collide(enemy,platformn);
    game.physics.arcade.collide(enemy,platform3);
    game.physics.arcade.collide(enemy,platform4);
    game.physics.arcade.collide(enemy,platform5);
    game.physics.arcade.collide(enemy,platform6);
    game.physics.arcade.collide(enemy,platform7);

    game.physics.arcade.collide(enemy10,platform);
    game.physics.arcade.collide(enemy10,platformn);
    game.physics.arcade.collide(enemy10,platform3);
    game.physics.arcade.collide(enemy10,platform4);
    game.physics.arcade.collide(enemy10,platform5);
    game.physics.arcade.collide(enemy10,platform6);
    game.physics.arcade.collide(enemy10,platform7);

    game.physics.arcade.collide(enemy9,platform);
    game.physics.arcade.collide(enemy9,platformn);
    game.physics.arcade.collide(enemy9,platform3);
    game.physics.arcade.collide(enemy9,platform4);
    game.physics.arcade.collide(enemy9,platform5);
    game.physics.arcade.collide(enemy9,platform6);
    game.physics.arcade.collide(enemy9,platform7);

    game.physics.arcade.collide(enemy2,platform);
    game.physics.arcade.collide(enemy2,platformn);
    game.physics.arcade.collide(enemy2,platform3);
    game.physics.arcade.collide(enemy2,platform4);
    game.physics.arcade.collide(enemy2,platform5);
    game.physics.arcade.collide(enemy2,platform6);
    game.physics.arcade.collide(enemy2,platform7);

    game.physics.arcade.collide(enemy4,platform);
    game.physics.arcade.collide(enemy4,platformn);
    game.physics.arcade.collide(enemy4,platform3);
    game.physics.arcade.collide(enemy4,platform4);
    game.physics.arcade.collide(enemy4,platform5);
    game.physics.arcade.collide(enemy4,platform6);
    game.physics.arcade.collide(enemy4,platform7);

    game.physics.arcade.collide(enemy3,platform);
    game.physics.arcade.collide(enemy3,platformn);
    game.physics.arcade.collide(enemy3,platform3);
    game.physics.arcade.collide(enemy3,platform4);
    game.physics.arcade.collide(enemy3,platform5);
    game.physics.arcade.collide(enemy3,platform6);
    game.physics.arcade.collide(enemy3,platform7);

    game.physics.arcade.collide(enemy8,platform);
    game.physics.arcade.collide(enemy8,platformn);
    game.physics.arcade.collide(enemy8,platform3);
    game.physics.arcade.collide(enemy8,platform4);
    game.physics.arcade.collide(enemy8,platform5);
    game.physics.arcade.collide(enemy8,platform6);
    game.physics.arcade.collide(enemy8,platform7);

    game.physics.arcade.collide(enemy5,platform);
    game.physics.arcade.collide(enemy5,platformn);
    game.physics.arcade.collide(enemy5,platform3);
    game.physics.arcade.collide(enemy5,platform4);
    game.physics.arcade.collide(enemy5,platform5);
    game.physics.arcade.collide(enemy5,platform6);
    game.physics.arcade.collide(enemy5,platform7);

    game.physics.arcade.collide(enemy6,platform);
    game.physics.arcade.collide(enemy6,platformn);
    game.physics.arcade.collide(enemy6,platform3);
    game.physics.arcade.collide(enemy6,platform4);
    game.physics.arcade.collide(enemy6,platform5);
    game.physics.arcade.collide(enemy6,platform6);
    game.physics.arcade.collide(enemy6,platform7);


    game.physics.arcade.overlap(player,enemy,this.touchEnemy);
    game.physics.arcade.collide(player,enemy);

    game.physics.arcade.overlap(player,enemy2,this.touchEnemy2);
    game.physics.arcade.collide(player,enemy2);

    game.physics.arcade.overlap(player,enemy3,this.touchEnemy3);
    game.physics.arcade.collide(player,enemy3);
    
    game.physics.arcade.overlap(player,enemy4,this.touchEnemy4);
    game.physics.arcade.collide(player,enemy4);
    
    game.physics.arcade.overlap(player,enemy5,this.touchEnemy5);
    game.physics.arcade.collide(player,enemy5);

    game.physics.arcade.overlap(player,enemy6,this.touchEnemy6);
    game.physics.arcade.collide(player,enemy6);

    game.physics.arcade.overlap(player,enemy7,this.touchEnemy7);
    game.physics.arcade.collide(player,enemy7);

    game.physics.arcade.overlap(player,enemy8,this.touchEnemy8);
    game.physics.arcade.collide(player,enemy8);

    game.physics.arcade.overlap(player,enemy9,this.touchEnemy9);
    game.physics.arcade.collide(player,enemy9);

    game.physics.arcade.overlap(player,enemy10,this.touchEnemy10);
    game.physics.arcade.collide(player,enemy10);
    

},
    countdownTimer:function(){
    setInterval(function(){
        time = time - 1;
        textTime.text = "Time:   "+time;
    },1000);
},
walkLeft:function (){
    buttonLeft.frame = 1;
        player.body.velocity.x = -800;
        player.animations.play('walk-left');
        
    setTimeout(function(){
        buttonLeft.frame = 0;
        player.body.velocity.x = 0;
    },100)
},
    walkRight:function (){
    buttonRight.frame = 1;
        player.body.velocity.x = 800;
        player.animations.play('walk-right');
        
    setTimeout(function(){
        buttonRight.frame = 0;
        player.body.velocity.x = 0;
    },100)
},
walkUp: function() {
        buttonUp.frame = 1;
        player.body.velocity.y = -800;
        player.animations.play('walk-up');
        

        setTimeout(function(){
        buttonUp.frame = 0;
        player.body.velocity.y = 0;
        //player.animations.stop();
        },100)
},
walkDown: function() {
        buttonDown.frame = 1;
        player.body.velocity.y = 800;
        player.animations.play('walk-down');

        setTimeout(function(){
        buttonDown.frame = 0;
        player.body.velocity.y = 0;
        //player.animations.stop();
        },100)
},
    countdownTimer:function(initTime,microsec){
    setInterval(function(){
        initTime--;
        if(initTime>=0){        
            textTime.text = "Time: "+initTime;
        }
        else{
            game._paused = true;
            gamepage=game.add.image(0,0,"gameover");

            kansyon.stop();

        restartButton=game.add.button(520,500,"restart",restartB,this);
        function restartB() {
        gamepage.visible =! restartButton.visible;
        restartButton.destroy();

        window.location.href=window.location.href;
            }
        }
        },microsec);
},

    touchEnemy:function(player,enemy){

        score  += 1;
        scoreText.text = 'Score:  ' + score;
        enemy.kill();

        if(score>=10) {
            game._paused = true;
           winnerpage=game.add.image(0,0,"winner");
           kansyon.stop();
        
            restartButton=game.add.button(520,500,"restart",restartB,this);
            function restartB() {
            winnerpage.visible =! restartButton.visible;
            restartButton.destroy();

            window.location.href=window.location.href;
            }

        }
        
},
    touchEnemy2:function(player,enemy2){

        score  += 1;
        scoreText.text = 'Score:  ' + score;
        enemy2.kill();
        if(score>=10) {
            game._paused = true;
           winnerpage=game.add.image(0,0,"winner");
           kansyon.stop();
        
            restartButton=game.add.button(520,500,"restart",restartB,this);
            function restartB() {
            winnerpage.visible =! restartButton.visible;
            restartButton.destroy();

            window.location.href=window.location.href;
            }

        }

},
    touchEnemy3:function(player,enemy3){

        score  += 1;
        scoreText.text = 'Score:  ' + score;
        enemy3.kill();

        if(score>=10) {
            game._paused = true;
           winnerpage=game.add.image(0,0,"winner");
           kansyon.stop();
        
            restartButton=game.add.button(520,500,"restart",restartB,this);
            function restartB() {
            winnerpage.visible =! restartButton.visible;
            restartButton.destroy();

            window.location.href=window.location.href;
            }

        }
},
touchEnemy4:function(player,enemy4){

        score  += 1;
        scoreText.text = 'Score:  ' + score;
        enemy4.kill();

        if(score>=10) {
            game._paused = true;
           winnerpage=game.add.image(0,0,"winner");
           kansyon.stop();
        
            restartButton=game.add.button(520,500,"restart",restartB,this);
            function restartB() {
            winnerpage.visible =! restartButton.visible;
            restartButton.destroy();

            window.location.href=window.location.href;
            }

        }
},
touchEnemy5:function(player,enemy5){

        score  += 1;
        scoreText.text = 'Score:  ' + score;
        enemy5.kill();

        if(score>=10) {
            game._paused = true;
           winnerpage=game.add.image(0,0,"winner");
           kansyon.stop();
        
            restartButton=game.add.button(520,500,"restart",restartB,this);
            function restartB() {
            winnerpage.visible =! restartButton.visible;
            restartButton.destroy();

            window.location.href=window.location.href;
            }

        }
},
touchEnemy6:function(player,enemy6){

        score  += 1;
        scoreText.text = 'Score:  ' + score;
        enemy6.kill();

        if(score>=10) {
            game._paused = true;
           winnerpage=game.add.image(0,0,"winner");
           kansyon.stop();
        
            restartButton=game.add.button(520,500,"restart",restartB,this);
            function restartB() {
            winnerpage.visible =! restartButton.visible;
            restartButton.destroy();

            window.location.href=window.location.href;
            }

        }
},
touchEnemy7:function(player,enemy7){

        score  += 1;
        scoreText.text = 'Score:  ' + score;
        enemy7.kill();

        if(score>=10) {
            game._paused = true;
           winnerpage=game.add.image(0,0,"winner");
           kansyon.stop();
        
            restartButton=game.add.button(520,500,"restart",restartB,this);
            function restartB() {
            winnerpage.visible =! restartButton.visible;
            restartButton.destroy();

            window.location.href=window.location.href;
            }

        }
},
touchEnemy8:function(player,enemy8){

        score  += 1;
        scoreText.text = 'Score:  ' + score;
        enemy8.kill();

        if(score>=10) {
            game._paused = true;
           winnerpage=game.add.image(0,0,"winner");
           kansyon.stop();
        
            restartButton=game.add.button(520,500,"restart",restartB,this);
            function restartB() {
            winnerpage.visible =! restartButton.visible;
            restartButton.destroy();

            window.location.href=window.location.href;
            }

        }
},
touchEnemy9:function(player,enemy9){

        score  += 1;
        scoreText.text = 'Score:  ' + score;
        enemy9.kill();

        if(score>=10) {
            game._paused = true;
           winnerpage=game.add.image(0,0,"winner");
           kansyon.stop();
        
            restartButton=game.add.button(520,500,"restart",restartB,this);
            function restartB() {
            winnerpage.visible =! restartButton.visible;
            restartButton.destroy();

            window.location.href=window.location.href;
            }

        }
},
touchEnemy10:function(player,enemy10){

        score  += 1;
        scoreText.text = 'Score:  ' + score;
        enemy10.kill();

        if(score>=10) {
            game._paused = true;
           winnerpage=game.add.image(0,0,"winner");
           kansyon.stop();
        
            restartButton=game.add.button(520,500,"restart",restartB,this);
            function restartB() {
            winnerpage.visible =! restartButton.visible;
            restartButton.destroy();

            window.location.href=window.location.href;
            }

        }
},

    restart:function() {
   
    window.location.href=window.location.href;
    stateText.visible = false;
},
loopAudio:function(time){
    setInterval(function(){
        kansyon.play();
    },time)
},
}


winGame = {
	
}
loseGame = {
	
}

