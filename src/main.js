import RecursiveBacktracking from "./algorithms/map/recursive_backtracking.js";
import BreadthFirst from "./algorithms/pathfinding/breadth_first.js";
import DepthFirst from "./algorithms/pathfinding/depth_first.js";
import Grid from "./components/grid.js";
import UI from "./ui.js";

export default class Main {
    constructor() {
        // Create PIXI Application
        let pixiContainer = document.getElementById("pixi-container");
        this.app = new PIXI.Application({
            resizeTo: pixiContainer,
            // width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
            // height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
            autoDensity: true,
            backgroundColor: 0xffffff
        });
        pixiContainer.appendChild(this.app.view);
    }

    preload() {
        // Preload assets
        // PIXI.Loader.shared.add(layer.name, "../assets/maps/" + layer.name + ".jpg");
        
        PIXI.Loader.shared.load((this.create).bind(this));
    }

    create() {

        // Create the grid
        this.grid = new Grid(this.app, 50, 100);
        this.grid.create();
        
        // Center the grid on the screen
        this.grid.particleContainer.position.x = this.app.renderer.width / 2 - this.grid.columnCount * this.grid.cellSize / 2;
        this.grid.particleContainer.position.y = this.app.renderer.height / 2 - this.grid.rowCount * this.grid.cellSize / 2;

        // Setup update loop
        this.app.ticker.add((this.update).bind(this));
    
        // Page controls
        this.ui = new UI(this.grid);
        this.ui.create();

    }
    
    update(delta) {
        this.grid.update(delta);
    }
}

window.pathfinder = new Main()
window.pathfinder.preload();