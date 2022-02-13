import * as PIXI from 'pixi.js'
import * as dat from 'dat.gui'
// import { gsap } from 'gsap'
import { Model, SceneState } from './model'
import { SceneOne } from './sceneOne';
import { SceneTwo } from './sceneTwo';
// import { easeIn, easeInOut, easeOut, lerp } from './easing';
// import { wrapYoyo } from 'gsap/all';

let mModel = new Model();
let sceneOne: SceneOne = new SceneOne(mModel);
let sceneTwo: SceneTwo = new SceneTwo(mModel);

const load = (app: PIXI.Application) => {
    return new Promise<void>((resolve) => {
        app.loader.add('world1', 'assets/hello-world.png').load(() => {
            resolve();
        });
    });
};

const main = async () => {
    // Actual app
    let app = new PIXI.Application({antialias: true, backgroundColor: 0x111111});

    // Display application properly
    document.body.style.margin = '0';
    app.renderer.view.style.position = 'absolute';
    app.renderer.view.style.display = 'block';

    // View size = windows
    app.renderer.resize(window.innerWidth, window.innerHeight);

    // Load assets
    await load(app);

    let sprite = new PIXI.Sprite(app.loader.resources[`world1`].texture);
    sprite.scale.set(0.5, 0.5)
    sprite.anchor.set(0.5, 0.5)
    sprite.interactive = true;

    sprite.x = window.innerWidth/2
    sprite.y = window.innerHeight/2

    sceneOne.sprite = sprite;
    sceneOne.container.addChild(sprite);

    app.stage.addChild(sceneOne.container);
    app.stage.addChild(sceneTwo.container);

    app.stage.interactive = true


    app.stage.hitArea = new PIXI.Polygon([
        0,0,
        window.innerWidth, 0,
        window.innerWidth, window.innerHeight,
        0, window.innerHeight
    ])
    app.stage.on('pointerdown', event => {
        mModel.mousePos.set(event.data.global.x, event.data.global.y)
        // let tween = gsap.fromTo(sceneOne.sprite,
        //     {
        //         x: sprite.x,
        //         y: sprite.y
        //     },
        //     {
        //         x: mModel.mousePos.x, 
        //         y: mModel.mousePos.y,
        //         angle: sceneOne.sprite.angle + 360,
        //         duration: 1,
        //         ease: "elastic.out",
        //         yoyo: true,
        //         yoyoEase: "expo.inOut",
        //         repeat: 1
        //     })
    })

    // Handle window resizing
    window.addEventListener('resize', (_e) => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        app.stage.hitArea = new PIXI.Polygon([
            0,0,
            window.innerWidth, 0,
            window.innerWidth, window.innerHeight,
            0, window.innerHeight
        ]);
    });

    document.body.appendChild(app.view);

    const gui = new dat.GUI()
    gui.add(mModel.getInstance().buttonData, 'width', 0, 200)
    gui.add(mModel.getInstance().buttonData, 'height', 0, 200)
    gui.addColor(mModel.getInstance().buttonData, 'firstColor')
    gui.addColor(mModel.getInstance().buttonData, 'secondColor')


    app.ticker.add(update);
};

// Cannot be an arrow function. Arrow functions cannot have a 'this' parameter.
function update(delta: number) {

    mModel.elapsedTime += delta;

    switch (mModel.sceneState) {
        case SceneState.first:
            sceneOne.container.visible = true;
            sceneTwo.container.visible = false;
            sceneOne.update();
            break;
        
        case SceneState.second:
            sceneOne.container.visible = false;
            sceneTwo.container.visible = true;
            sceneTwo.update();
            break;
    
        default:
            break;
    }
};

main();

