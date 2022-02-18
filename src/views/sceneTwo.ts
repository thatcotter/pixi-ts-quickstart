import { Model, SceneState } from '../model/model'
import { Scene } from './scene'

export class SceneTwo extends Scene {

    constructor(model: Model) {
        super(model)

        this.button.on('pointerdown', () => {
            this.model.sceneState = SceneState.first
            this.button.isPressed = false
            console.log(this.model.sceneState);
        })
        this.button.position.x = 100
        this.button.position.y = 200
    }

    update(): void {
        super.update()

        let tempColor = this.model.buttonData.secondColor.slice(1)
        tempColor = '0x' + tempColor;

        this.button.fill = parseInt(tempColor);
        this.button.width = this.model.buttonData.width;
        this.button.height = this.model.buttonData.height;
        this.button.update()
    }
}