var Grass = require("./modules/grass.js")
var GrassEat = require("./modules/grassEat.js")
var Predator = require("./modules/predator.js")
var Bomb = require("./modules/bomb.js")
var Fire = require("./modules/fire.js")
var Sapper = require("./modules/sapper.js")
var random = require("./modules/random.js")

grArr = []
grEatArr = []
predArr = []
bombArr = []
sapArr = []
fireArr = []


var size = 30;
var grassCount = 10;
var eatGrassCount = 20;
var predatorCount = 10;
var bombCount = 1;
var sapCount = 6;

matrix = [];

function matrixGenerator(matrixSize, grass, grassEat, predator, bomb, sapper) {
    for (let y = 0; y < matrixSize; y++) {
        matrix[y] = [];
        for (let x = 0; x < matrixSize; x++) {
            matrix[y][x] = 0;
        }
    }
    for (var n = 0; n < grass; n++) {
        var x = Math.floor(random(matrixSize));
        var y = Math.floor(random(matrixSize));
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1;
        }
    }
    for (var n = 0; n < grassEat; n++) {
        var x = Math.floor(random(matrixSize));
        var y = Math.floor(random(matrixSize));
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2;
        }
    }
    for (var n = 0; n < predator; n++) {
        var x = Math.floor(random(matrixSize));
        var y = Math.floor(random(matrixSize));
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3;
        }
    }
    for (var n = 0; n < bomb; n++) {
        var x = Math.floor(random(matrixSize));
        var y = Math.floor(random(matrixSize));
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4;
        }
    }
    for (var n = 0; n < sapper; n++) {
        var x = Math.floor(random(matrixSize));
        var y = Math.floor(random(matrixSize));
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5;
        }
    }
}
matrixGenerator(size, grassCount, eatGrassCount, predatorCount, bombCount, sapCount);

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

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
            if (matrix[y][x] == 4) {
                bombArr.push(new Bomb(x, y))
            }
            if (matrix[y][x] == 5) {
                sapArr.push(new Sapper(x, y))
            }
            if (matrix[y][x] == 7) {
                fireArr.push(new Fire(x, y))
            }
        }
    }
}



//--------- I should check this out later ---------

/*while (grArr.length < 5) {
   let maxX = Math.floor(random(matrix[1].length));
   let maxY = Math.floor(random(matrix.length));

   if (matrix[maxY][maxX] == 0) {
       grArr.push(new Grass(maxX, maxY))
       matrix[maxY][maxX] = 1
   }
}
while (predArr.length < 4) {
   let maxX = Math.floor(random(matrix[1].length));
   let maxY = Math.floor(random(matrix.length));
   if (matrix[maxY][maxX] == 0) {
       predArr.push(new Predator(maxX, maxY))
       matrix[maxY][maxX] = 3
   }
}
while (grEatArr.length < 6) {
   let maxX = Math.floor(random(matrix[1].length));
   let maxY = Math.floor(random(matrix.length));
   if (matrix[maxY][maxX] == 0) {
       grEatArr.push(new GrassEat(maxX, maxY))
       matrix[maxY][maxX] = 2
   }
}*/


creatingObjects();

function burn() {
    let maxX = Math.floor(random(matrix[1].length));
    let maxY = Math.floor(random(matrix.length));

    if (matrix[maxY][maxX] == 0) {
        fireArr.push(new Fire(maxX, maxY))
        matrix[maxY][maxX] = 2
    }
}

//var fre = document.getElementById("burn");
//fre.addEventListener("click", burn);


function game() {
    if (grArr[0] !== undefined) {
        for (var i in grArr) {
            grArr[i].mul()
        }
    }
    if (grEatArr[0] !== undefined) {
        for (var i in grEatArr) {
            grEatArr[i].eat()
        }
    }
    if (predArr[0] !== undefined) {
        for (var i in predArr) {
            predArr[i].eat()
        }
    }
    if (bombArr[0] !== undefined) {
        for (var i in bombArr) {
            bombArr[i].wait()
        }
    }
    if (sapArr[0] !== undefined) {
        for (var i in sapArr) {
            sapArr[i].neutralization()
        }
    }
    if (fireArr[0] !== undefined) {
        for (var i in fireArr) {
            fireArr[i].eat()
        }
    }
    while (grArr.length > 120 && bombArr.length < 2) {

        let maxX = Math.floor(random(matrix[1].length));
        let maxY = Math.floor(random(matrix.length));

        if (matrix[maxY][maxX] == 0) {
            bombArr.push(new Bomb(maxX, maxY));
            matrix[maxY][maxX] = 4;
        }
    }

    let sendData = {
        matrix: matrix,
        grassC: grArr.length,
        grassEatC: grEatArr.length,
        predC: predArr.length,
        bombC: bombArr.length,
        //bombT: bombArr[0].timer,
        sapperC: sapArr.length,
        //sapT: sapArr[0].time
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}



setInterval(game, 250)

console.log("server is running on port 3000. To stop it, press 'ctrl+c'");