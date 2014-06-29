//App42.initialize("cb02bc92584055c1aa1f92090cacc021b8fd9d292658442e5d4a839968005414",
  //"d39116ad32971882e4ccfd856a14837e910c1e4b7d0f8fc0cd080bae0b58f9ae");

App42.initialize("08625de91ce557a154fcc39b5c1ce24ed9fc574b23d37f47d0238926e05d28c3",
  "162fd46b424e5dc1c017ff85820c9bc6adc27c138c5a67a3847c5009cbecae0f");   

var gameService  = new App42Game();  
var scoreBoardService  = new App42ScoreBoard();  
var scoreService  = new App42Score();  
var rewardService  = new App42Reward(); 
var storageService  = new App42Storage();   

var gameName = "SloppySingers",  description = "S", result ;    


	
  var userName = localStorage.getItem('uName');
 var gameScore = parseInt(localStorage.getItem("namo"));
  
	
  var scoreList; 


scoreBoardService.getTopRankings(gameName,{    
    success: function(object)   
    {    document.getElementById('leaderboard_text').innerHTML="";
	document.getElementById('leaderboard_score').innerHTML="";
	
        var game = JSON.parse(object);    
        result = game.app42.response.games.game;  
        console.log("gameName is : " + result.name)  
         scoreList = result.scores.score;  
        
		for(var i=0;i<9;i++)  
        {  
            console.log("userName is : " + scoreList[i].userName)  
            console.log("scoreId is : " + scoreList[i].scoreId)  
            console.log("value is : " + scoreList[i].value)  
			var k=i+1;
			document.getElementById('leaderboard_text').innerHTML+=k+"&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp	" +scoreList[i].userName+"&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp           "+"<br>";
			document.getElementById('leaderboard_score').innerHTML+=scoreList[i].value+"<br>";

		}
			
		
    },	
    error: function(error) {    
    }
});  


  function saveScore(){ 
  gameScore = score;
  if(score>scoreList[9].value) {
  scoreBoardService.saveUserScore(gameName,userName,gameScore,{  
    success: function(object) 
    {  
      console.log(object);
      var game = JSON.parse(object);  
      result = game.app42.response.games.game;
      console.log("Saving Score: " + result.name);
      var scoreList = result.scores.score;
      console.log("userName is : " + scoreList.userName);
      console.log("scoreId is : " + scoreList.scoreId);
      console.log("value is : " + scoreList.value);
      console.log("gamescore is:"+ score);
    },  
    error: function(error) {  
      console.log(error);
    }  
  }); 
  }
  else{
  console.log("Sorry , You couldn't make into top 10 !");
  $.blockUI({ 
            message: $('div.growlUI1'), 
            fadeIn: 700, 
            fadeOut: 700, 
            timeout: 4000, 
            showOverlay: false, 
            centerY: false, 
            css: { 
                width: '270px', 
                top: '10px', 
                
                left: '78%', 
                border: 'none', 
                padding: '5px', 
                backgroundColor: '#000', 
                '-webkit-border-radius': '10px', 
                '-moz-border-radius': '10px', 
                opacity: .6, 
                color: '#fff' 
            } 
        }); 
  }
  
 }  




   