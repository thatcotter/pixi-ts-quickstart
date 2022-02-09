import * as PIXI from 'pixi.js'
import * as dat from 'dat.gui'
import { Model, SceneState } from './model'
import { Scene } from './scene'
import { SceneOne } from './sceneOne';
import { SceneTwo } from './sceneTwo';

let mModel = new Model();
let sceneOne: SceneOne = new SceneOne(mModel);
let sceneTwo: SceneTwo = new SceneTwo(mModel);

let graphics: PIXI.Graphics;


const load = (app: PIXI.Application) => {
    return new Promise<void>((resolve) => {
        app.loader.add('assets/hello-world.png').load(() => {
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

    graphics = new PIXI.Graphics();
    app.stage.addChild(graphics)


    // app.stage.addChild(sprite);
    // let cont = new PIXI.Container();
    app.stage.addChild(sceneOne.container);
    app.stage.addChild(sceneTwo.container);

    // Handle window resizing
    window.addEventListener('resize', (_e) => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        // sprite.x = window.innerWidth / 2 - sprite.width / 2;
        // sprite.y = window.innerHeight / 2 - sprite.height / 2;
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

