import * as PIXI from "pixi.js"
import * as Filters from 'pixi-filters'

const load = (app: PIXI.Application) => {
    return new Promise<void>((resolve) => {
        app.loader
            .add('world', 'assets/hello-world.png')
            .add('shader', 'assets/shader.frag')
            .load(() => {
            resolve();
        });
    });
};

const main = async () => {
    // Actual app
    let app = new PIXI.Application({antialias: true});

    // Display application properly
    document.body.style.margin = '0';
    app.renderer.view.style.position = 'absolute';
    app.renderer.view.style.display = 'block';

    // View size = windows
    app.renderer.resize(window.innerWidth, window.innerHeight);

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

    // Handle window resizing
    window.addEventListener('resize', (_e) => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        sprite.x = window.innerWidth / 2 - sprite.width / 2;
        sprite.y = window.innerHeight / 2 - sprite.height / 2;
        // container.x = window.innerWidth / 2
        // container.y = window.innerHeight / 2
    });

    document.body.appendChild(app.view);

    let time = 0

    let context = {
        velocity: { x: 1, y: 1 },
        sprite,
        time
    };

    app.ticker.add(update, context);
};

// Cannot be an arrow function. Arrow functions cannot have a 'this' parameter.
function update(this: any, delta: number) {
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
};

main();

