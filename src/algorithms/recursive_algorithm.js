import { sleep } from "../utils.js";

export default class RecursiveAlgorithm {

    constructor() {
        if (new.target === RecursiveAlgorithm) {
            throw Error("Consider RecursiveAlgorithm to be an abstract class!");
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

        let args = this.initialize();

        await this.step.apply(this, args);

        if(!this.shouldStop) {
            this.finish();
        }
    }

    initialize() {
        throw new Error("Consider 'initialized' to be an abstract method!");
    }

    async step() {
        if(this.shouldStop) {
            return false;
        }

        await sleep(1000 / this.speed);

        return true;
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