function setup() {
    var socket = io();

    var side = 20;

    var matrix = [];
    grs = "#69f016";

    //! Getting DOM objects (HTML elements)
    //let grassCountElement = document.getElementById('grassCount');
    //let grassEaterCountElement = document.getElementById('grassEaterCount');

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
        document.getElementById("season").innerText = data.season;

        //! Drawing and coloring RECTs
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                    fill(grs);
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
                    fill('black');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 5) {
                    fill('blue');
                    rect(j * side, i * side, side, side);
                }else if (matrix[i][j]==7){
                    fill('orange')
                    rect(j * side, i * side, side, side);
                }
            }
        }
    }
    function spring() {
        grs="#24d121"
        socket.emit("season", 1)
    }
    var spr = document.getElementById("spring");
    spr.addEventListener("click", spring);

    //summer
    function summer() {
        grs="#69f016"
        socket.emit("season", 2)
    }
    var sum = document.getElementById("summer");
    sum.addEventListener("click", summer);

    //autumn
    function autumn() {
        grs = "#7cdb00"
        socket.emit("season", 3)
    }
    var aut = document.getElementById("autumn");
    aut.addEventListener("click", autumn);

    //winter
    function winter() {
        grs = "#95f788"
        socket.emit("season", 4)
    }

    var win = document.getElementById("winter");
    win.addEventListener("click", winter);

    var fire = document.getElementById("burn");
    fire.addEventListener("click", burn);
    function burn(){
        socket.emit("burn")
    }

    var kill = document.getElementById("kill");
    kill.addEventListener("click", killClick);
    function killClick(){
        socket.emit("kill")
    }
}
