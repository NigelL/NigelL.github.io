var canvasDivWindow = document.getElementById('gameWindow');
var canvas = canvasDivWindow.getContext('2d');

var sizeX = 200,sizeY=100,initialY;
var startY = canvasDivWindow.height - sizeY;
var offsetX = 20,moveX = 0;
var stacks = [];
var score = 0,scored = false;
(function Initialise(){
     initialY = sizeY;
     setInterval(Stack,20);

})();



function Stack(){
   startY = canvasDivWindow.height - sizeY;



   canvas.fillStyle = "grey";
   canvas.fillRect(0,0,canvasDivWindow.width,canvasDivWindow.height);
   if (stacks.length == 0){
     canvas.strokeStyle = "yellow";
     canvas.strokeRect(canvasDivWindow.width / 2,startY,sizeX,sizeY);
   }

   moveX += 10;
   if (moveX > canvasDivWindow.width){
     moveX = 0;
   }
   canvas.fillStyle = "black";
   canvas.fillRect(moveX , startY - ((stacks.length) * sizeY),sizeX,sizeY);

   for (var i = 0; i < stacks.length;i++){
       stacks[i] = (startY - (sizeY * i));
console.log("I : " + i + "Offset : " + (stacks[i]));
       canvas.fillStyle = "black";
       canvas.fillRect(canvasDivWindow.width / 2 , stacks[i],sizeX,sizeY);
   }


}

function RenderStack(){

}

document.onkeydown = function(event){
     currentKeyCode = event.keyCode;
     if (currentKeyCode == 32){
         if (moveX >= ((canvasDivWindow.width / 2) - (sizeX / 5)) && moveX <= (canvasDivWindow.width / 2) + (sizeX / 5)){
          stacks.push(startY);

        }else{
          stacks = [];
        }
        if (stacks.length > Math.floor(canvasDivWindow.height / sizeY)){
            stacks = [];
        }
     }
}
