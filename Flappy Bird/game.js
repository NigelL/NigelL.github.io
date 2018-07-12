var canvasDivWindow = document.getElementById('gameWindow');
var canvas = canvasDivWindow.getContext('2d');


var fbX,fbY,fbSX = 20,fbSY = 20,fbVx,fbVy = 10,wallOffX=500,wallOffY=0;
var initialX;
var wallCount = 10;
var walls = [];
var lerpTime = 0;
var lastWallCounter = (wallCount / 2) - 1;
var score = 0,scored = false;
(function Initialise(){
         fbX = 200;
         initialX = 200;
         fbY = 350;
         for (var i = 0 ; i < (wallCount / 2);i++){
              var sizeY = Math.floor((Math.random() * 300) + 100);
               walls.push([(i * wallOffX) + wallOffX, wallOffY,sizeY]);
               walls.push([(i * wallOffX) + wallOffX, wallOffY + sizeY + 200,(canvasDivWindow.height - sizeY - 200)]);
         }
         setInterval(FlappyBirdMovement,10);
         //setInterval(DrawFlappyBird,10);
        // setInterval(GenerateWalls,10);

})();

function Reset(){
     canvas.fillStyle = 'grey';
     canvas.fillRect(0,0,canvasDivWindow.width,canvasDivWindow.height);
     score = 0;
     scored = false;
      fbY = 350;
      walls = [];
      for (var i = 0 ; i < (wallCount / 2);i++){
           var sizeY = Math.floor((Math.random() * 300) + 100);
            walls.push([(i * wallOffX) + wallOffX, wallOffY,sizeY]);
            walls.push([(i * wallOffX) + wallOffX, wallOffY + sizeY + 200,(canvasDivWindow.height - sizeY - 200)]);
      }
      GenerateWalls();

  }
function GenerateWalls(){




    for (var i = 0 ;i < wallCount ; i += 2){
      //console.log(walls[i][0]);
         if ( walls[i][0] <= -100){
               scored = false;
               var sizeY = Math.floor((Math.random() * 300) + 100);
               walls[i][0] = (lastWallCounter * wallOffX) + wallOffX;
               walls[i][1] = wallOffY;
               walls[i][2] = sizeY;

               walls[i + 1][0] = (lastWallCounter * wallOffX) + wallOffX;
               walls[i + 1][1] =  wallOffY + sizeY + 200;
               walls[i + 1][2] = (canvasDivWindow.height - sizeY - 200);
               //lastWallCounter++;
         }
                walls[i][0] -= 2;
                walls[i + 1][0] -=2 ;
              if (initialX >= walls[i][0] && initialX <= walls[i][0] + 100 && fbY >= walls[i][1] && fbY <= walls[i][2]){
                Reset();
              }
              if (initialX >= walls[i + 1][0] && initialX <= walls[i + 1][0] + 100 && fbY >= walls[i + 1][1] && fbY <= canvasDivWindow.height){
                Reset();
              }
              if (initialX >= walls[i][0] && !scored){
                 score++;
                 scored = true;
              }
                canvas.fillStyle = 'black';
                canvas.fillRect(walls[i][0],walls[i][1],100,walls[i][2]);
                canvas.fillRect(walls[i + 1][0],walls[i + 1][1],100,walls[i + 1][2]);
    }

}

function lerp(a,b,t){
   return (((1 - t) * a) + b*t);
}

function FlappyBirdMovement(){

      fbY+=fbVy;
      if (fbY > canvasDivWindow.height || fbY < 0){
        Reset();
      }
      lerpTime += 0.0005;
      if (lerpTime >= 1){
        lerpTime = 0;
      }
      fbVy = lerp(fbVy,10,lerpTime);
      DrawFlappyBird();
      GenerateWalls();
      canvas.fillStyle = "yellow";
      canvas.font = "20px Arial";
      canvas.fillText(score,30,30);
      //console.log("Vel Y : " + fbVy + "Lerp : " + lerpTime);
}


function DrawFlappyBird(){
     canvas.fillStyle = 'grey';
     canvas.fillRect(0,0,canvasDivWindow.width,canvasDivWindow.height);

     canvas.fillStyle = 'yellow';
     canvas.fillRect(initialX,fbY,fbSX,fbSY);



}
document.onkeydown = function(event){
     currentKeyCode = event.keyCode;
     if (currentKeyCode == 32){
          lerpTime = 0;
          fbVy=-5;
     }
}
