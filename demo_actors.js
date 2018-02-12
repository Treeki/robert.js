let bobWireframe = false
let canvas = document.getElementById('output')
let player = null

const samplePaths = [
	'Bob Assistants',
	['Baudelaire', 'actors/baud.act'],
	['Blythe', 'actors/blythe.act'],
	['Chaos', 'actors/chaos.act'],
	['Chaz', 'actors/chaz.act'],
	['The Dot', 'actors/dot.act'],
	['Hopper', 'actors/hopper.act'],
	['Java', 'actors/java.act'],
	['Lucy', 'actors/lucy.act'],
	['Orby', 'actors/orby.act'],
	['Rover', 'actors/rover.act'],
	['Ruby', 'actors/ruby.act'],
	['Scuzz', 'actors/scuzz.act'],
	['Shelly', 'actors/shelly.act'],
	['Will', 'actors/will.act'],
	['Digger', 'actors/worm.act'],
	['Speaker', 'actors/zspeaker.act'],
	['Invisible', 'actors/zvisible.act'],
	'Office Assistants',
	['Clippit', 'actors/clippit.act'],
	['Dot', 'actors/dot.acp'],
	['Hover', 'actors/hoverbot.acp'],
	['Office Logo', 'actors/logo.act'],
	['Powerpup', 'actors/powerpup.acp'],
	['Scribble', 'actors/scribble.acp'],
	['Will', 'actors/will.acp'],
	// different animation systems, cannot work with this code right now :<
	//['Genius', 'genius.acp'],
	//['Mother Nature', 'mnature.acp'],
	'Bob Misc',
	['Fireplace', 'home/fire.ani'],
	['GeoSafari', 'home/geosafar.ani'],
	['Lava Lamp', 'home/lavalamp.ani'],
	['Toy Chest', 'home/toychest.ani'],
	['Dragon', 'home/dragon.ani'],
	['Slideshow', 'home/slidesho.ani'],
]



function loadFile(filename) {
	if (player) {
		player.stopAnimation()
		player.resource.cleanup()
	}
	canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
	player = null

	const buttonHolder = document.getElementById('animbuttons')
	while (buttonHolder.firstChild)
		buttonHolder.removeChild(buttonHolder.firstChild)
	
	fetch(filename).then((response) => {
		response.arrayBuffer().then((buffer) => {
			const bp = new BobPack(buffer)
			const br = new BobResource(bp.items[bp.names[0]])
			player = new AniPlayer(br)
			player.onPoseChange = () => player.draw(canvas, bobWireframe)

			let playing = null

			for (const num of Object.keys(br.anims)) {
				const button = document.createElement('button')
				button.textContent = num
				button.addEventListener('click', () => {
					if (playing == num) {
						player.stopAnimation()
					} else {
						player.playAnimation(num, (cancelled) => {
							button.style.background = ''
							playing = null
						})
						button.style.background = 'green'
						playing = num
					}
				})
				buttonHolder.appendChild(button)
			}
		})
	})
}

function setupActorDemo() {
	const ratio = window.devicePixelRatio || 1
	if (ratio != 1) {
		canvas.style.width = `${canvas.width}px`
		canvas.style.height = `${canvas.height}px`
		canvas.width *= ratio
		canvas.height *= ratio
	}

	const loadbuttons = document.getElementById('loadbuttons')
	for (const sample of samplePaths) {
		if (typeof sample === 'string') {
			const heading = document.createElement('div')
			heading.className = 'loadHeading'
			heading.textContent = sample
			loadbuttons.appendChild(heading)
		} else {
			const title = sample[0], path = sample[1]
			const button = document.createElement('button')
			button.textContent = title
			button.addEventListener('click', () => {
				loadFile(path)
			})
			loadbuttons.appendChild(button)
		}
	}

	const wireframeCheckbox = document.getElementById('wireframe')
	wireframeCheckbox.addEventListener('change', () => {
		bobWireframe = wireframeCheckbox.checked
	})

	loadFile('actors/rover.act')
}

setupActorDemo()
