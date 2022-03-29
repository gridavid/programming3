var LivingCreature = require("./livingCreature.js")
var random = require("./random");

module.exports = class Bomb extends LivingCreature {
    constructor(x, y, mulK) {
        super(x, y, mulK)
        this.foundCords = [];
        this.directions.push(
            [this.x - 2, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y + 2],
            [this.x + 2, this.y - 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x - 2, this.y + 2],
            [this.x + 2, this.y + 2]
        );
    }
    explosion() {

        for (var i = 0; i <= 7; i++) {
            var a = this.chooseCell(i)

            for (var l = 0; l < a.length; l++) {
                this.foundCords.push(a[l])
            }
        }
        for (var i = 0; i < this.foundCords.length; i++) {
            var deadX = this.foundCords[i][0]
            var deadY = this.foundCords[i][1]
            if (matrix[deadY][deadX] == 1) {
                for (var l = 0; l < grArr.length; l++) {
                    if (deadX == grArr[l].x && deadY == grArr[l].y) {
                        grArr.splice(l, 1);
                    }
                }
            }
            else if (matrix[deadY][deadX] == 2) {
                for (var l = 0; l < grEatArr.length; l++) {
                    if (deadX == grEatArr[l].x && deadY == grEatArr[l].y) {
                        grEatArr.splice(l, 1);
                    }
                }
            }
            else if (matrix[deadY][deadX] == 3) {
                for (var l = 0; l < predArr.length; l++) {
                    if (deadX == predArr[l].x && deadY == predArr[l].y) {
                        predArr.splice(l, 1);
                    }
                }
            }
            else if (matrix[deadY][deadX] == 4) {
                for (var l = 0; l < bombArr.length; l++) {
                    if (deadX == bombArr[l].x && deadY == bombArr[l].y) {
                        bombArr[l].explosion()
                    }
                }
            }
            else if (matrix[deadY][deadX] == 5) {
                for (var l = 0; l < sapArr.length; l++) {
                    if (deadX == sapArr[l].x && deadY == sapArr[l].y) {
                        sapArr.splice(l, 1);
                    }
                }
            }
            matrix[deadY][deadX] = 0

            for (var l = 0; l < bombArr.length; l++) {
                if (this.x == bombArr[l].x && this.y == bombArr[l].y) {
                    matrix[this.y][this.x] = 0
                    bombArr.splice(l, 1);
                }
            }
        }
    }
    wait() {
        this.mulK--
        if (this.mulK < 0) {
            this.explosion()
        }
    }
}