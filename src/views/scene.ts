import { Container, Graphics } from "pixi.js";
import { Button } from "../components/button";
import { Model } from "../model/model";

export class Scene {
    model: Model;
    container: Container;
    button: Button;

    constructor(model: Model) {
        this.model = model;

        this.container = new Container();
        this.container.sortableChildren = true;
        this.container.width = window.innerWidth
        this.container.height = window.innerHeight

        this.button = new Button(0,0,200,100,"Button");
        this.button.root.zIndex = 100;
        this.button.on('pointerover', () => { this.button.isOver = true })
        this.button.on('pointerout', () => { this.button.isOver = false })
        this.button.on('pointerdown', () => { this.button.isPressed = true })
        this.button.on('pointerup', () => { this.button.isPressed = false })

        this.container.addChild(this.button.root)
    }

    update() { }
}