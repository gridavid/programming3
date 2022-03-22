var LivingCreature = require("./livingCreature.js")
var random = require("./random");

module.exports = class Bomb extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.timer = 20;
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
        this.timer--
        if (this.timer < 0) {
            for (var i = 0; i <= 7; i++) {
                var a = this.chooseCell(i)
                
                for (var i = 0; i < a.length; i++) {
                    console.log(a[i]);
                    this.foundCords.push(a[i])
                }
            }
            for (var i = 0;i < this.foundCords.length; i++) {
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
                    for (var i = 0; i < grEatArr.length; i++) {
                        if (deadX == grEatArr[i].x && deadY == grEatArr[i].y) {
                            grEatArr.splice(i, 1);
                        }
                    }
                }
                else if (matrix[deadY][deadX] == 3) {
                    for (var i = 0; i < predArr.length; i++) {
                        if (deadX == predArr[i].x && deadY == predArr[i].y) {
                            predArr.splice(i, 1);
                        }
                    }
                }
                else if (matrix[deadY][deadX] == 5) {
                    for (var i = 0; i < sapArr.length; i++) {
                        if (deadX == sapArr[i].x && deadY == sapArr[i].y) {
                            sapArr.splice(i, 1);
                        }
                    }
                }
                matrix[deadY][deadX] = 0
                
                for (var i = 0; i < bombArr.length; i++) {
                    if (this.x == bombArr[i].x && this.y == bombArr[i].y) {
                        matrix[this.y][this.x] = 0
                        bombArr.splice(i, 1);
                    }
                }
            }
        }
    }
}