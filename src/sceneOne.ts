import { Model, SceneState } from './model'
import { Scene } from './scene'

export class SceneOne extends Scene {

    constructor(model: Model) {
        super(model)

        this.button.on('pointerdown', () => {
            this.model.sceneState = SceneState.second
            console.log(this.model.sceneState);
        })
    }

    update(): void {
        super.update()

        let tempColor = this.model.buttonData.firstColor.slice(1)
        tempColor = '0x' + tempColor;

        this.button.clear()
        this.button.beginFill(tempColor)
        this.button.drawRoundedRect(100, 100,
            this.model.buttonData.width,
            this.model.buttonData.height,
            15)
    }
}