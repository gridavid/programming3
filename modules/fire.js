var LivingCreature = require("./livingCreature.js")
var random = require("./random");

module.exports = class Fire extends LivingCreature {
    constructor(x, y, mulK) {
        super(x, y, mulK)
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
        var foundCords = this.chooseCell(1);
        var cord = random(foundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 7;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            this.mulK++;

            for (let i in grArr) {
                if (x == grArr[i].x && y == grArr[i].y) {
                    grArr.splice(i, 1);
                }
            }

            this.mul()
        }
        else {
            this.mulK--
        }

        if (this.mulK <= 0) {
            this.die()
        }
    }
    mul() {
        var foundCords = this.chooseCell(0);
        var cord = random(foundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            fireArr.push(new Fire(x, y, 0));

            matrix[y][x] = 7;
        }
    }
    die() {
        matrix[this.y][this.x] = 0;

        for (let i in fireArr) {
            if (this.x == fireArr[i].x && this.y == fireArr[i].y) {
                fireArr.splice(i, 1);
            }
        }
    }

}