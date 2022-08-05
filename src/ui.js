import Diamonds from "./algorithms/map/diamonds.js";
import Kruskal from "./algorithms/map/kruskal.js";
import RecursiveBacktracking from "./algorithms/map/recursive_backtracking.js";
import BreadthFirst from "./algorithms/pathfinding/breadth_first.js";
import DepthFirst from "./algorithms/pathfinding/depth_first.js";

export default class UI {

    constructor(grid) {
        this.grid = grid;
    }

    create() {
        // Map select
        document.querySelector("#map-algorithm .algorithm-select").addEventListener("change", (event) => {
            if (this.map_algorithm) {
                this.map_algorithm.stop();
            }

            switch(event.target.value) {
                case "recursive-backtracker":
                    this.map_algorithm = new RecursiveBacktracking(this.grid);
                    break;
                case "kruskal":
                    this.map_algorithm = new Kruskal(this.grid);
                    break;
                case "diamonds":
                    this.map_algorithm = new Diamonds(this.grid);
            }
        });
        
        // Map speed slider
        document.querySelector("#map-algorithm .speed-select").addEventListener("input", (event) => {
            this.map_algorithm.setSpeed(event.target.value);
        });

        // Map generate button
        document.querySelector("#map-algorithm .generate-button").addEventListener("click", () => {
            this.map_algorithm.stop();
            this.map_algorithm.start();
        });

        // Pathfinding select
        document.querySelector("#pathfinding-algorithm .algorithm-select").addEventListener("change", (event) => {
            if(this.pathfinding_algorithm) {
                this.pathfinding_algorithm.stop();
            }

            switch(event.target.value) {
                case "breadth-first":
                    this.pathfinding_algorithm = new BreadthFirst(this.grid);
                    break;
                case "depth-first":
                    this.pathfinding_algorithm = new DepthFirst(this.grid);
                    break;
            }

            this.pathfinding_algorithm.setSpeed(document.querySelector("#pathfinding-algorithm .speed-select").value);
        });
        
        // Pathfinding speed slider
        document.querySelector("#pathfinding-algorithm .speed-select").addEventListener("input", (event) => {
            this.pathfinding_algorithm.setSpeed(event.target.value);
        });

        // Pathfinding play button
        document.querySelector("#pathfinding-algorithm .play-button").addEventListener("click", () => {
            this.pathfinding_algorithm.stop();
            this.pathfinding_algorithm.start();
        });

        // Pathfinding stop button
        document.querySelector("#pathfinding-algorithm .stop-button").addEventListener("click", () => {
            this.pathfinding_algorithm.stop();
        });
    }

}