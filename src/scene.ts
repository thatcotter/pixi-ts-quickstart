import { Container, Graphics } from "pixi.js";
import { Model } from "./model";

export class Scene {
    model: Model;
    container: Container;
    button: Graphics;
    isOver = false;
    isPressed = false;

    constructor(model: Model) {
        this.model = model;

        this.container = new Container();
        this.container.width = window.innerWidth
        this.container.height = window.innerHeight

        this.button = new Graphics();
        this.button.interactive = true;
        this.button.buttonMode = true;
        this.button.on('pointerover', () => { this.isOver = true })
        this.button.on('pointerout', () => { this.isOver = false })
        // this.button.on('pointerdown', () => { this.isPressed = true })
        this.button.on('pointerup', () => { this.isPressed = false })

        this.container.addChild(this.button)
    }

    update() { }
}