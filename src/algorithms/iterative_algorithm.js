import { sleep } from "../utils.js";

export default class IterativeAlgorithm {

    constructor() {
        if (new.target === IterativeAlgorithm) {
            throw Error("Consider IterativeAlgorithm to be an abstract class!");
        }

        this.speeds = {
            "slow": 2,
            "medium": 25,
            "fast": 100,
        };

        this.speed = this.speeds["medium"];
        this.shouldStop = true;
    }

    async start() {
        this.shouldStop = false;

        this.initialize();

        while(!this.shouldStop && !this.finished()) {
            
            this.step();
            await sleep(1000 / this.speed);
        }

        if(!this.shouldStop) {
            this.finish();
        }
    }

    initialize() {
        throw new Error("Consider 'initialized' to be an abstract method!");
    }

    step() {
        throw new Error("Consider 'step' to be an abstract method!");
    }

    finished() {
        throw new Error("Consider 'finished' to be an abstract method!");
    }

    finish() {
        throw new Error("Consider 'finish' to be an abstract method!");
    }

    stop() {
        this.shouldStop = true;
    }

    setSpeed(speed) {
        this.speed = this.speeds[speed];
    }

}