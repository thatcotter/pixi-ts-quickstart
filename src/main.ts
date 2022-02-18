import * as PIXI from 'pixi.js'
import { Model, SceneState } from './model/model'
import { SceneOne } from './views/sceneOne';
import { SceneTwo } from './views/sceneTwo';
import { gsap } from "gsap";
import * as filters from 'pixi-filters'
import { AdjustmentFilter } from 'pixi-filters';
import { guiSetup } from './controllers/gui';

let mModel = new Model();
let sceneOne: SceneOne = new SceneOne(mModel);
let sceneTwo: SceneTwo = new SceneTwo(mModel);

let tl = gsap.timeline();

let graphs: Array<PIXI.Graphics> = []
let sizes: Array<any> = []
let colors: Array<any> = []

const load = (app: PIXI.Application) => {
    return new Promise<void>((resolve) => {
        app.loader.add('world1', 'assets/hello-world.png').load(() => {
            resolve();
        });
    });
};

const main = async () => {
    // Actual app
    let app = new PIXI.Application({antialias: true, backgroundColor: 0x113311});

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
    sprite.y = 0// window.innerHeight/2

    sceneOne.sprite = sprite;
    sceneOne.container.addChild(sprite);

    app.stage.addChild(sceneOne.container);
    app.stage.addChild(sceneTwo.container);


	for (let i = 0; i < 10; i++) {
		const element = new PIXI.Graphics();
		element.x = window.innerWidth/2
		element.y = window.innerHeight/2

		element.x += 150 * Math.cos(i/10*Math.PI*2)
		element.y += 150 * Math.sin(i/10*Math.PI*2)	

		let adjustment = new filters.AdjustmentFilter();
		element.filters = [adjustment]

		graphs.push(element)
		app.stage.addChild(element)

		sizes[i] = {
			value: 10
		};

		colors[i] = {
			r: 1,
			g: 1,
			b: 1
		}
	}

    app.stage.interactive = true
    app.stage.hitArea = new PIXI.Polygon([
        0,0,
        window.innerWidth, 0,
        window.innerWidth, window.innerHeight,
        0, window.innerHeight
    ])

    app.stage.on('pointerdown', event => {
        mModel.mousePos.set(event.data.global.x, event.data.global.y)
		// console.log(colors)
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

    guiSetup(mModel, tl);


	sizes.forEach((size, i) => {
		tl.to(size,
			{
				value: 100,
				duration: 2
			}, "-=3.80")
		tl.to(colors[i],
			{
				r: Math.random(),
				g: Math.random(),
				b: Math.random(),
				duration: 4
			}, "<")
	})


    app.ticker.add(update);
};

// Cannot be an arrow function. Arrow functions cannot have a 'this' parameter.
function update(delta: number) {

    mModel.elapsedTime += delta;

	graphs.forEach((graph, i) => {
		graph.clear()
		if(graph.filters != null && 
            graph.filters[0] instanceof AdjustmentFilter) {
			graph.filters[0].red = colors[i].r;
			graph.filters[0].green = colors[i].g;
			graph.filters[0].blue = colors[i].b;
		}
		graph.beginFill(0xffffff)
		graph.drawCircle(0,0,sizes[i].value)
	})

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