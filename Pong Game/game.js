var docCanvas = document.getElementById("gameWindow");
var canvasCon = docCanvas.getContext("2d");

var boardSizeX = 10;
var boardSizeY = 100;

var ballSize = 20;

var ballVelX = 5;
var ballVelY = -5;
var playerOneScore = 0,playerTwoScore = 0;
var score = "0:0";
var checkBoundAlr = false;




class Entity {

  constructor(x,y){
    this.x = x;
     this.y = y;
  }
  MoveBoard(offsetY){
    this.y += offsetY;
  }
 CheckBoundaries(){
   if (this.y >= docCanvas.height  || this.y <= -boardSizeY){
     this.y = this.prevY;
   }
 }

}

class PhysicBall extends Entity{


    CheckBoundaries(){
      if (this.y >= docCanvas.height - ballSize  || this.y <= ballSize){
        ballVelY = -ballVelY;
        //this.y += ballVelY;
        //console.log("CHange Position");

      }

if (this.x >= docCanvas.width){
  this.x = docCanvas.width / 2;
  this.y = 300;
  playerOneScore++;
        UpdateScoreBoard();
}
if (this.x <= 0){
  this.x = docCanvas.width / 2;
  this.y = 300;
  playerTwoScore++;
          UpdateScoreBoard();
}

console.log(playerOneBoard.x);
            if (this.x >= ((playerTwoBoard.x - boardSizeX)) && this.y <= (playerTwoBoard.y + (boardSizeY )) &&
                 this.y >= (playerTwoBoard.y- (boardSizeY / 2))){

                        ballVelX = -ballVelX;


                 }


                 if (this.x <= ((playerOneBoard.x + boardSizeX)) && this.y <= (playerOneBoard.y + (boardSizeY ))  &&
                      this.y >= (playerOneBoard.y -(boardSizeY / 2))){

                             ballVelX = -ballVelX;

                             //console.log("Change");
                      }





    }

    MoveBall(velX,velY){
      this.x += velX;
      this.y += velY;

      this.CheckBoundaries();

      this.prevX = this.x;
      this.prevY = this.y;


    }
}

var playerOneBoard = new Entity(0,300);
var playerTwoBoard = new Entity(docCanvas.width - boardSizeX,300);
var ballEntity = new PhysicBall(docCanvas.width / 2,300);


(function Initialise(){

   setInterval(Ball,10);

})();


function Ball(){


  canvasCon.fillStyle = "grey";
  canvasCon.fillRect(0,0,docCanvas.width,docCanvas.height);
  ballEntity.MoveBall(ballVelX,ballVelY);

  canvasCon.fillStyle = "black";
  canvasCon.fillRect(ballEntity.x,ballEntity.y,ballSize,ballSize);
  RenderBothBoard();
  UpdateScoreBoard();

}

function UpdateScoreBoard(){

    score = playerOneScore + " : " + playerTwoScore;


    canvasCon.fillStyle = "black";
    canvasCon.font = "30px Arial";
    canvasCon.strokeText(score,docCanvas.width / 2 ,50);





}

function RenderBothBoard(){
      canvasCon.fillStyle = "grey";
      canvasCon.fillRect(playerOneBoard.prevX,playerOneBoard.prevY,boardSizeX,boardSizeY);
      canvasCon.fillRect(playerTwoBoard.prevX,playerTwoBoard.prevY,boardSizeX,boardSizeY);

      playerOneBoard.CheckBoundaries();
      playerTwoBoard.CheckBoundaries();

      canvasCon.fillStyle = "black";
      canvasCon.fillRect(playerOneBoard.x,playerOneBoard.y,boardSizeX,boardSizeY);
      canvasCon.fillRect(playerTwoBoard.x,playerTwoBoard.y,boardSizeX,boardSizeY);

      playerOneBoard.prevX = playerOneBoard.x;
      playerOneBoard.prevY = playerOneBoard.y;

      playerTwoBoard.prevX = playerTwoBoard.x;
      playerTwoBoard.prevY = playerTwoBoard.y;
}





document.onkeydown = function(event){

  currentKeyCode = event.keyCode;

  switch(currentKeyCode){
    case 40:
       playerTwoBoard.y += boardSizeY;
       break;
    case 38:
          playerTwoBoard.y -= boardSizeY;
          break;
      case 83:
             playerOneBoard.y += boardSizeY;
             break;
      case 87:
            playerOneBoard.y -= boardSizeY;
            break;


  }

}
