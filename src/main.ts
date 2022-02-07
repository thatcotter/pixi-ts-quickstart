import * as PIXI from "pixi.js"
import * as dat from 'dat.gui'

let buttonData = {
    width: 100,
    height: 100,
    isOver: false,
    isPressed: false
}

let button = new PIXI.Graphics();
button.interactive = true
button.buttonMode = true
button.on('pointerover', () => {buttonData.isOver = true})
button.on('pointerout', () => {buttonData.isOver = false})
button.on('pointerdown', () => {buttonData.isPressed = true})
button.on('pointerup', () => {buttonData.isPressed = false})

const load = (app: PIXI.Application) => {
    return new Promise<void>((resolve) => {
        app.loader.add('assets/hello-world.png').load(() => {
            resolve();
        });
    });
};

const main = async () => {
    // Actual app
    let app = new PIXI.Application();

    // Display application properly
    document.body.style.margin = '0';
    app.renderer.view.style.position = 'absolute';
    app.renderer.view.style.display = 'block';

    // View size = windows
    app.renderer.resize(window.innerWidth, window.innerHeight);


    // set up gui
    const gui = new dat.GUI()

    gui.add(buttonData, 'width', 0, 200)
    gui.add(buttonData, 'height', 0, 200)


    // Load assets
    await load(app);
    let sprite = new PIXI.Sprite(
        app.loader.resources['assets/hello-world.png'].texture
    );
    sprite.x = window.innerWidth / 2 - sprite.width / 2;
    sprite.y = window.innerHeight / 2 - sprite.height / 2;


    app.stage.addChild(sprite);
    app.stage.addChild(button)

    // Handle window resizing
    window.addEventListener('resize', (_e) => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        sprite.x = window.innerWidth / 2 - sprite.width / 2;
        sprite.y = window.innerHeight / 2 - sprite.height / 2;
    });

    document.body.appendChild(app.view);
    document.body.appendChild(gui.domElement);


    let context = {
        velocity: { x: 1, y: 1 },
        sprite
    };

    app.ticker.add(update, context);
};

// Cannot be an arrow function. Arrow functions cannot have a 'this' parameter.
function update(this: any, delta: number) {
    if (this.sprite.x <= 0 || this.sprite.x >= window.innerWidth - this.sprite.width) {
        this.velocity.x = -this.velocity.x;
    }
    if (this.sprite.y <= 0 || this.sprite.y >= window.innerHeight - this.sprite.height) {
        this.velocity.y = -this.velocity.y;
    }
    this.sprite.x += this.velocity.x * delta;
    this.sprite.y += this.velocity.y;

    drawButton()
};

main();

function drawButton() {
    button.clear()
    if (buttonData.isPressed) {
        button.beginFill(0xffff00)
    } else if (buttonData.isOver) {
        button.beginFill(0xff00ff)
    } else {
        button.beginFill(0x0000ff)
    }
    button.drawRoundedRect(100, 100, buttonData.width, buttonData.height, 15)
}

