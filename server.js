

grArr = []
grEatArr=[]
predArr=[]
bombArr=[]
sapArr=[]


var bardz = 40;
var layn = 40;
var grassCount = 20;
var eatGrassCount = 30;
var predatorCount = 10;
var bombCount = 2;
var fireCount = 0;
var sapCount = 6;
var side = 20;
var grs = "#24d121"

 matrix = [];
var Grass = require("./modules/grass.js")
var GrassEat = require("./modules/grassEat.js")
var Predator = require("./modules/predator.js")
var Bomb = require("./modules/bomb.js")
var Fire = require("./modules/fire.js")
var Sapper = require("./modules/sapper.js")
var random = require("./modules/random.js")
function matrixGenerator(matrixSize, grass, grassEat, predator, bomb, sapper) {
   for (let y = 0; y < matrixSize; y++) {
      matrix[y] = [];
      for (let x = 0; x < matrixSize; x++) {
          matrix[y][x] = 0;
      }
   }
   for (var n = 0; n < grass; n++) {
      var x = Math.floor(random(0, matrixSize));
      var y = Math.floor(random(0, matrixSize));
      if (matrix[y][x] == 0) {
         matrix[y][x] = 1;
      }
   }
   for (var n = 0; n < grassEat; n++) {
      var x = Math.floor(random(0, matrixSize));
      var y = Math.floor(random(0, matrixSize));
      if (matrix[y][x] == 0) {
         matrix[y][x] = 2;
      }
   }
   for (var n = 0; n < predator; n++) {
      var x = Math.floor(random(0, matrixSize));
      var y = Math.floor(random(0, matrixSize));
      if (matrix[y][x] == 0) {
         matrix[y][x] = 3;
      }
   }
   /*for (var n = 0; n < bomb; n++) {
       var x = Math.floor(random(0, layn));
       var y = Math.floor(random(0, bardz));
       if (matrix[y][x] == 0) {
           matrix[y][x] = 4;
       }
   }*/
   for (var n = 0; n < sapper; n++) {
      var x = Math.floor(random(0, matrixSize));
      var y = Math.floor(random(0, matrixSize));
      if (matrix[y][x] == 0) {
         matrix[y][x] = 5;
      }
   }
}
matrixGenerator(40, 20, 20, 10, 2, 6);

function creatingObjects() {
   for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[y].length; x++) {
         if (matrix[y][x] == 1) {
            grArr.push(new Grass(x, y))
         }
         if (matrix[y][x] == 2) {
            grEatArr.push(new GrassEat(x, y))
         }
         if (matrix[y][x] == 3) {
            predArr.push(new Predator(x, y))
         }
         /*if (matrix[y][x] == 4) {
             bombArr.push(new Bomb(x, y))
         }*/
         if (matrix[y][x] == 5) {
            sapArr.push(new Sapper(x, y))
         }
         if (matrix[y][x] == 7) {
            fireArr.push(new fireArr(x, y))
         }
      }
   }
   while (grArr.length < 5) {
      var maxX = random(0, matrix[1].length);
      maxX = Math.floor(maxX);
      var maxY = random(0, matrix.length);
      maxY = Math.floor(maxY)
      if (matrix[maxY][maxX] == 0) {
          grArr.push(new Grass(maxX, maxY))
          matrix[maxY][maxX] = 1
      }
  }
  while (predArr.length < 4) {
      var maxX = random(0, matrix[1].length);
      maxX = Math.floor(maxX);
      var maxY = random(0, matrix.length);
      maxY = Math.floor(maxY)
      if (matrix[maxY][maxX] == 0) {
          predArr.push(new Predator(maxX, maxY))
          matrix[maxY][maxX] = 3
      }
  }
  while (grEatArr.length < 6) {
      var maxX = random(0, matrix[1].length);
      maxX = Math.floor(maxX);
      var maxY = random(0, matrix.length);
      maxY = Math.floor(maxY)
      if (matrix[maxY][maxX] == 0) {
          grEatArr.push(new GrassEat(maxX, maxY))
          matrix[maxY][maxX] = 2
      }
  }
  /*while (bombArr.length < bombCount) {
      var maxX = random(0, matrix[1].length);
      maxX = Math.floor(maxX);
      var maxY = random(0, matrix.length);
      maxY = Math.floor(maxY)
      if (matrix[maxY][maxX] == 0) {
          bombArr.push(new Bomb(maxX, maxY))
          matrix[maxY][maxX] = 4
      }
      else if (matrix[maxY][maxX] == 1) {
          bombArr.push(new Bomb(maxX, maxY))
          for (var i in grArr) {
              if (maxX == grArr[i].x && maxY == grArr[i].y) {
                  grArr.splice(i, 1)
              }
          }
          matrix[maxY][maxX] = 4
      }
  }*/
  function burn() {
   var maxX = random(0, matrix[1].length);
   maxX = Math.floor(maxX);
   var maxY = random(0, matrix.length);
   maxY = Math.floor(maxY)
   if (matrix[maxY][maxX] == 0) {
       fireArr.push(new Fire(maxX, maxY))
       matrix[maxY][maxX] = 2
   }
}
var fre = document.getElementById("burn");
fre.addEventListener("click", burn);
}

creatingObjects();

function game (){
   for (var i in grArr) {
      grArr[i].mul()
  }
  for (var i in grEatArr) {
      grEatArr[i].eat()
  }
  for (var i in predArr) {
      predArr[i].eat()
  }
  /*for (var i in bombArr) {
      bombArr[i].explosion()
  }*/
  for (var i in sapArr) {
      sapArr[i].neutralization()
  }
  for (var i in fireArr) {
      fireArr[i].eat()
  }
}










var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF END  --  END



function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grEatArr.push(grassEater);
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grArr.push(grass);

            }
        }
    }
}
creatingObjects();

function game() {
    if (grArr[0] !== undefined) {
        for (var i in grArr) {
            grArr[i].mul();
        }
    }
    if (grEatArr[0] !== undefined) {
        for (var i in grEatArr) {
            grEatArr[i].eat();
        }
    }

    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: 4
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}



setInterval(game, 1000)

