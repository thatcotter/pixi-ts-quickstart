import { Point } from "pixi.js";

export class Model {
    private static instance: Model

    buttonData: buttonData = {
        width: 200,
        height: 100,
        firstColor: '#3d983d',
        secondColor: '#c83131',
    };

    mousePos: Point = new Point(window.innerWidth, 0);

    elapsedTime: number = 0;
    sceneState: SceneState = SceneState.first;

    constructor() {
        if (Model.instance) {
            return Model.instance;
        }
        Model.instance = this;
    }

    getInstance(): Model{
        return Model.instance
    }
}

export enum SceneState{
    first = 'scene one',
    second = 'scene two'
}

interface buttonData {
    width: number,
    height: number,
    firstColor: string,
    secondColor: string,
}