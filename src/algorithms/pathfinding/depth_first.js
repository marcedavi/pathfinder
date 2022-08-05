import IterativeAlgorithm from "../iterative_algorithm.js";

export default class DepthFirst extends IterativeAlgorithm {
    
    constructor(grid) {
        super();

        this.grid = grid;
    }

    initialize() {
        this.solution = null;
        this.grid.clearVisitedCells();

        let startCell = this.grid.getStartCell();
        startCell.setVisited(true);

        this.stack = [];
        this.stack.push([startCell]);
    }

    step() {
        let currentPath = this.stack.pop();

        for (let neighbour of this.grid.neighbours(currentPath[currentPath.length - 1])) {
            if (neighbour.isVisited() || neighbour.isWall()) {
                continue;
            }
            
            neighbour.setVisited(true);
            if(neighbour.isEmpty()) {
                neighbour.setExplored();
            }
            
            let newPath = [...currentPath];
            newPath.push(neighbour);
            
            if (neighbour.isGoal()) {
                this.solution = newPath;
                return;
            }
            
            this.stack.push(newPath);
        }
    }

    finished() {
        return this.stack.length <= 0 || this.solution !== null;
    }

    finish() {
        this.grid.drawPath(this.solution);
    }
    
}