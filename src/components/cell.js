export default class Cell {
    
    static CellTypes = {
        EMPTY: 0xffffff,
        WALL: 0x023047,
        START: 0x00ff00,
        GOAL: 0xff0000,
        EXPLORED: 0x8ecae6,
        SOLUTION: 0xffb703
    }

    constructor(cellSize, x, y) {
        this.x = x;
        this.y = y;
        this.cellSize = cellSize;
        this.cellType = Cell.CellTypes.EMPTY;
        this.visited = false;
        
        this.sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
        this.sprite.width = 0;
        this.sprite.height = 0;
        this.sprite.position.x = this.x * this.cellSize + this.cellSize / 2;
        this.sprite.position.y = this.y * this.cellSize + this.cellSize / 2;
        this.sprite.anchor.set(0.5);
    }

    create() {}

    setType(cellType) {
        this.cellType = cellType;
        this.sprite.width = 0;
        this.sprite.height = 0;
        this.sprite.tint = this.cellType;
    }

    setVisited(visited) {
        this.visited = visited;
    }
    
    setExplored() {
        this.setType(Cell.CellTypes.EXPLORED);
    }

    setEmpty() {
        this.setType(Cell.CellTypes.EMPTY);
    }

    setStart() {
        this.setType(Cell.CellTypes.START);
    }

    setGoal() {
        this.setType(Cell.CellTypes.GOAL);
    }

    setWall() {
        this.setType(Cell.CellTypes.WALL);
    }

    setSolution() {
        this.setType(Cell.CellTypes.SOLUTION);
    }

    isVisited() {
        return this.visited;
    }

    isEmpty() {
        return this.cellType == Cell.CellTypes.EMPTY;
    }

    isStart() {
        return this.cellType == Cell.CellTypes.START;
    }

    isExplored() {
        return this.cellType == Cell.CellTypes.EXPLORED;
    }

    isWall() {
        return this.cellType == Cell.CellTypes.WALL;
    }

    isGoal() {
        return this.cellType == Cell.CellTypes.GOAL;
    }

    isSolution() {
        return this.cellType == Cell.CellTypes.SOLUTION;
    }

    update(delta) {
        if(this.sprite.width < this.cellSize) {
            this.sprite.width += this.cellSize / 25 * delta;
            this.sprite.height = this.sprite.width;
        }
    }
}