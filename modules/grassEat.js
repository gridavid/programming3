var LivingCreature = require("./livingCreature.js")
var random = require("./random");

module.exports=class GrassEat extends LivingCreature {
    constructor(x, y) {
        // this.x = x;
        // this.y = y;
        // this.multiply = 0;
        super(x, y)
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
    getDirections(t) {
        this.newDirections();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        this.energy--;
        var foundCords = this.getDirections(0);
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
        var foundCords = this.getDirections(1);
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

            if (this.multiply >= 10) {
                this.mul()
                this.multiply = 0;
            }

        } else {
            this.move();

        }
    }
    mul() {
        var foundCords = this.getDirections(0);
        var cord = random(foundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            this.multiply++;

            var newGrassEater = new GrassEat(x, y, this.index);
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