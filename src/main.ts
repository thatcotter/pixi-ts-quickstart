import * as PIXI from "pixi.js"
<<<<<<< HEAD
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
=======
import * as Filters from 'pixi-filters'

const load = (app: PIXI.Application) => {
    return new Promise<void>((resolve) => {
        app.loader
            .add('world', 'assets/hello-world.png')
            .add('shader', 'assets/shader.frag')
            .load(() => {
>>>>>>> 666c727ddea2ca8d6d022160aca2bacfd12136a1
            resolve();
        });
    });
};

const main = async () => {
    // Actual app
<<<<<<< HEAD
    let app = new PIXI.Application();
=======
    let app = new PIXI.Application({antialias: true});
>>>>>>> 666c727ddea2ca8d6d022160aca2bacfd12136a1

    // Display application properly
    document.body.style.margin = '0';
    app.renderer.view.style.position = 'absolute';
    app.renderer.view.style.display = 'block';

    // View size = windows
    app.renderer.resize(window.innerWidth, window.innerHeight);

<<<<<<< HEAD

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
=======
    // Load assets
    await load(app);

    // let container = new PIXI.Container();
    // container.x = window.innerWidth / 2;
    // container.y = window.innerHeight / 2;
    // app.stage.addChild(container);


    let sprite = new PIXI.Sprite(
        app.loader.resources.world.texture
    );
    sprite.anchor.set(0.5, 0.5)
    sprite.scale.set(0.5,0.5)
    sprite.x = window.innerWidth / 2;
    sprite.y = window.innerHeight / 2;
    let myFilter = new PIXI.Filter(undefined, app.loader.resources.shader.data, {time: 0});
    sprite.filters = [myFilter]
    app.stage.addChild(sprite);

    // let sprite2 = new PIXI.Sprite( app.loader.resources.world.texture);
    // sprite2.anchor.set(0.5, 0.5)
    // sprite2.scale.set(0.5,0.5)
    // sprite2.x = 200
    // container.addChild(sprite2)

    // let sprite3 = new PIXI.Sprite( app.loader.resources.world.texture);
    // sprite3.anchor.set(0.5, 0.5)
    // sprite3.scale.set(0.5,0.5)
    // sprite3.y = 200
    // container.addChild(sprite3)

    // let sprite4 = new PIXI.Sprite( app.loader.resources.world.texture);
    // sprite4.anchor.set(0.5, 0.5)
    // sprite4.scale.set(0.5,0.5)
    // sprite4.y = -200
    // container.addChild(sprite4)
>>>>>>> 666c727ddea2ca8d6d022160aca2bacfd12136a1

    // Handle window resizing
    window.addEventListener('resize', (_e) => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        sprite.x = window.innerWidth / 2 - sprite.width / 2;
        sprite.y = window.innerHeight / 2 - sprite.height / 2;
<<<<<<< HEAD
    });

    document.body.appendChild(app.view);
    document.body.appendChild(gui.domElement);


    let context = {
        velocity: { x: 1, y: 1 },
        sprite
=======
        // container.x = window.innerWidth / 2
        // container.y = window.innerHeight / 2
    });

    document.body.appendChild(app.view);

    let time = 0

    let context = {
        velocity: { x: 1, y: 1 },
        sprite,
        time
>>>>>>> 666c727ddea2ca8d6d022160aca2bacfd12136a1
    };

    app.ticker.add(update, context);
};

// Cannot be an arrow function. Arrow functions cannot have a 'this' parameter.
function update(this: any, delta: number) {
<<<<<<< HEAD
    if (this.sprite.x <= 0 || this.sprite.x >= window.innerWidth - this.sprite.width) {
        this.velocity.x = -this.velocity.x;
    }
    if (this.sprite.y <= 0 || this.sprite.y >= window.innerHeight - this.sprite.height) {
        this.velocity.y = -this.velocity.y;
    }
    this.sprite.x += this.velocity.x * delta;
    this.sprite.y += this.velocity.y;

    drawButton()
=======
    // if (this.container.x <= 0 || this.container.x >= window.innerWidth - this.container.width) {
    //     this.velocity.x = -this.velocity.x;
    // }
    // if (this.container.y <= 0 || this.container.y >= window.innerHeight - this.container.height) {
    //     this.velocity.y = -this.velocity.y;
    // }

    this.time += delta * 0.05;

    this.sprite.filters[0].uniforms.time = this.time;

    // this.sprite.filters[0].angle = Math.sin(this.time) * 10

    // this.sprite.filters[0].blur = (Math.sin(this.time) + 1) / 2 * 15

    // this.container.scale.set(
    //     (Math.cos(this.time) + 1) / 2,
    //     (Math.sin(this.time) + 1) / 2
    // )

    // this.container.angle += delta;
    // this.container.x += this.velocity.x * delta;
    // this.container.y += this.velocity.y * delta;
>>>>>>> 666c727ddea2ca8d6d022160aca2bacfd12136a1
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

