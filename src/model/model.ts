import { Application, Point } from "pixi.js";

export class Model {
    private static instance: Model

    app: Application;

    buttonData: buttonData = {
        width: 200,
        height: 100,
        firstColor: '#3d983d',
        secondColor: '#c83131',
    };

    mousePos: Point = new Point(window.innerWidth, 0);

    elapsedTime: number = 0;
    sceneState: SceneState = SceneState.first;

    constructor(app?: Application) {
        if (Model.instance) {
            return Model.instance;
        }
        if(app) this.app = app;
        Model.instance = this;
    }

    static getInstance(app?: Application): Model{
        if (Model.instance) {
            return Model.instance
        }else {
            if(app) return new Model(app)
            return new Model()
        }
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