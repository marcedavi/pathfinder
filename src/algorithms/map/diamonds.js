import IterativeAlgorithm from "../iterative_algorithm.js";
import Cell from "../../components/cell.js";

export default class Diamonds extends IterativeAlgorithm {
    
    constructor(grid) {
        super();

        this.grid = grid;
    }

    initialize() {
        this.grid.clearVisitedCells();
        this.grid.fill(Cell.CellTypes.EMPTY);

        this.points = [];
        for (let i = 0; i < 40; i++) {
            this.points.push(this.grid.getRandomCell())
        }
    }

    step() {
        let point = this.points.splice(Math.floor(Math.random() * this.points.length), 1)[0];
        point.setWall();

        for(let i = 0; i < 5; i++) {
            for(const neighbour of this.grid.neighbours(point)) {
                neighbour.setWall();
                point = neighbour;
            }
        }
    }

    finished() {
        console.log(this.points.length)
        return this.points.length <= 0;
    }
    
    finish(){
        this.grid.addStartAndGoal();
    }

}