let canvas = document.getElementById('output')
let bobData = null
let roomRenderer = null

class ImageCache {
	constructor() {
		this.canvases = {}
	}

	get(key, width, height, metafile) {
		const cacheKey = `${key}_${width}_${height}`
		const cached = this.canvases[cacheKey]
		if (cached)
			return cached
		
		const canvas = document.createElement('canvas')
		const ctx = canvas.getContext('2d')
		canvas.width = width
		canvas.height = height
		renderWMF(ctx, metafile, 0, 0, width, height)
		this.canvases[cacheKey] = canvas
		return canvas
	}

	clear() {
		this.canvases = {}
	}
}

class RoomRenderer {
	constructor(room, metafiles, animfiles) {
		this.cache = new ImageCache()

		this.room = room
		this.metafiles = metafiles
		this.animPlayers = {}
		for (let i = 0; i < room.objects.length; i++) {
			const obj = room.objects[i]
			if (obj.anim) {
				const animCanvas = document.createElement('canvas')
				animCanvas.width = 5
				animCanvas.height = 5

				const bp = new BobPack(animfiles[obj.anim])
				const br = new BobResource(bp.items[bp.names[0]])
				this.animPlayers[i] = new AniPlayer(br)
				this.animPlayers[i].canvas = animCanvas
				this.animPlayers[i].playAnimation(1)
				this.animPlayers[i].onPoseChange = () => this.draw(canvas)
			}
		}
	}

	cleanup() {
		for (const key of Object.keys(this.animPlayers))
			this.animPlayers[key].stopAnimation()
	}

	draw(canvas) {
		const ctx = canvas.getContext('2d')
		ctx.clearRect(0, 0, canvas.width, canvas.height)

		const scaleX = 10000 / canvas.width
		const scaleY = 10000 / canvas.height

		renderWMF(ctx, this.metafiles[this.room.background], 0, 0, canvas.width, canvas.height)
		for (let i = 0; i < this.room.objects.length; i++) {
			const obj = this.room.objects[i]
			console.log(obj)
			if (obj.anim) {
				const player = this.animPlayers[i]
				const animCanvas = player.canvas
				animCanvas.width = obj.w / scaleX
				animCanvas.height = obj.h / scaleY
				player.draw(animCanvas)
				ctx.drawImage(animCanvas, obj.x / scaleX, obj.y / scaleY)
			} else {
				const image = this.cache.get(obj.image, obj.w / scaleX, obj.h / scaleY, this.metafiles[obj.image])
				ctx.drawImage(image, obj.x / scaleX, obj.y / scaleY)
			}
		}
	}
}

function loadRoom(id) {
	const room = bobData.rooms[id]
	const metafiles = {}
	const animfiles = {}

	metafiles[room.background] = null
	for (const obj of room.objects) {
		if (obj.anim)
			animfiles[obj.anim] = null
		else
			metafiles[obj.image] = null
	}

	const metafileIDs = Object.keys(metafiles)
	const animfileNames = Object.keys(animfiles)
	let remaining = metafileIDs.length + animfileNames.length

	for (const id of metafileIDs) {
		const info = bobData.pictures[id]
		const path = 'upic/' + info.path.replace('\\', '/').replace('c:/', '').toLowerCase()
		fetch(path).then((response) => {
			response.arrayBuffer().then((buffer) => {
				metafiles[id] = buffer
				if (--remaining == 0)
					displayRoom(room, metafiles, animfiles)
			})
		})
	}

	for (const name of animfileNames) {
		const path = 'home/' + name.substring(name.lastIndexOf('\\') + 1).toLowerCase()
		fetch(path).then((response) => {
			response.arrayBuffer().then((buffer) => {
				animfiles[name] = buffer
				if (--remaining == 0)
					displayRoom(room, metafiles, animfiles)
			})
		})
	}
}

function displayRoom(room=null, metafiles=null, animfiles=null) {
	if (roomRenderer)
		roomRenderer.cleanup()
	roomRenderer = new RoomRenderer(room, metafiles, animfiles)
	roomRenderer.draw(canvas)
}

function setCanvasSize() {
	const ratio = window.devicePixelRatio || 1
	const w = document.body.clientWidth, h = document.body.clientHeight
	if (ratio == 1) {
		canvas.width = w
		canvas.height = h
	} else {
		canvas.width = w * ratio
		canvas.height = h * ratio
		canvas.style.width = `${w}px`
		canvas.style.height = `${h}px`
	}

	if (roomRenderer) {
		roomRenderer.cache.clear()
		roomRenderer.draw(canvas)
	}
}

function displayRoomList() {
	const list = document.getElementById('roomList')
	for (const roomID of Object.keys(bobData.rooms)) {
		const room = bobData.rooms[roomID]
		const button = document.createElement('button')
		button.textContent = room.name
		button.addEventListener('click', () => loadRoom(roomID))
		list.appendChild(button)
	}
}

function setupRoomDemo() {
	fetch('data.json').then((response) => {
		response.json().then((blob) => {
			bobData = blob
			displayRoomList()
			loadRoom(45)
		})
	})

	window.addEventListener('resize', setCanvasSize)
	setCanvasSize()
}

setupRoomDemo()

