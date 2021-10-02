var LivingCreature = require("./livingCreature.js")
var random = require("./random");

module.exports=class Bomb extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.timer = 10;
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
    getDirections(t) {
        var found = [];
        for (var i in this.directions) {
            var altX = this.directions[i][0];
            var altY = this.directions[i][1];
            if (altX >= 0 && altX < matrix[0].length && altY >= 0 && altY < matrix.length) {
                if (matrix[altY][altX] == t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    explosion() {
        this.timer--
        if (this.timer <= 0) {
            for (var i = 0; i <= 6; i++) {
                var a = this.getDirections(i)
                for (var i in a) {
                    this.foundCords.push(a[i])
                }

            }
            for (var i in this.foundCords) {
                var deadX = this.foundCords[i][0]
                var deadY = this.foundCords[i][1]
                if (matrix[deadY][deadX] == 1) {
                    for (var i in grArr) {
                        if (deadX == grArr[i].x && deadY == grArr[i].y) {
                            grArr.splice(i, 1);
                        }
                    }
                }
                if (matrix[deadY][deadX] == 2) {
                    for (var i in grEatArr) {
                        if (deadX == grEatArr[i].x && deadY == grEatArr[i].y) {
                            grEatArr.splice(i, 1);
                        }
                    }
                }
                if (matrix[deadY][deadX] == 3) {
                    for (var i in predArr) {
                        if (deadX == predArr[i].x && deadY == predArr[i].y) {
                            predArr.splice(i, 1);
                        }
                    }
                }
                if (matrix[deadY][deadX] == 5) {
                    for (var i in sapArr) {
                        if (deadX == sapArr[i].x && deadY == sapArr[i].y) {
                            sapArr.splice(i, 1);
                        }
                    }
                }
                matrix[deadY][deadX] = 0
                
                for (var i in bombArr) {
                    if (this.x == bombArr[i].x && this.y == bombArr[i].y) {
                        bombArr.splice(i, 1);
                    }
                }
                matrix[this.y][this.x] = 0
            }
        }
    }
}