import * as dat from 'dat.gui'
import { Model } from '../model/model'
import { Timeline } from '../utils/interfaces'

export function guiSetup(model: Model, tl: Timeline): void {
    const gui = new dat.GUI()
    
    let buttonFolder = gui.addFolder("button params")
    buttonFolder.add(model.getInstance().buttonData, 'width', 0, 200)
    buttonFolder.add(model.getInstance().buttonData, 'height', 0, 200)
    buttonFolder.addColor(model.getInstance().buttonData, 'firstColor')
    buttonFolder.addColor(model.getInstance().buttonData, 'secondColor')

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
}