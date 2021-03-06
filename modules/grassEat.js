var LivingCreature = require("./livingCreature.js")
var random = require("./random");

module.exports=class GrassEat extends LivingCreature {
    constructor(x, y, mulK) {
        super(x, y, mulK)
        this.energy = 10;
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
        this.energy--;
        var foundCords = this.chooseCell(0);
        var cord = random(foundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

        }

        if (this.energy < 3) {
            this.die();
        }
    }
    eat() {
        var foundCords = this.chooseCell(1);
        var cord = random(foundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            this.multiply++;

            this.energy++;

            for (var i in grArr) {
                if (x == grArr[i].x && y == grArr[i].y) {
                    grArr.splice(i, 1);
                }
            }

            if (this.multiply >= this.mulK) {
                this.mul()
                this.multiply = 0;
            }

        } else {
            this.move();

        }
    }
    mul() {
        var foundCords = this.chooseCell(0);
        var cord = random(foundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            this.multiply++;

            var newGrassEater = new GrassEat(x, y, this.mulK);
            grEatArr.push(newGrassEater);

            matrix[y][x] = 2;
            this.multiply = 0;
        }
    }
    die() {
        matrix[this.y][this.x] = 0;

        for (var i in grEatArr) {
            if (this.x == grEatArr[i].x && this.y == grEatArr[i].y) {
                grEatArr.splice(i, 1);
            }
        }
    }

}