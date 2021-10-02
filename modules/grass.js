var LivingCreature = require("./livingCreature.js")
var random = require("./random");

module.exports=class Grass extends LivingCreature{
    
    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell();
        var newCell = random(emptyCells)
       
        if (this.multiply >= 2 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1]);
            grArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }
}
