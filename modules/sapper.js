var LivingCreature = require("./livingCreature.js")
var random = require("./random");

module.exports=class Sapper extends LivingCreature{
    constructor(x, y) {
        super(x,y)
        this.time = 0;
        this.directions = [];
    }
    newDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    move() {
        var foundCords = this.chooseCell(0);
        var cord = random(foundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

        }
    }
    neutralization() {
        var foundBombs = this.chooseCell(4);
        var bomb = random(foundBombs);

        if (bomb) {
            this.time++
            if (this.time == 5) {
                var x = bomb[0];
                var y = bomb[1];

                matrix[y][x] = 0;
                for (var i in bombArr) {
                    if (x == bombArr[i].x && y == bombArr[i].y) {
                        bombArr.splice(i, 1)
                    }
                }
                this.time = 0
            }
        }
        else {
            this.move();
        }
    }
}