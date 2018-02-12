const WMF_META = {
	EOF: 0,
	REALIZEPALETTE: 0x35,
	SETPALENTRIES: 0x37,
	SETBKMODE: 0x102,
	SETMAPMODE: 0x103,
	SETROP2: 0x104,
	SETRELABS: 0x105,
	SETPOLYFILLMODE: 0x106,
	SETSTRETCHBLTMODE: 0x107,
	SETTEXTCHAREXTRA: 0x108,
	RESTOREDC: 0x127,
	RESIZEPALETTE: 0x139,
	DIBCREATEPATTERNBRUSH: 0x142,
	SETLAYOUT: 0x149,
	SETBKCOLOR: 0x201,
	SETTEXTCOLOR: 0x209,
	OFFSETVIEWPORTORG: 0x211,
	LINETO: 0x213,
	MOVETO: 0x214,
	OFFSETCLIPRGN: 0x220,
	FILLREGION: 0x228,
	SETMAPPERFLAGS: 0x231,
	SELECTPALETTE: 0x234,
	POLYGON: 0x324,
	POLYLINE: 0x325,
	SETTEXTJUSTIFICATION: 0x20A,
	SETWINDOWORG: 0x20B,
	SETWINDOWEXT: 0x20C,
	SETVIEWPORTORG: 0x20D,
	SETVIEWPORTEXT: 0x20E,
	OFFSETWINDOWORG: 0x20F,
	SCALEWINDOWEXT: 0x410,
	SCALEVIEWPORTEXT: 0x412,
	EXCLUDECLIPRECT: 0x415,
	INTERSECTCLIPRECT: 0x416,
	ELLIPSE: 0x418,
	FLOODFILL: 0x419,
	FRAMEREGION: 0x429,
	ANIMATEPALETTE: 0x436,
	TEXTOUT: 0x521,
	POLYPOLYGON: 0x538,
	EXTFLOODFILL: 0x548,
	RECTANGLE: 0x41B,
	SETPIXEL: 0x41F,
	ROUNDRECT: 0x61C,
	PATBLT: 0x61D,
	SAVEDC: 0x01E,
	PIE: 0x81A,
	STRETCHBLT: 0xB23,
	ESCAPE: 0x626,
	INVERTREGION: 0x12A,
	PAINTREGION: 0x12B,
	SELECTCLIPREGION: 0x12C,
	SELECTOBJECT: 0x12D,
	SETTEXTALIGN: 0x12E,
	ARC: 0x817,
	CHORD: 0x830,
	BITBLT: 0x922,
	EXTTEXTOUT: 0xa32,
	SETDIBTODEV: 0xd33,
	DIBBITBLT: 0x940,
	DIBSTRETCHBLT: 0xb41,
	STRETCHDIB: 0xf43,
	DELETEOBJECT: 0x1f0,
	CREATEPALETTE: 0x0f7,
	CREATEPATTERNBRUSH: 0x1F9,
	CREATEPENINDIRECT: 0x2FA,
	CREATEFONTINDIRECT: 0x2FB,
	CREATEBRUSHINDIRECT: 0x2FC,
	CREATEREGION: 0x6FF
}

reverseMap = {
	0: 'EOF',
	0x35: 'REALIZEPALETTE',
	0x37: 'SETPALENTRIES',
	0x102: 'SETBKMODE',
	0x103: 'SETMAPMODE',
	0x104: 'SETROP2',
	0x105: 'SETRELABS',
	0x106: 'SETPOLYFILLMODE',
	0x107: 'SETSTRETCHBLTMODE',
	0x108: 'SETTEXTCHAREXTRA',
	0x127: 'RESTOREDC',
	0x139: 'RESIZEPALETTE',
	0x142: 'DIBCREATEPATTERNBRUSH',
	0x149: 'SETLAYOUT',
	0x201: 'SETBKCOLOR',
	0x209: 'SETTEXTCOLOR',
	0x211: 'OFFSETVIEWPORTORG',
	0x213: 'LINETO',
	0x214: 'MOVETO',
	0x220: 'OFFSETCLIPRGN',
	0x228: 'FILLREGION',
	0x231: 'SETMAPPERFLAGS',
	0x234: 'SELECTPALETTE',
	0x324: 'POLYGON',
	0x325: 'POLYLINE',
	0x20A: 'SETTEXTJUSTIFICATION',
	0x20B: 'SETWINDOWORG',
	0x20C: 'SETWINDOWEXT',
	0x20D: 'SETVIEWPORTORG',
	0x20E: 'SETVIEWPORTEXT',
	0x20F: 'OFFSETWINDOWORG',
	0x410: 'SCALEWINDOWEXT',
	0x412: 'SCALEVIEWPORTEXT',
	0x415: 'EXCLUDECLIPRECT',
	0x416: 'INTERSECTCLIPRECT',
	0x418: 'ELLIPSE',
	0x419: 'FLOODFILL',
	0x429: 'FRAMEREGION',
	0x436: 'ANIMATEPALETTE',
	0x521: 'TEXTOUT',
	0x538: 'POLYPOLYGON',
	0x548: 'EXTFLOODFILL',
	0x41B: 'RECTANGLE',
	0x41F: 'SETPIXEL',
	0x61C: 'ROUNDRECT',
	0x61D: 'PATBLT',
	0x01E: 'SAVEDC',
	0x81A: 'PIE',
	0xB23: 'STRETCHBLT',
	0x626: 'ESCAPE',
	0x12A: 'INVERTREGION',
	0x12B: 'PAINTREGION',
	0x12C: 'SELECTCLIPREGION',
	0x12D: 'SELECTOBJECT',
	0x12E: 'SETTEXTALIGN',
	0x817: 'ARC',
	0x830: 'CHORD',
	0x922: 'BITBLT',
	0xa32: 'EXTTEXTOUT',
	0xd33: 'SETDIBTODEV',
	0x940: 'DIBBITBLT',
	0xb41: 'DIBSTRETCHBLT',
	0xf43: 'STRETCHDIB',
	0x1f0: 'DELETEOBJECT',
	0x0f7: 'CREATEPALETTE',
	0x1F9: 'CREATEPATTERNBRUSH',
	0x2FA: 'CREATEPENINDIRECT',
	0x2FB: 'CREATEFONTINDIRECT',
	0x2FC: 'CREATEBRUSHINDIRECT',
	0x6FF: 'CREATEREGION'
}

const WMF_TA = {
	NOUPDATECP: 0,
	LEFT: 0,
	TOP: 0,
	UPDATECP: 1,
	RIGHT: 2,
	CENTER: 6,
	BOTTOM: 8,
	BASELINE: 0x18,
	RTLREADING: 0x100
}

const WMF_PS = {
	COSMETIC: 0,
	ENDCAP_ROUND: 0,
	JOIN_ROUND: 0,
	SOLID: 0,
	DASH: 1,
	DOT: 2,
	DASHDOT: 3,
	DASHDOTDOT: 4,
	NULL: 5,
	INSIDEFRAME: 6,
	USERSTYLE: 7,
	ALTERNATE: 8,
	ENDCAP_SQUARE: 0x100,
	ENDCAP_FLAT: 0x200,
	JOIN_BEVEL: 0x1000,
	JOIN_MITER: 0x2000
}

function readColorRef(dv, p) {
	const r = dv.getUint8(p)
	const g = dv.getUint8(p+1)
	const b = dv.getUint8(p+2)
	return `rgb(${r},${g},${b})`
}

function readPointArray(dv, p) {
	const amount = dv.getUint16(p, true)
	const points = new Int16Array(dv.buffer, dv.byteOffset + p + 2, amount * 2)
	return points
}

function readPenObject(dv, p) {
	const penStyle = dv.getUint16(p, true)
	const width = dv.getUint16(p+2, true) * 2
	const color = readColorRef(dv, p+6)

	let lineDash = [], lineCap = 'round', lineJoin = 'round'
	let isNull = false, shrink = false

	if (penStyle & WMF_PS.ENDCAP_SQUARE)
		lineCap = 'square'
	else if (penStyle & WMF_PS.ENDCAP_FLAT)
		lineCap = 'butt'

	if (penStyle & WMF_PS.JOIN_BEVEL)
		lineCap = 'bevel'
	else if (penStyle & WMF_PS.JOIN_MITER)
		lineCap = 'miter'
	
	switch (penStyle & 0xFF) {
		case WMF_PS.DASH:
			lineDash = [5, 5]
			break
		case WMF_PS.DASHDOT:
			lineDash = [5, 5, 1, 5]
			break
		case WMF_PS.DASHDOTDOT:
			lineDash = [5, 5, 1, 5, 1, 5]
			break
		case WMF_PS.NULL:
			isNull = true
			break
		case WMF_PS.INSIDEFRAME:
			shrink = true
			break
		case WMF_PS.USERSTYLE:
			console.log('unsupported pen style USERSTYLE')
			break
		case WMF_PS.ALTERNATE:
			console.log('unsupported pen style ALTERNATE')
			break
	}

	return {type: 'pen', penStyle, width, color, lineCap, lineDash, lineJoin, isNull, shrink}
}

function readBrushObject(dv, p) {
	const brushStyle = dv.getUint16(p, true)
	const color = readColorRef(dv, p+2)
	const brushHatch = dv.getUint16(p+6, true)

	return {type: 'brush', brushStyle, color, brushHatch}
}

function readFontObject(dv, p) {
	const height = dv.getInt16(p, true)
	const width = dv.getInt16(p+2, true)
	const escapement = dv.getInt16(p+4, true)
	const orientation = dv.getInt16(p+6, true)
	const weight = dv.getInt16(p+8, true)
	const italic = dv.getUint8(p+10)
	const underline = dv.getUint8(p+11)
	const strikeOut = dv.getUint8(p+12)
	const charSet = dv.getUint8(p+13)
	const outPrecision = dv.getUint8(p+14)
	const clipPrecision = dv.getUint8(p+15)
	const quality = dv.getUint8(p+16)
	const pitchAndFamily = dv.getUint8(p+17)

	const ansiFacename = dv.buffer.slice(dv.byteOffset + p + 18, dv.byteOffset + p + 18 + 32)
	const paddedFacename = String.fromCharCode(...new Uint8Array(ansiFacename)) + '\0'
	const facename = paddedFacename.substring(0, paddedFacename.indexOf('\0'))

	return {type: 'font',
		height, width, escapement, orientation, weight,
		italic, underline, strikeOut, charSet, outPrecision,
		clipPrecision, quality, pitchAndFamily, facename}
}

function readSpecialHeader(dv, p) {
	return {
		key: dv.getUint32(p, true),
		handle: dv.getUint16(p+4, true),
		left: dv.getInt16(p+6, true),
		top: dv.getInt16(p+8, true),
		right: dv.getInt16(p+10, true),
		bottom: dv.getInt16(p+12, true),
		word: dv.getUint16(p+14, true),
		reserved: dv.getUint32(p+16, true),
		checksum: dv.getUint32(p+20, 2),
		_size: 22
	}
}

function readMetaHeader(dv, p) {
	return {
		type: dv.getUint16(p, true),
		headerSize: dv.getUint16(p+2, true),
		version: dv.getUint16(p+4, true),
		size: dv.getUint32(p+6, true),
		numberOfObjects: dv.getUint16(p+10, true),
		maxRecord: dv.getUint32(p+12, true),
		numberOfMembers: dv.getUint16(p+16, true),
		_size: 18
	}
}

function addGDIObject(objects, obj) {
	for (let i = 0; i < objects.length; i++) {
		if (objects[i] == null) {
			objects[i] = obj
			return
		}
	}

	objects.push(obj)
}

function renderWMF(ctx, buffer, left, top, right, bottom, dbg) {
	ctx.imageSmoothingEnabled = false
	const dv = new DataView(buffer)

	let position = 0
	const specialHeader = readSpecialHeader(dv, position)
	position += specialHeader._size
	//console.log(specialHeader)
	const metaHeader = readMetaHeader(dv, position)
	position += metaHeader._size
	//console.log(metaHeader)

	let bkColor = '#ffffff'
	let bkOpaque = false
	let havePen = false, haveBrush = false
	let transparentBrush = false
	let objects = []
	let fillMode = 'evenodd'
	let offsetX = specialHeader.left, offsetY = specialHeader.top
	let statedW = specialHeader.right - specialHeader.left
	let statedH = specialHeader.bottom - specialHeader.top
	let wantedW = right - left
	let wantedH = bottom - top
	let scaleX = wantedW / statedW, scaleY = wantedH / statedH
	let shrinkMode = false
	let halfPenWidth = 0
	let mapMode = 8 // bob default
	let textColor = 'black'
	let brushColor = 'black'
	let windowOrgX = 0, windowOrgY = 0
	let windowExtX = ctx.canvas.width, windowExtY = ctx.canvas.height
	let inLineToSequence = false

	let dcStack = []
	
	let w = specialHeader.right - specialHeader.left
	let h = specialHeader.bottom - specialHeader.top
	if (dbg) console.log(`x=${specialHeader.left} y=${specialHeader.top} w=${w*15} h=${h*15} scale=${scaleX},${scaleY}`)
	if (dbg) console.log(`wanted: left=${left} top=${top} right=${right} bottom=${bottom}`)

	// Read all records
	while (position < buffer.byteLength) {
		const recordSize = dv.getUint32(position, true)
		const recordFunction = dv.getUint16(position+4, true)
		if (dbg) console.log(`cmd ${recordFunction.toString(16)} : ${reverseMap[recordFunction]}`)

		// special handling for these
		if (inLineToSequence && recordFunction != WMF_META.LINETO) {
			inLineToSequence = false
			ctx.stroke()
		}

		switch (recordFunction) {
			case WMF_META.SAVEDC:
				dcStack.push({
					bkColor, bkOpaque,
					fillMode, shrinkMode, halfPenWidth,
					textColor, brushColor,
					textAlign: ctx.textAlign,
					textBaseline: ctx.textBaseline,
					lineWidth: ctx.lineWidth,
					strokeStyle: ctx.strokeStyle,
					lineCap: ctx.lineCap,
					lineJoin: ctx.lineJoin,
					lineDash: ctx.getLineDash()
				})
				break
			case WMF_META.RESTOREDC:
				let dcIndex = dv.getInt16(position+6, true)
				if (dcIndex < 0)
					dcIndex = dcStack.length + dcIndex // convert to absolute
				const savedDC = dcStack[dcIndex]
				dcStack.splice(dcIndex, dcStack.length - dcIndex)
				bkColor = savedDC.bkColor
				bkOpaque = savedDC.bkOpaque
				fillMode = savedDC.fillMode
				shrinkMode = savedDC.shrinkMode
				halfPenWidth = savedDC.halfPenWidth
				textColor = savedDC.textColor
				brushColor = savedDC.brushColor
				ctx.textAlign = savedDC.textAlign
				ctx.textBaseline = savedDC.textBaseline
				ctx.lineWidth = savedDC.lineWidth
				ctx.strokeStyle = savedDC.strokeStyle
				ctx.lineCap = savedDC.lineCap
				ctx.lineJoin = savedDC.lineJoin
				ctx.setLineDash(savedDC.lineDash)
				break
			case WMF_META.SETROP2:
				const rop2 = dv.getUint16(position+6, true)
				if (rop2 != 13)
					console.log(`SETROP2: ${rop2}`)
				break
			case WMF_META.SETBKCOLOR:
				bkColor = readColorRef(dv, position+6)
				break
			case WMF_META.SETBKMODE:
				bkOpaque = (dv.getUint16(position+6, true) == 2)
				break
			case WMF_META.SETTEXTCOLOR:
				textColor = readColorRef(dv, position+6)
				break
			case WMF_META.SETTEXTALIGN:
				const textAlign = dv.getUint16(position+6, true)
				if ((textAlign & WMF_TA.CENTER) == WMF_TA.CENTER)
					ctx.textAlign = 'center'
				else if ((textAlign & WMF_TA.RIGHT) == WMF_TA.RIGHT)
					ctx.textAlign = 'right'
				else
					ctx.textAlign = 'left'
				if ((textAlign & WMF_TA.BASELINE) == WMF_TA.BASELINE)
					ctx.textBaseline = 'alphabetic'
				else if ((textAlign & WMF_TA.BOTTOM) == WMF_TA.BOTTOM)
					ctx.textBaseline = 'bottom'
				else
					ctx.textBaseline = 'top'
				break
			case WMF_META.SETMAPMODE:
				mapMode = dv.getUint16(position+6, true)
				// TODO show warnings for unsupported modes
				if (dbg) console.log(`mapMode = ${mapMode}`)
				break
			case WMF_META.SETWINDOWORG:
				windowOrgY = dv.getInt16(position+6, true)
				windowOrgX = dv.getInt16(position+8, true)
				offsetX = left - windowOrgX
				offsetY = top - windowOrgY
				scaleX = wantedW / windowExtX
				scaleY = wantedH / windowExtY
				if (dbg) console.log(`windowOrg: ${windowOrgX},${windowOrgY}`)
				break
			case WMF_META.SETWINDOWEXT:
				windowExtY = dv.getInt16(position+6, true)
				windowExtX = dv.getInt16(position+8, true)
				if (dbg) console.log(`windowExt: ${windowExtX},${windowExtY}`)
				offsetX = windowOrgX
				offsetY = windowOrgY
				scaleX = wantedW / windowExtX
				scaleY = wantedH / windowExtY
				if (dbg) console.log(`offset: ${offsetX},${offsetY} scale: ${scaleX},${scaleY}`)
				break
			case WMF_META.CREATEPENINDIRECT:
				addGDIObject(objects, readPenObject(dv, position+6))
				break
			case WMF_META.CREATEBRUSHINDIRECT:
				addGDIObject(objects, readBrushObject(dv, position+6))
				break
			case WMF_META.DIBCREATEPATTERNBRUSH:
				// TODO
				console.log('!!! DIB pattern brush')
				addGDIObject(objects, {type: 'brush', color: 'pink'})
				break
			case WMF_META.CREATEFONTINDIRECT:
				addGDIObject(objects, readFontObject(dv, position+6))
				break
			case WMF_META.SELECTOBJECT:
				const selObjectID = dv.getUint16(position+6, true)
				const selectedObject = objects[selObjectID]
				if (dbg) console.log(`select ${selObjectID}`)
				switch (selectedObject.type) {
					case 'pen':
						ctx.lineWidth = selectedObject.width
						ctx.strokeStyle = selectedObject.color
						ctx.lineCap = selectedObject.lineCap
						ctx.lineJoin = selectedObject.lineJoin
						ctx.setLineDash(selectedObject.lineDash)
						havePen = !selectedObject.isNull
						shrinkMode = selectedObject.shrink
						halfPenWidth = selectedObject.width / 2
						break
					case 'brush':
						brushColor = selectedObject.color
						haveBrush = true
						// HACK for Bob #F5FAF5 and #040404 transparent colours
						transparentBrush = (brushColor == 'rgb(245,250,245)' || brushColor == 'rgb(4,4,4)')
						if (transparentBrush) console.log('trans')
						break
					case 'font':
						if (dbg) console.log(selectedObject)
						break
				}
				break
			case WMF_META.DELETEOBJECT:
				const delObjectID = dv.getUint16(position+6, true)
				objects[delObjectID] = null
				if (dbg) console.log(`delete ${delObjectID}`)
				break
			case WMF_META.SETPOLYFILLMODE:
				fillMode = (dv.getUint16(position+6, true) == 2) ? 'nonzero' : 'evenodd'
				break
			case WMF_META.MOVETO:
				const moveToY = (dv.getUint16(position+6, true) - offsetY) * scaleY + bottom
				const moveToX = (dv.getUint16(position+8, true) - offsetX) * scaleX + left
				ctx.beginPath()
				ctx.moveTo(moveToX, moveToY)
				break
			case WMF_META.LINETO:
				const lineToY = (dv.getUint16(position+6, true) - offsetY) * scaleY + bottom
				const lineToX = (dv.getUint16(position+8, true) - offsetX) * scaleX + left
				ctx.lineTo(lineToX, lineToY)
				inLineToSequence = true
				break
			case WMF_META.POLYGON:
			case WMF_META.POLYLINE:
				const points = readPointArray(dv, position+6)
				const pointCount = points.length / 2
			if (dbg && position == 8076) {
				console.log(points)
				console.log(bkColor)
				console.log(bkOpaque)
				console.log(JSON.stringify(objects[1]))
				console.log(JSON.stringify(objects[1]))
				dbg = false
			}
				ctx.beginPath()
				ctx.moveTo((points[0] - offsetX) * scaleX + left, (points[1] - offsetY) * scaleY + top)
				//ctx.moveTo((points[0] + offsetX) * scaleX, (points[1] + offsetY) * scaleY)
				if (dbg) console.log(`point: ${points[0]},${points[1]} => ${(points[0] - offsetX) * scaleX + left},${(points[1] - offsetY) * scaleY + top}`)
				for (let i = 1; i < pointCount; i++) {
					ctx.lineTo((points[i * 2] - offsetX) * scaleX + left, (points[i * 2 + 1] - offsetY) * scaleY + top)
					//ctx.lineTo((points[i * 2] + offsetX) * scaleX, (points[i * 2 + 1] + offsetY) * scaleY)
					if (dbg) console.log(`point: ${points[i * 2]},${points[i * 2 + 1]} => ${(points[i * 2] - offsetX) * scaleX + left},${(points[i * 2 + 1] - offsetY) * scaleY + top}`)
				}
				if (haveBrush && recordFunction != WMF_META.POLYLINE) {
					ctx.fillStyle = brushColor
					if (transparentBrush) ctx.globalCompositeOperation = 'destination-out'
					ctx.fill(fillMode)
					if (transparentBrush) ctx.globalCompositeOperation = 'source-over'
				}
				if (havePen)
					ctx.stroke()
				break
			case WMF_META.POLYPOLYGON:
				const polygonCount = dv.getUint16(position+6, true)
				const pointsPerPolygon = new Uint16Array(buffer, position + 8, polygonCount)
				let ppPosition = position + 8 + polygonCount * 2
				for (let i = 0; i < polygonCount; i++) {
					const pointCount = pointsPerPolygon[i]
					const points = new Uint16Array(buffer, ppPosition, pointCount)
					ctx.beginPath()
					ctx.moveTo((points[0] - offsetX) * scaleX + left, (points[1] - offsetY) * scaleY + top)
					for (let j = 1; j < pointCount; j++) {
						ctx.lineTo((points[j * 2] - offsetX) * scaleX + left, (points[j * 2 + 1] - offsetY) * scaleY + top)
					}
					if (haveBrush) {
						ctx.fillStyle = brushColor
						ctx.fill(fillMode)
					}
					if (havePen)
						ctx.stroke()
					ppPosition += (pointCount * 4)
				}
				break
			case WMF_META.ELLIPSE:
				const eBottom = (dv.getInt16(position+6, true) - offsetY) * scaleY + top
				const eRight = (dv.getInt16(position+8, true) - offsetX) * scaleX + left
				const eTop = (dv.getInt16(position+10, true) - offsetY) * scaleY + top
				const eLeft = (dv.getInt16(position+12, true) - offsetX) * scaleX + left
				const eCentreX = (eLeft + eRight) / 2
				const eCentreY = (eTop + eBottom) / 2
				let eRadiusX = (eRight - eCentreX)
				let eRadiusY = (eBottom - eCentreY)
				if (shrinkMode) {
					eRadiusX -= halfPenWidth
					eRadiusY -= halfPenWidth
				}
				ctx.beginPath()
				if (dbg) console.log(`eCentre:${eCentreX},${eCentreY} eRadius:${eRadiusX},${eRadiusY}`)
				ctx.ellipse(eCentreX, eCentreY, eRadiusX, eRadiusY, 0, 0, 2 * Math.PI)
				if (haveBrush) {
					ctx.fillStyle = brushColor
					ctx.fill(fillMode)
				}
				if (havePen)
					ctx.stroke()
				break
			case WMF_META.TEXTOUT:
				const stringLength = dv.getUint16(position+6, true)
				const rawString = new Uint8Array(dv.buffer, position+8, stringLength)
				const string = String.fromCharCode(...rawString)
				const posAfterString = position + 8 + stringLength + (stringLength & 1)
				const yStart = dv.getInt16(posAfterString, true)
				const xStart = dv.getInt16(posAfterString+2, true)
				if (dbg) console.log(`str:${string} ${xStart},${yStart} => ${(xStart - offsetX) * scaleX + left},${(yStart - offsetY) * scaleY + top}`)
				ctx.fillStyle = textColor
				ctx.fillText(string, (xStart - offsetX) * scaleX + left, (yStart - offsetY) * scaleY + top)
				break
			case WMF_META.EOF:
				return
			default:
				console.log(`unhandled function: ${recordFunction.toString(16)}`)
				break
		}

		position += (recordSize * 2)
	}
}
