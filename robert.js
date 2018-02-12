class BobPack {
	constructor(buffer) {
		const dv = new DataView(buffer)
		const magic = dv.getUint16(0)
		const majorVersion = dv.getUint16(2, true)
		const minorVersion = dv.getUint16(4, true)
		const itemCount = dv.getUint16(6, true)
		const nameTableSize = dv.getUint16(8, true)

		const offsetTable = new Uint32Array(buffer.slice(10, 10 + (itemCount + 1) * 4))
		const rawNameTable = new Uint8Array(buffer, 10 + offsetTable.byteLength, nameTableSize)
		const nameTable = String.fromCharCode(...rawNameTable).split('\0')

		this.names = []
		this.items = {}
		for (let i = 0; i < itemCount; i++) {
			const name = nameTable[i]
			const itemBuffer = buffer.slice(offsetTable[i], offsetTable[i + 1])

			this.names.push(name)
			this.items[name] = itemBuffer
		}
	}
}

function readBlobArray(buffer, baseStart, indexStart, indexEnd) {
	const result = []
	const count = ((indexEnd - indexStart) / 4) - 1
	const indexData = buffer.slice(indexStart, indexEnd)
	const indices = new Uint32Array(indexData)

	for (let i = 0; i < count; i++) {
		const blob = buffer.slice(baseStart + indices[i], baseStart + indices[i + 1])
		result.push(blob)
	}

	return result
}

function readGroupedBlobArray(buffer, baseStart, indexStart, indexEnd) {
	if (indexStart == indexEnd)
		return {}

	const result = {}
	const dv = new DataView(buffer)
	const groupCount = dv.getUint32(indexStart, true)
	const entryCount = ((indexEnd - indexStart - 4) / 6)
	let entryPosition = indexStart + 4 + (groupCount * 6)

	for (let i = 0; i < groupCount; i++) {
		const groupMetaOffset = indexStart + 4 + i * 6
		const groupID = dv.getUint16(groupMetaOffset, true)
		const groupSize = dv.getUint16(groupMetaOffset + 2, true)
		const groupBase = dv.getUint16(groupMetaOffset + 4, true)
		const group = []

		for (let j = 0; j < groupSize; j++) {
			const blobStart = baseStart + dv.getUint32(entryPosition, true)
			const blobSize = dv.getUint16(entryPosition + 4, true)
			const blob = buffer.slice(blobStart, blobStart + blobSize)
			group.push(blob)
			entryPosition += 6
		}
		result[groupID] = group
	}

	return result
}

class BobResource {
	constructor(buffer) {
		const dv = new DataView(buffer)
		const resourceType = dv.getUint16(2, true)
		this.width = dv.getInt16(8, true)
		this.height = dv.getInt16(10, true)
		const payloadBase = dv.getUint32(0x26, true)
		const payloadOffsetBase = dv.getUint32(0x2A, true)
		const riffBase = dv.getUint32(0x2E, true)
		const riffOffsetBase = dv.getUint32(0x32, true)
		const animBase = dv.getUint32(0x36, true)
		const animOffsetBase = dv.getUint32(0x3A, true)
		const stringBase = dv.getUint32(0x3E, true)
		const stringOffsetBase = dv.getUint32(0x42, true)

		this.rawPayloads = readBlobArray(buffer, payloadBase, payloadOffsetBase, riffBase)
		this.riffs = readBlobArray(buffer, riffBase, riffOffsetBase, animBase)
		this.riffCache = {}
		this.rawAnims = readGroupedBlobArray(buffer, animBase, animOffsetBase, stringBase)
		this.strings = readGroupedBlobArray(buffer, stringBase, stringOffsetBase, buffer.byteLength)

		this.readPoses()
		this.readAnims()
	}

	cleanup() {
		this.clearRiffCache()
	}

	readPoses() {
		this.poses = {}
		for (let i = 0; i < this.rawPayloads.length; i++) {
			const payload = this.rawPayloads[i]
			const dv = new DataView(payload)
			const magic32 = dv.getUint32(0, true)
			if (magic32 == 0x9AC6CDD7)
				continue // this is a metafile
			
			const pose = []
			const count = dv.getUint16(2, true)

			for (let j = 0; j < count; j++) {
				const offset = 4 + j * 10
				const imageID = dv.getUint16(offset, true)
				const a = dv.getInt16(offset + 2, true)
				const b = dv.getInt16(offset + 4, true)
				const c = dv.getInt16(offset + 6, true)
				const d = dv.getInt16(offset + 8, true)
				pose.push([imageID, a, b, c, d])
			}
			this.poses[i] = pose
		}
	}

	readAnims() {
		this.anims = {}
		for (const groupID of Object.keys(this.rawAnims)) {
			const rawGroup = this.rawAnims[groupID]
			const group = this.anims[groupID] = []

			for (const rawAnim of rawGroup) {
				const dv = new DataView(rawAnim)
				const unk = dv.getUint16(0, true)
				console.log(unk)
				const count = dv.getUint16(2, true)
				const commands = []

				for (let i = 0; i < count; i++) {
					const offset = 4 + i * 6
					const command = dv.getUint16(offset, true)
					if (command < 0 || command > 2) console.log('!!!')
					const b = dv.getUint16(offset + 2, true)
					const c = dv.getUint16(offset + 4, true)
					commands.push([command, b, c])
				}

				group.push(commands)
			}
		}
	}

	getRiff(id) {
		if (this.riffCache[id] !== undefined)
			return this.riffCache[id]
		
		const buffer = this.riffs[id]
		const url = URL.createObjectURL(new Blob([buffer], {type: 'audio/wave'}))
		this.riffCache[id] = url
		return url
	}

	clearRiffCache() {
		for (const key of Object.keys(this.riffCache))
			URL.revokeObjectURL(this.riffCache[key])
		this.riffCache = {}
	}
}


function renderPose(canvas, sourceW, sourceH, pose, metafiles, scale, wireframe) {
	const ctx = canvas.getContext('2d')
	//ctx.fillStyle = 'aqua'
	//ctx.fillRect(0, 0, canvas.width, canvas.height)
	ctx.clearRect(0, 0, canvas.width, canvas.height)

	if (pose === undefined)
		return

	const scaleX = canvas.width / sourceW
	const scaleY = canvas.height / sourceH

	for (let i = 0; i < pose.length; i++) {
		const piece = pose[i]
		const image = metafiles[piece[0]]
		const left = piece[1] * scaleX
		const top = piece[2] * scaleY
		const right = piece[3]  * scaleX
		const bottom = piece[4] * scaleY
		renderWMF(ctx, image, left, top, right, bottom)
	}

	if (wireframe) {
		ctx.strokeStyle = 'blue'
		ctx.lineWidth = 1
		for (let i = 0; i < pose.length; i++) {
			const piece = pose[i]
			const image = metafiles[piece[0]]
			ctx.strokeStyle = (i == 10) ? 'red' : 'blue'
			ctx.strokeRect(piece[1] * scaleX, piece[2] * scaleY, (piece[3] - piece[1]) * scaleX, (piece[4] - piece[2]) * scaleY)
		}
	}
}


class AniPlayer {
	constructor(resource) {
		this.resource = resource
		this.timer = null
		this.callback = null
		this.stepAnimation = this.stepAnimation.bind(this)

		this.pose = null
		this.onPoseChange = null
	}

	playAnimation(id, callback) {
		this.stopAnimation()

		const animGroup = this.resource.anims[id]
		const anim = animGroup[Math.floor(Math.random() * animGroup.length)]
		this.currentAnim = anim
		this.commandNumber = 0
		this.callback = callback
		this.stepAnimation()
	}

	stopAnimation() {
		if (this.timer !== null) {
			clearTimeout(this.timer)
			this.timer = null
		}
		if (this.callback) {
			this.callback(true)
			this.callback = null
		}
	}

	stepAnimation() {
		this.timer = null

		while (this.timer == null) {
			const command = this.currentAnim[this.commandNumber]
			let nextCommand = this.commandNumber + 1
			if (command == undefined) {
				// reached the end
				if (this.callback) {
					this.callback(false)
					this.callback = null
				}
				return
			}

			switch (command[0]) {
				case 0:
					// Set Pose
					console.log(`pose ${command[1]}`)
					this.pose = this.resource.poses[command[1]]
					if (this.onPoseChange)
						this.onPoseChange()
					if (command[2] > 0)
						this.timer = setTimeout(this.stepAnimation, command[2])
					break
				case 1:
					// Jump
					const randomNumber = Math.floor(Math.random() * 0x7FFF)
					if (randomNumber < command[2])
						nextCommand = command[1]
					break
				case 2:
					// Sound
					console.log(`Play sound ${command[1]}!`)
					const riff = this.resource.getRiff(command[1])
					const audio = new Audio(riff)
					audio.play()
					break
			}

			this.commandNumber = nextCommand
		}
	}

	draw(canvas, wireframe=false) {
		renderPose(canvas,
			this.resource.width, this.resource.height,
			this.pose, this.resource.rawPayloads, 1, wireframe)
	}

}