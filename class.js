class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.multiply = 0;
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
    chooseCell() {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == 0) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell();
        var newCell = random(emptyCells)

        if (this.multiply >= 1 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1]);
            grArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }
}

class GrassEat {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
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

            if (this.multiply == 10) {
                this.mul()
                this.multiply = 0;
            }

        } else {
            this.move();
            this.energy--;
            if (this.energy < 3) {
                this.die();
            }
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
class Predator {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
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
    
    eat() {
        var foundCords = this.getDirections(2);
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

            if (this.multiply == 4) {
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
        var foundCords = this.getDirections(0);
        var cord = random(foundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            this.multiply++;

            var newPredator = new Predator(x, y, this.index);
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
        var foundCords = this.getDirections(0);
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
class Bomb {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.timer = 10;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 2, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
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
        ];
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
        if (this.timer == 0) {
            var foundCords = [];
            for (var i = 0; i < 6; i++) {
                var a = this.getDirections(i)
                for(var i in a)
                    foundCords.push(a[i])
            }
            for (var i in foundCords) {
                var deadX = foundCords[i][0]
                var deadY = foundCords[i][1]
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
                matrix[this.y][this.x] = 0
                for (var i in bombArr) {
                    if (this.x == bombArr[i].x && this.y == bombArr[i].y) {
                        bombArr.splice(i, 1);
                    }
                }
            }
        }
    }
}

class Sapper {
    constructor(x, y) {
        this.x = x;
        this.y = y;
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
        var foundCords = this.getDirections(0);
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
        var foundBombs = this.getDirections(4);
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