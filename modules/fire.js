var LivingCreature = require("./livingCreature.js")
var random = require("./random");

module.exports=class Fire extends LivingCreature {
    constructor(x, y) {
        // this.x = x;
        // this.y = y;
        // this.multiply = 0;
        super(x, y)
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
        var foundCords = this.getDirections(1);
        var cord = random(foundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 7;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            this.energy++;

            for (var i in grArr) {
                if (x == grArr[i].x && y == grArr[i].y) {
                    grArr.splice(i, 1);
                }
            }

            this.mul()
        }
        else{
            this.energy--
        }

        if (this.energy<=0){
            this.die()
        }
    }
    mul() {
        var foundCords = this.getDirections(0);
        var cord = random(foundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            var newFire = new Fire(x, y, this.index);
            fireArr.push(newFire);

            matrix[y][x] = 7;
            this.multiply = 0;
        }
    }
    die() {
        matrix[this.y][this.x] = 0;

        for (var i in fireArr) {
            if (this.x == fireArr[i].x && this.y == fireArr[i].y) {
                fireArr.splice(i, 1);
            }
        }
    }

}