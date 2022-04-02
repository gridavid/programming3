var Grass = require("./modules/grass.js");
var GrassEat = require("./modules/grassEat.js");
var Predator = require("./modules/predator.js");
var Bomb = require("./modules/bomb.js");
var Fire = require("./modules/fire.js");
var Sapper = require("./modules/sapper.js");
var random = require("./modules/random.js");

grArr = [];
grEatArr = [];
predArr = [];
bombArr = [];
sapArr = [];
fireArr = [];

var size = 30;
var grassCount = 10;
var eatGrassCount = 20;
var predatorCount = 10;
var bombCount = 1;
var sapCount = 4;

var mulG = 2;
var mulGE = 10;
var mulP = 4;
var mulB = 20;
var mulS = 5;
var mulF = 5;
var weather = "summer";
var predMul = true;

matrix = [];

function matrixGenerator(matrixSize, grass, grassEat, predator, bomb, sapper) {
  for (let y = 0; y < matrixSize; y++) {
    matrix[y] = [];
    for (let x = 0; x < matrixSize; x++) {
      matrix[y][x] = 0;
    }
  }
  for (let n = 0; n < grass; n++) {
    let x = Math.floor(random(matrixSize));
    let y = Math.floor(random(matrixSize));
    if (matrix[y][x] == 0) {
      matrix[y][x] = 1;
    }
  }
  for (let n = 0; n < grassEat; n++) {
    let x = Math.floor(random(matrixSize));
    let y = Math.floor(random(matrixSize));
    if (matrix[y][x] == 0) {
      matrix[y][x] = 2;
    }
  }
  for (let n = 0; n < predator; n++) {
    let x = Math.floor(random(matrixSize));
    let y = Math.floor(random(matrixSize));
    if (matrix[y][x] == 0) {
      matrix[y][x] = 3;
    }
  }
  for (let n = 0; n < bomb; n++) {
    let x = Math.floor(random(matrixSize));
    let y = Math.floor(random(matrixSize));
    if (matrix[y][x] == 0) {
      matrix[y][x] = 4;
    }
  }
  for (let n = 0; n < sapper; n++) {
    let x = Math.floor(random(matrixSize));
    let y = Math.floor(random(matrixSize));
    if (matrix[y][x] == 0) {
      matrix[y][x] = 5;
    }
  }
}
matrixGenerator(
  size,
  grassCount,
  eatGrassCount,
  predatorCount,
  bombCount,
  sapCount
);

var express = require("express");
var fs = require("fs");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
app.use(express.static("."));
app.get("/", function (req, res) {
  res.redirect("index.html");
});
server.listen(3000);

function creatingObjects() {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 1) {
        grArr.push(new Grass(x, y, mulG));
      }
      if (matrix[y][x] == 2) {
        grEatArr.push(new GrassEat(x, y, mulGE));
      }
      if (matrix[y][x] == 3) {
        predArr.push(new Predator(x, y, mulP));
      }
      if (matrix[y][x] == 4) {
        bombArr.push(new Bomb(x, y, mulB));
      }
      if (matrix[y][x] == 5) {
        sapArr.push(new Sapper(x, y, mulS));
      }
      if (matrix[y][x] == 7) {
        fireArr.push(new Fire(x, y, mulF));
      }
    }
  }
}

//actions with buttons
io.on("connection", function (socket) {
  creatingObjects();
  socket.on("kill", kill);
  socket.on("season", season);
  socket.on("burn", burn);
});

function season(num) {
  if (num == 1) {
    weather="spring";
    //grass in spring
    for (let i = 0; i < grArr.length; i++) {
      grArr[i].mulK = 1;
    }
    mulG = 1;
    //grasseater in spring
    for (let i = 0; i < grEatArr.length; i++) {
      grEatArr[i].mulK = 7;
    }
    mulGE = 7;
    //predator in spring
    predMul = true;
    for (let i = 0; i < predArr.length; i++) {
      predArr[i].mulK = 3;
    }
    mulP = 3;
    //bomb in spring
    for (let i = 0; i < bombArr.length; i++) {
      bombArr[i].mulK = 20;
    }
    mulB = 20;
  } else if (num == 2) {
    weather="summer";
    //grass in summer
    for (let i = 0; i < grArr.length; i++) {
      grArr[i].mulK = 2;
    }
    mulG = 2;
    //grasseater in summer
    for (let i = 0; i < grEatArr.length; i++) {
      grEatArr[i].mulK = 10;
    }
    mulGE = 10;
    //predator in summer
    predMul = true;
    for (let i = 0; i < predArr.length; i++) {
      predArr[i].mulK = 4;
    }
    mulP = 4;
    //bomb in summer
    for (let i = 0; i < bombArr.length; i++) {
      bombArr[i].explosion();
    }
    mulB = 4;
  } else if (num == 3) {
    weather="autumn";
    //grass in autumn
    for (let i = 0; i < grArr.length; i++) {
      grArr[i].mulK = 6;
    }
    mulG = 6;

    //grasseater in autumn
    for (let i = 0; i < grEatArr.length; i++) {
      grEatArr[i].mulK = 16;
    }
    mulGE = 16;
    //predator in autumn
    predMul = true;
    for (let i = 0; i < predArr.length; i++) {
      predArr[i].mulK = 8;
    }
    mulP = 8;
    //bomb in autumn
    for (let i = 0; i < bombArr.length; i++) {
      bombArr[i].mulK = 20;
    }
    mulB = 20;
  } else if (num == 4) {
    weather="winter";
    //grass in winter
    for (let i = 0; i < grArr.length; i++) {
      grArr[i].mulK = 16;
    }
    mulG = 16;

    //grasseater in winter
    for (let i = 0; i < grEatArr.length; i++) {
      grEatArr[i].mulK = 1000;
    }
    mulGE = 1000;
    //predator in winter
    for (let i = 0; i < predArr.length; i++) {
      predArr[i].die();
    }
    predMul = false;
    //bomb in winter
    for (let i = 0; i < bombArr.length; i++) {
      bombArr[i].mulK = 1000;
    }
    mulB = 1000;
    //sapper in winter
    for (let i = 0; i < sapArr.length; i++) {
      matrix[sapArr[i].y][sapArr[i].x] = 0;
    }
    sapArr = [];
    //fire in winter
    for (let i = 0; i < fireArr.length; i++) {
      matrix[fireArr[i].y][fireArr[i].x] = 0;
    }
    fireArr = [];
  }
}

//kills all the creatures on the matrix
function kill() {
  for (let i = 0; i < grArr.length; i++) {
    matrix[grArr[i].y][grArr[i].x] = 0;
  }
  grArr = [];
  for (let i = 0; i < grEatArr.length; i++) {
    matrix[grEatArr[i].y][grEatArr[i].x] = 0;
  }
  grEatArr = [];
  for (let i = 0; i < predArr.length; i++) {
    matrix[predArr[i].y][predArr[i].x] = 0;
  }
  predArr = [];
  for (let i = 0; i < bombArr.length; i++) {
    matrix[bombArr[i].y][bombArr[i].x] = 0;
  }
  bombArr = [];
  for (let i = 0; i < sapArr.length; i++) {
    matrix[sapArr[i].y][sapArr[i].x] = 0;
  }
  sapArr = [];
  for (let i = 0; i < fireArr.length; i++) {
    matrix[fireArr[i].y][fireArr[i].x] = 0;
  }
  fireArr = [];
}

function burn() {
  while (fireArr.length < 1 && predMul == true) {
    let maxX = Math.floor(random(matrix[1].length));
    let maxY = Math.floor(random(matrix.length));

    if (matrix[maxY][maxX] == 1) {
      fireArr.push(new Fire(maxX, maxY, mulF));
      for (let i = 0; i < grArr.length; i++) {
        if (grArr[i].x == maxX && grArr[i].y == maxY) {
          grArr.splice(i, 1);
          break;
        }
      }
      matrix[maxY][maxX] = 2;
    }
  }
}

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
  if (predArr[0] !== undefined) {
    for (var i in predArr) {
      predArr[i].eat();
    }
  }
  if (bombArr[0] !== undefined) {
    for (var i in bombArr) {
      bombArr[i].wait();
    }
  }
  if (sapArr[0] !== undefined) {
    for (var i in sapArr) {
      sapArr[i].neutralization();
    }
  }
  if (fireArr[0] !== undefined) {
    for (var i in fireArr) {
      fireArr[i].eat();
    }
  }
  //bomb generator
  while (grArr.length > 120 && bombArr.length < 2) {
    let maxX = Math.floor(random(matrix[1].length));
    let maxY = Math.floor(random(matrix.length));

    if (matrix[maxY][maxX] == 0) {
      bombArr.push(new Bomb(maxX, maxY, mulB));
      matrix[maxY][maxX] = 4;
    }
  }
  //grass
  while (grArr.length < 2) {
    let maxX = Math.floor(random(matrix[1].length));
    let maxY = Math.floor(random(matrix.length));

    if (matrix[maxY][maxX] == 0) {
      grArr.push(new Grass(maxX, maxY, mulG));
      matrix[maxY][maxX] = 1;
    }
  }
  //grass eater
  while (grEatArr.length < 2) {
    let maxX = Math.floor(random(matrix[1].length));
    let maxY = Math.floor(random(matrix.length));

    if (matrix[maxY][maxX] == 0) {
      grEatArr.push(new GrassEat(maxX, maxY, mulGE));
      matrix[maxY][maxX] = 2;
    }
  }
  //predator
  while (predArr.length < 2 && grEatArr.length > 6 && predMul == true) {
    let maxX = Math.floor(random(matrix[1].length));
    let maxY = Math.floor(random(matrix.length));

    if (matrix[maxY][maxX] == 0) {
      predArr.push(new Predator(maxX, maxY, mulP));
      matrix[maxY][maxX] = 3;
    }
  }
  //sapper
  while (sapArr.length < 3 && predMul == true) {
    let maxX = Math.floor(random(matrix[1].length));
    let maxY = Math.floor(random(matrix.length));

    if (matrix[maxY][maxX] == 0) {
      sapArr.push(new Sapper(maxX, maxY, mulS));
      matrix[maxY][maxX] = 5;
    }
  }
  let sendData = {
    matrix: matrix,
    season: weather
  };

  //! Send data over the socket to clients who listens "data"
  io.sockets.emit("data", sendData);
}

setInterval(game, 250);

var statistics = {};

setInterval(function () {
  statistics.grass = grArr.length;
  statistics.grassEater = grEatArr.length;
  statistics.predator = predArr.length;
  statistics.bomb = bombArr.length;
  statistics.sapper = sapArr.length;
  statistics.fire = fireArr.length;

  fs.writeFile("statistics.json", JSON.stringify(statistics), function () {});
}, 500);

console.log("server is running on port 3000. To stop it, press 'ctrl+c'");
