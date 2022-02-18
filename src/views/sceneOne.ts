import { Point, Polygon, Sprite } from 'pixi.js'
import { easeIn, easeOut, lerp } from '../utils/easing';
import { Model, SceneState } from '../model/model'
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

        this.button.fill = parseInt(tempColor);
        this.button.width = this.model.buttonData.width;
        this.button.height = this.model.buttonData.height;
        this.button.update()

		// this.sprite.y = lerp(this.sprite.y, this.model.mousePos.y, easeOut(0.05))

		// this.sprite.x = lerp(this.sprite.x, this.model.mousePos.x, easeOut(0.075))


		// this.sprite.x = window.innerWidth/2 + Math.cos(this.model.elapsedTime * 0.05) * 100

		// this.sprite.y = window.innerHeight/2 + Math.sin(this.model.elapsedTime * 0.0125) * 100

		// this.sprite.scale.set(Math.cos(this.model.elapsedTime * 0.05) * 0.5, Math.sin(this.model.elapsedTime * 0.0125) * 0.5)

		// this.sprite.alpha = (Math.cos(this.model.elapsedTime * 0.125) + 1) * 0.5;

        // this.sprite.x = 
        //     lerp(this.sprite.x, this.model.mousePos.x, 0.02)

        // this.sprite.y = 
        //     lerp(this.sprite.y, this.model.mousePos.y, 0.02)
    }
}