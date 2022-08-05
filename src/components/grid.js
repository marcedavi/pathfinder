import Cell from "./cell.js";
import { sleep } from "../utils.js";

export default class Grid {

    constructor(app) {
        this.app = app;

        this.cellSize = 10;
    }

    create() {

        // Create particle container
        this.particleContainer = new PIXI.ParticleContainer(16384, {
            vertices: true,
            position: true,
            tint: true
        }, 16384, true);
        this.app.stage.addChild(this.particleContainer);

        // Calculate grid size
        this.rowCount = Math.floor(this.app.renderer.height / this.cellSize / 2) * 2 - 1;
        this.columnCount = Math.floor(this.app.renderer.width / this.cellSize / 2) * 2 - 1;

        // Create grid cells
        this.cells = Array.from(new Array(this.rowCount), () => new Array(this.columnCount));

        for (let i = 0; i < this.rowCount; i++) {
            for(let j = 0; j < this.columnCount; j++) {
                this.cells[i][j] = new Cell(this.cellSize, j, i);
                this.particleContainer.addChild(this.cells[i][j].sprite);
            }
        }
    }

    addStartAndGoal() {
        let cell;
        do {
            cell = this.getRandomCell(this.rowCount * 2 / 3, this.rowCount - 2, 1, this.columnCount / 10);
        } while(!cell.isEmpty());

        cell.setStart();

        do {
            cell = this.getRandomCell(1, this.rowCount / 3, this.columnCount * 0.9, this.columnCount - 2);
        } while(!cell.isEmpty());

        cell.setGoal();
    }

    getStartCell() {
        for (let i = 0; i < this.rowCount; i++) {
            for(let j = 0; j < this.columnCount; j++) {
                if(this.cells[i][j].cellType == Cell.CellTypes.START) {
                    return this.cells[i][j];
                }
            }
        }
    }

    fill(cellType) {
        for (let i = 0; i < this.rowCount; i++) {
            for(let j = 0; j < this.columnCount; j++) {
                if(j == 0 || i == 0 || j == this.columnCount - 1 || i == this.rowCount - 1) {
                    this.cells[i][j].setWall();
                } else {
                    this.cells[i][j].setType(cellType);
                }
            }
        }
    }

    gingham() {
        for (let i = 0; i < this.rowCount; i++) {
            for(let j = 0; j < this.columnCount; j++) {
                if(i % 2 == 0 || j % 2 == 0) {
                    this.cells[i][j].setWall();
                } else {
                    this.cells[i][j].setEmpty();
                }
            }
        }
    }

    clearVisitedCells() {
        let cell;
        for (let i = 0; i < this.rowCount; i++) {
            for(let j = 0; j < this.columnCount; j++) {
                cell = this.cells[i][j];
                cell.setVisited(false);
                if(!cell.isStart() && !cell.isGoal() && !cell.isWall()) {
                    this.cells[i][j].setEmpty();
                }
            }
        }
    }
    
    getRandomCell(minRow = 1, maxRow = this.rowCount - 2, minCol = 1, maxCol = this.columnCount - 2) {
        return this.cells[Math.floor(Math.random() * (maxRow - minRow + 1) + minRow)][Math.floor(Math.random() * (maxCol - minCol + 1) + minCol)];
    }

    getRandomOddCell() {
        return this.cells[Math.floor(Math.random() * (this.rowCount - 1) / 2) * 2 + 1][Math.floor(Math.random() * (this.columnCount - 1) / 2) * 2 + 1];
    }
    
    isInside(x, y) {
        return x >= 1 && x < this.columnCount - 1 && y >= 1 && y < this.rowCount - 1;
    }

    neighbours(cell, withCorners = false) {
        let offsets = [[0, -1], [1, 0], [0, 1], [-1, 0]];
        if (withCorners) {
            offsets.push([-1, -1], [1, -1], [-1, 1], [1, 1]);
        }

        let neighbours = [];
        for(const offset of offsets) {
            let x = cell.x + offset[0];
            let y = cell.y + offset[1];

            if(this.isInside(x, y)) {
                neighbours.push(this.cells[y][x]);
            }
        }

        return neighbours;
    }

    wallNeighbours(cell) {
        let offsets = [[0, -1], [1, 0], [0, 1], [-1, 0]];

        let neighbours = [];
        for(const offset of offsets) {
            let x = cell.x + offset[0];
            let y = cell.y + offset[1];

            if(this.isInside(x, y) && this.cells[y][x].isWall()) {
                let x1 = x + offset[0];
                let y1 = y + offset[1];

                if(this.isInside(x1, y1)) {
                    neighbours.push([this.cells[y][x], this.cells[y1][x1]]);
                }
            }
        }

        return neighbours;
    }

    async drawPath(path) {
        for(let cell of path) {
            if (!cell.isStart() && !cell.isGoal()) {
                cell.setSolution();
            }

            await sleep(5);
        }
    }

    update(delta) {
        for (let i = 0; i < this.rowCount; i++) {
            for(let j = 0; j < this.columnCount; j++) {
                this.cells[i][j].update(delta);
            }
        }
    }

}