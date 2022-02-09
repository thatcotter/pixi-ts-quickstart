import { Model, SceneState } from './model'
import { Scene } from './scene'

export class SceneTwo extends Scene {

    constructor(model: Model) {
        super(model)

        this.button.on('pointerdown', () => {
            model.getInstance().sceneState = SceneState.first
            console.log(model.getInstance().sceneState);
        })
    }

    update(): void {
        super.update()

        let tempColor = this.model.buttonData.secondColor.slice(1)
        tempColor = '0x' + tempColor;

        this.button.clear()
        this.button.beginFill(tempColor)
        this.button.drawRoundedRect(100, 400,
            this.model.buttonData.width,
            this.model.buttonData.height,
            15)
    }
}