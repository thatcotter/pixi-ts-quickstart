import { Point, Polygon, Sprite } from 'pixi.js'
// import { lerp } from './easing';
import { Model, SceneState } from './model'
import { Scene } from './scene'

export class SceneOne extends Scene {

    sprite: Sprite = new Sprite();

    constructor(model: Model) {
        super(model)

        this.button.on('pointerdown', () => {
            this.model.sceneState = SceneState.second
            this.button.isPressed = false
            console.log(this.model.sceneState);
        })
        this.button.position.x = 100
        this.button.position.y = 100
    }

    update(): void {
        super.update()

        let tempColor = this.model.buttonData.firstColor.slice(1)
        tempColor = '0x' + tempColor;

        this.button.fill = tempColor;
        this.button.width = this.model.buttonData.width;
        this.button.height = this.model.buttonData.height;
        this.button.update()

        // this.sprite.x = 
        //     lerp(this.sprite.x, this.model.mousePos.x, 0.02)

        // this.sprite.y = 
        //     lerp(this.sprite.y, this.model.mousePos.y, 0.02)
    }
}