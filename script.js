console.log("Hello Node")

//var os = require("os");
var message = "The platform is ";

/*function main(){
   console.log(message + os.platform());
}
main();*/

var bardz = 40;
var layn = 40;
var grassCount = 20;
var eatGrassCount = 30;
var predatorCount = 10;
//var bombCount = 2;
var sapCount = 6;

var matrix = [];

for (var i = 0; i < bardz; i++) {
    matrix.push([]);
    for (var j = 0; j < layn; j++) {
        matrix[i].push(0);
    }
}

let side = 20;
var grArr = [];
var grEatArr = [];
var predArr = [];
//var bombArr = [];
var sapArr = [];

function setup() {
    for (var n = 0; n < grassCount; n++) {
        var x = Math.floor(random(0, layn));
        var y = Math.floor(random(0, bardz));
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1;
        }
    }
    for (var n = 0; n < eatGrassCount; n++) {
        var x = Math.floor(random(0, layn));
        var y = Math.floor(random(0, bardz));
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2;
        }
    }
    for (var n = 0; n < predatorCount; n++) {
        var x = Math.floor(random(0, layn));
        var y = Math.floor(random(0, bardz));
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3;
        }
    }
    /*for (var n = 0; n < bombCount; n++) {
        var x = Math.floor(random(0, layn));
        var y = Math.floor(random(0, bardz));
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4;
        }
    }*/
    for (var n = 0; n < sapCount; n++) {
        var x = Math.floor(random(0, layn));
        var y = Math.floor(random(0, bardz));
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5;
        }
    }
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac')
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
        }
    }
}

function draw() {
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
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green")
            }
            else if (matrix[y][x] == 2) {
                fill("yellow")
            }
            else if (matrix[y][x] == 3) {
                fill("red")
            }
            else if (matrix[y][x] == 4) {
                fill("white")
            }
            else if (matrix[y][x] == 5) {
                fill("blue")
            }
            else if (matrix[y][x] == 0) {
                fill('#acacac')
            }
            rect(x * side, y * side, side, side)
        }
    }
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

}
