var LivingCreature = require("./livingCreature.js")
var random = require("./random");

module.exports = class Predator extends LivingCreature {
    constructor(x, y, mulK) {
        super(x, y, mulK)
        this.energy = 5;
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
    eat() {
        var foundCords = this.chooseCell(2);
        var cord = random(foundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            this.multiply++;

            this.energy++;

            for (var i in grEatArr) {
                if (x == grEatArr[i].x && y == grEatArr[i].y) {
                    grEatArr.splice(i, 1);
                }
            }

            if (this.multiply >= this.mulK) {
                this.mul()
                this.multiply = 0;
            }
        }
        else {
            this.move();
            this.energy--;
            if (this.energy <= 0) {
                this.die();
            }
        }
    }
    mul() {
        var foundCords = this.chooseCell(0);
        var cord = random(foundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            this.multiply++;

            var newPredator = new Predator(x, y, this.mulK);
            predArr.push(newPredator);

            matrix[y][x] = 3;
            this.multiply = 0;
        }
    }
    die() {
        matrix[this.y][this.x] = 0;

        for (var i in predArr) {
            if (this.x == predArr[i].x && this.y == predArr[i].y) {
                predArr.splice(i, 1);
            }
        }
    }
    move() {
        var foundCords = this.chooseCell(0);
        var cord = random(foundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

        }
    }
}