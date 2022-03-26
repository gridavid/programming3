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

//actions with buttons 
io.on('connection', function (socket) {
    creatingObjects();
    socket.on("kill", kill);
    socket.on("season", season);
    socket.on("burn", burn);


});

function season(num) {
    if (num == 1) {
        //console.log("spring")
        for (let i = 0; i < grArr.length; i++) {
            grArr[i].mulK = 1;
        }
    }
    else if (num == 2) {
        //console.log("summer")
        for (let i = 0; i < grArr.length; i++) {
            grArr[i].mulK = 2;
        }
    }
    else if (num == 3) {
        //console.log("autumn")
        for (let i = 0; i < grArr.length; i++) {
            grArr[i].mulK = 4;
        }
    }
    else if (num == 4) {
        //console.log("winter")
        for (let i = 0; i < grArr.length; i++) {
            grArr[i].mulK = 12;
        }
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
    while (fireArr.length < 1) {
        let maxX = Math.floor(random(matrix[1].length));
        let maxY = Math.floor(random(matrix.length));

        if (matrix[maxY][maxX] == 1) {
            fireArr.push(new Fire(maxX, maxY))
            for (let i = 0; i < grArr.length; i++) {
                if (grArr[i].x == maxX && grArr[i].y == maxY) {
                    grArr.splice(i, 1);
                    break;
                }
            }
            matrix[maxY][maxX] = 2
        }
    }
}

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
    //bomb generator
    while (grArr.length > 120 && bombArr.length < 2) {

        let maxX = Math.floor(random(matrix[1].length));
        let maxY = Math.floor(random(matrix.length));

        if (matrix[maxY][maxX] == 0) {
            bombArr.push(new Bomb(maxX, maxY));
            matrix[maxY][maxX] = 4;
        }
    }
    //grass
    while (grArr.length < 2) {

        let maxX = Math.floor(random(matrix[1].length));
        let maxY = Math.floor(random(matrix.length));

        if (matrix[maxY][maxX] == 0) {
            grArr.push(new Grass(maxX, maxY));
            matrix[maxY][maxX] = 1;
        }
    }
    //grass eater
    while (grEatArr.length < 2) {

        let maxX = Math.floor(random(matrix[1].length));
        let maxY = Math.floor(random(matrix.length));

        if (matrix[maxY][maxX] == 0) {
            grEatArr.push(new GrassEat(maxX, maxY));
            matrix[maxY][maxX] = 2;
        }
    }
    //predator
    while (predArr.length < 2 && grEatArr.length > 6) {

        let maxX = Math.floor(random(matrix[1].length));
        let maxY = Math.floor(random(matrix.length));

        if (matrix[maxY][maxX] == 0) {
            predArr.push(new Predator(maxX, maxY));
            matrix[maxY][maxX] = 3;
        }
    }
    //sapper
    while (sapArr.length < 1) {

        let maxX = Math.floor(random(matrix[1].length));
        let maxY = Math.floor(random(matrix.length));

        if (matrix[maxY][maxX] == 0) {
            sapArr.push(new Sapper(maxX, maxY));
            matrix[maxY][maxX] = 5;
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