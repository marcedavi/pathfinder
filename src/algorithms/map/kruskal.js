import IterativeAlgorithm from "../iterative_algorithm.js";
import Cell from "../../components/cell.js";

export default class Kruskal extends IterativeAlgorithm {
    
    constructor(grid) {
        super();

        this.grid = grid;
    }

    initialize() {
        this.grid.clearVisitedCells();
        this.grid.gingham();

        this.walls = [];
        for (let i = 1; i < this.grid.rowCount - 1; i++) {
            for(let j = (i % 2 == 0 ? 1 : 2); j < this.grid.columnCount - 1; j += 2) {
                this.walls.push(this.grid.cells[i][j]);
            }
        }

        this.sets = [];
        for (let i = 1; i < this.grid.rowCount; i += 2) {
            for(let j = 1; j < this.grid.columnCount; j += 2) {
                this.sets.push(new Set([this.grid.cells[i][j]]));
            }
        }
    }

    step() {
        let wall = this.walls.splice(Math.floor(Math.random() * this.walls.length), 1)[0];

        let emptyNeighbours = this.grid.neighbours(wall).filter(neighbour => neighbour.isEmpty());
        if(emptyNeighbours.length != 2) {
            return;
        }

        let index1 = this.sets.findIndex(set => set.has(emptyNeighbours[0]));
        let index2 = this.sets.findIndex(set => set.has(emptyNeighbours[1]));
        
        if(index1 != index2) {
            wall.setEmpty();

            let set1 = this.sets.splice(index1, 1)[0];
            let set2 = this.sets.splice(index2 > index1 ? index2 - 1 : index2, 1)[0];

            this.sets.push(new Set([...set1, ...set2]));
        }
    }

    finished() {
        return this.walls.length <= 0;
    }
    
    finish(){
        this.grid.addStartAndGoal();
    }

}