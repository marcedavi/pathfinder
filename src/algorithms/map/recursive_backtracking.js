import Cell from "../../components/cell.js";
import RecursiveAlgorithm from "../recursive_algorithm.js";

export default class RecursiveBacktracking extends RecursiveAlgorithm {
    
    constructor(grid) {
        super();

        this.grid = grid;
    }

    initialize() {
        this.grid.clearVisitedCells();
        this.grid.fill(Cell.CellTypes.WALL);

        return [this.grid.getRandomOddCell()];
    }

    async step(cell) {
        if (!(await super.step())) {
            return;
        }

        cell.setVisited(true);
        cell.setEmpty();

        let wallNeighbours = this.grid.wallNeighbours(cell);

        while(wallNeighbours.length > 0) {
            let wallNeighbour = wallNeighbours.splice(Math.floor(Math.random() * wallNeighbours.length), 1)[0];

            if (!wallNeighbour[1].isVisited()) {
                wallNeighbour[0].setVisited(true);
                wallNeighbour[0].setEmpty();

                await this.step(wallNeighbour[1]);
            }
        }
    }
    
    finish(){
        this.grid.addStartAndGoal();
    }

}