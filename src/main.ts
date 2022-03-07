import * as PIXI from "pixi.js";
import { gsap } from 'gsap';
import { easeIn, easeOut, lerp } from './utils/easing';
import { wrapYoyo } from 'gsap/all';
import { guiSetup } from "./controllers/gui";
import { Model, SceneState } from "./model/model";
import { SceneOne } from "./views/sceneOne";
import { SceneTwo } from "./views/sceneTwo";
import { Scene } from "./views/scene";
import { Timeline } from "./utils/interfaces";

let app: PIXI.Application;
let tl: Timeline;
let mModel: Model;
let sceneOne: Scene;
let sceneTwo: Scene;

const main = async () => {
    app = new PIXI.Application();
    mModel = Model.getInstance(app);
    tl = gsap.timeline();

    // Display application properly
    document.body.style.margin = '0';
    app.renderer.view.style.position = 'absolute';
    app.renderer.view.style.display = 'block';
    app.renderer.backgroundColor = 0xE9FFC2;

    // View size = windows
    app.renderer.resize(window.innerWidth, window.innerHeight);

    sceneOne = new SceneOne(mModel);
    app.stage.addChild(sceneOne.container);

    sceneTwo = new SceneTwo(mModel);
    app.stage.addChild(sceneTwo.container);

    // Handle window resizing
    window.addEventListener('resize', (_e) => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
    });

    document.body.appendChild(app.view);

    guiSetup(Model.getInstance(), tl);

    app.ticker.add(update)
};

function update(delta:number) {
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
}

main();