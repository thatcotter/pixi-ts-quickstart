export class Model {
    private static instance: Model

    buttonData: any = {
        width: 200,
        height: 100,
        firstColor: '#3d983d',
        secondColor: '#ff0000',
    };

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