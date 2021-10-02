var socket = io();
function setup() {
    

    var side = 10;

    var matrix = []

    //! Getting DOM objects (HTML elements)
    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');

    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 

    socket.on("data", drawCreatures);

    function drawCreatures(data) {
        //! after getting data pass it to matrix variable
        matrix = data.matrix;
        //grassCountElement.innerText = data.grassCounter;
        //! Every time it creates new Canvas woth new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side)
        //! clearing background by setting it to new grey color
        background('#acacac');
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)

        //! Drawing and coloring RECTs
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                    fill("green");
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 2) {
                    fill("yellow");
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 0) {
                    fill('#acacac');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 3) {
                    fill('red');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 4) {
                    fill('blue');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 5) {
                    fill('white');
                    rect(j * side, i * side, side, side);
                }else if (matrix[i][j]==7){
                    fill('orange')
                    rect(j * side, i * side, side, side);
                }
            }
        }
    }
    /*Socket.on("data",getData())
    function getData(data){
        var Grass = data.Grass
    }
    var socket = io()
    
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
            }*//*
            if (matrix[y][x] == 5) {
                sapArr.push(new Sapper(x, y))
            }
            if (matrix[y][x] == 7) {
                fireArr.push(new fireArr(x, y))
            }
        }

    }*/
}

/*function draw() {
    

    //fire code
    
    //seasons code
    //spring
    function spring() {
        grs="#24d121"
    }
    var spr = document.getElementById("spring");
    spr.addEventListener("click", spring);

    //summer
    function summer() {
        grs="#69f016"
    }
    var sum = document.getElementById("summer");
    sum.addEventListener("click", summer);

    //autumn
    function autumn() {
        grs = "#7cdb00"
    }
    var aut = document.getElementById("autumn");
    aut.addEventListener("click", autumn);

    //winter
    function winter() {
        grs = "#95f788"
    }
    var win = document.getElementById("winter");
    win.addEventListener("click", winter);


    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill(grs)
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
            else if (matrix[y][x] == 7) {
                fill("orange")
            }
            else if (matrix[y][x] == 0) {
                fill('#acacac')
            }
            rect(x * side, y * side, side, side)
        }
    }
    

}*/