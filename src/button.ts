import { Container, Graphics, Point, Text } from "pixi.js";

export class Button {
    root: Container = new Container();
    graphics: Graphics = new Graphics();
    text: Text;

    fill = 0x00ff00;
    hoverFill = 0x0000ff;
    clickFill = 0xff0000;
    width = 200;
    height = 100;
    radius = 15;
    position: Point;

    isOver = false;
    isPressed = false;

    constructor(x: number, y: number, w: number, h: number, text?: string) {
        this.position = new Point(x, y)
        this.width = w;
        this.height = h;

        this.graphics.interactive = true;
        this.graphics.buttonMode = true;
        this.graphics.on('pointerover', () => {this.isOver = true})
        this.graphics.on('pointerout', () => {this.isOver = false})
        this.graphics.on('pointerdown', () => {this.isPressed = true})
        this.graphics.on('pointerup', () => {this.isPressed = false})

        this.text = new Text(text ? text : '')
        this.text.anchor.set(0.5, 0.5)

        this.root.addChild(this.graphics)
        this.root.addChild(this.text)
    }

    update() {
        this.root.position.set(this.position.x, this.position.y);
        this.graphics.clear()
        if(this.isOver){
            this.graphics.beginFill(this.hoverFill);
        } else if (this.isPressed) {
            this.graphics.beginFill(this.clickFill);
        } else {
            this.graphics.beginFill(this.fill);
        }
        this.graphics.drawRoundedRect(0, 0, this.width, this.height, this.radius)
        this.text.position.set(this.width / 2, this.height / 2)
    }

    on(eventType: string, callback: EventListener) {
        this.graphics.on(eventType, callback)
    }
}