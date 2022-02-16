import * as PIXI from 'pixi.js'
import * as dat from 'dat.gui'
import { Model, SceneState } from './model'
import { SceneOne } from './sceneOne';
import { SceneTwo } from './sceneTwo';
import { gsap } from "gsap";
import { easeIn, easeOut } from './easing';

import * as filters from 'pixi-filters'

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
    sprite.y = 0// window.innerHeight/2

    sceneOne.sprite = sprite;
    sceneOne.container.addChild(sprite);

    // app.stage.addChild(sceneOne.container);
    // app.stage.addChild(sceneTwo.container);


	for (let i = 0; i < 10; i++) {
		const element = new PIXI.Graphics();
		element.x = window.innerWidth/2
		element.y = window.innerHeight/2

		element.x += 150 * Math.cos(i/10*Math.PI*2)
		element.y += 150 * Math.sin(i/10*Math.PI*2)

		element.filters = [new filters.AdjustmentFilter()]

		// console.log(element.filters[0])
		// element.filters[0].red = 0;

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
		console.log(colors)
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

	let timelineFolder = gui.addFolder("timeline")
	timelineFolder.open()

	let tlCallbacks = {
		pause: () => tl.pause(),
		play: () => tl.play(),
		reverse: () => tl.reverse(),
		progress: 0
	}

	timelineFolder.add(tlCallbacks, "pause")
	timelineFolder.add(tlCallbacks, "play")
	timelineFolder.add(tlCallbacks, "reverse")
	timelineFolder.add(tlCallbacks, "progress", 0.0, 1.0, 0.01).onChange((value) => {
		tl.play()
		tl.progress(value)
		tl.pause()
	})

	sizes.forEach((size, i) => {
		tl.to(sizes[i],
			{
				value: 100,
				duration: 3
			}, "-=2.5")
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

	// graphs.forEach((graph, i) => {
	// 	graph.clear()
	// 	graph.beginFill(colors[i].value)
	// 	graph.drawCircle(0,0,sizes[i].value)
	// })

	for (let i = 0; i < graphs.length; i++) {
		// const element = graph[i];
		graphs[i].clear()
		graphs[i].filters[0].red = colors[i].r
		graphs[i].filters[0].green = colors[i].g
		graphs[i].filters[0].blue = colors[i].b
		graphs[i].beginFill(0xffffff)
		graphs[i].drawCircle(0,0,sizes[i].value)
	}


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

