


var game = new Phaser.Game(700,500,Phaser.AUTO,'game_div');
var score = 0 ; 
name = 'amiteb' ;

var load_state={
preload:function(){
this.game.stage.backgroundColor='rbga(0,0,0,0.5)';
this.game.load.image('gameOver_image','assets/gameOver.png');
        this.game.load.image('ground','assets/tile.png');
		this.game.load.image('bird','assets/bird1.png');
		this.game.load.image('background','assets/background.png');
		this.game.load.image('background1','assets/background1.png');	
		this.game.load.image('score_image','assets/score.png');
		this.game.load.image('pipe','assets/pipe.png');
		this.game.load.audio('jump', 'assets/jump.wav');
		
		// hero images 
		this.game.load.image('amiteb','images/amiteb.png');
		this.game.load.image('akshey','images/akshey.png');
		this.game.load.image('ameer','images/ameer.png');
		this.game.load.image('catrina','images/catrina.png');
		this.game.load.image('runvier','images/runvier.png');
		this.game.load.image('sheruk','images/sheruk.png');
		this.game.load.image('sulmen','images/sulmen.png');
		this.game.load.image('sunni','images/sunni.png');
	},
create:function(){
this.game.state.start('menu');
	}
};

var menu_state={
create: function() {
        
        var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space_key.onDown.add(this.start, this); 

      
        var style = { font: "30px Arial", fill: "#ffffff" };
        var x = game.world.width/2, y = game.world.height/2;
        
  
        var text = this.game.add.text(x, y-50, "Press space to start", style);
        text.anchor.setTo(0.5, 0.5); 

        
        if (score > 0) {
			var score_label = this.game.add.text(x, y+50, "score: " + score, style);
            score_label.anchor.setTo(0.5, 0.5); 
        }
    },
	  start: function() {
        this.game.state.start('play');
		document.getElementById('leaderboard_score').style.display="none";
		document.getElementById('leaderboard_text').style.display="none";
		document.getElementById('leader_board').style.display="none";
    }

};

var play_state = {


    create: function() { 
					
        var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space_key.onDown.add(this.jump, this); 
		this.game.add.sprite(5,5,'score_image');
		var bgNum = Math.floor(Math.random()*2);			//Load background randomly
		if(bgNum==0){
				
				this.game.add.sprite(0,0,'background');
			}
		
		else{
			this.game.add.sprite(0,0,'background1');
			}
			

        this.pipes = game.add.group();
        this.pipes.createMultiple(40, 'pipe');  
        this.timer = this.game.time.events.loop(1300, this.add_row_of_pipes, this);           

        this.bird = this.game.add.sprite(150, 245, name);
        this.bird.body.gravity.y = 1000; 
        this.bird.anchor.setTo(-0.2, 0.5);
		
		this.ground = game.add.tileSprite(0, game.world.height-64, game.world.width,64,'ground');
        this.ground.tileScale.setTo(1, 1);
        
        this.game.add.sprite(5,5,'score_image');

		this.score = 0;
		var style = {font:'20px Arial',fill:'#000000'};
		this.label_score = this.game.add.text(50,45,"0",style);

        this.jump_sound = this.game.add.audio('jump');
    },

    update: function() {
	
        if (this.bird.inWorld == false)
            this.display_score(); 

        if (this.bird.angle < 20)
            this.bird.angle += 1;
		this.ground.tilePosition.x -= 1.5;
        this.game.physics.overlap(this.bird, this.pipes, this.hit_pipe, null, this);      
    },

    jump: function() {
        if (this.bird.alive == false)
            return; 

        this.bird.body.velocity.y = -350;
        this.game.add.tween(this.bird).to({angle: -20}, 100).start();
        this.jump_sound.play();
    },

    hit_pipe: function() {
        if (this.bird.alive == false)
            return;

        this.bird.alive = false;
        this.game.time.events.remove(this.timer);

        this.pipes.forEachAlive(function(p){
            p.body.velocity.x = 0;
        }, this);
    },

    restart_game: function() {
        this.game.time.events.remove(this.timer);

        // This time we go back to the 'menu' state
        this.game.state.start('menu');
    },

    add_one_pipe: function(x, y) {
        var pipe = this.pipes.getFirstDead();
        pipe.reset(x, y);
        pipe.body.velocity.x = -200; 
        pipe.outOfBoundsKill = true;
    },

    add_row_of_pipes:function(){
		var hole=Math.floor(Math.random()*5)+1;
		for(var i=0;i<=8;i++)
		{
			if (i != hole && i != hole +1 && i!=hole-1)
				this.add_one_pipe(800,i*60 );
		}
		this.score+=1;
		this.label_score.content= this.score;
	},
		
		display_score:function(){


		this.game.time.events.remove(this.timer);
		  this.pipes.forEachAlive(function(p){
        	p.body.velocity.x = 0;
    		}, this)
			

		this.ground.tilePosition.x =0;

		var text = " : "+this.score;
		var text_1 = " : "+ this.high_score();
		var style = { font: "25px Arial",fill:"#08088A",align:"center"};
		this.game.add.sprite(200,150,'gameOver_image');

		
		this.game.add.text(420,220,text,style);
		this.game.add.text(420,260,text_1,style);
		 var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space_key.onDown.add(this.restart_game, this); 
		
	},
	high_score : function(){
      //if(localStorage.getItem("namo")<this.score)
      localStorage.setItem("namo",this.score);
		score= parseInt(localStorage.getItem("namo"));
     return localStorage.getItem("namo") ;

    },
};



game.state.add('load',load_state);
game.state.add('menu',menu_state);
game.state.add('play',play_state);
game.state.start('load');