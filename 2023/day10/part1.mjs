import { readTextFile } from "../../io.mjs"

const DIRECTIONS = {
	LEFT: [-1, 0],
	UP: [0, -1],
	RIGHT: [1, 0],
	DOWN: [0, 1]
}

const PIPES = {
	"|": [DIRECTIONS.UP, DIRECTIONS.DOWN],
	"-": [DIRECTIONS.LEFT, DIRECTIONS.RIGHT],
	"L": [DIRECTIONS.UP, DIRECTIONS.RIGHT],
	"J": [DIRECTIONS.UP, DIRECTIONS.LEFT],
	"7": [DIRECTIONS.DOWN, DIRECTIONS.LEFT],
	"F": [DIRECTIONS.DOWN, DIRECTIONS.RIGHT]
}

const START = "S"
const GROUND = "."

const map = readTextFile("2023/day10/input.txt").map(line => line.split(""))

const startRow = map.findIndex(line => line.indexOf(START) !== -1)
const startColumn = map[startRow].indexOf(START)
const coords = [startColumn, startRow]

const coordsEquals = (coords1, coords2) => coords1.every((coord, i) => coord === coords2[i])
const coordsToString = coords => `[${coords[0]}, ${coords[1]}]`

const getPipeType = ([x, y]) => {
	const directions = []

	for (const [dX, dY] of Object.values(DIRECTIONS)) {
		const [newX, newY] = [x + dX, y + dY]
		const target = map[newY]?.[newX]

		if (PIPES[target]?.some(([changeX, changeY]) => dX === -changeX && dY === -changeY)) {
			directions.push([dX, dY])
		}

	}

	return Object.entries(PIPES).find(([_, dirs]) => {
		return directions.every(direction => dirs.find(dir => coordsEquals(dir, direction)))
	})[0]
}

const visited = {}

const go = ([x, y], nSteps) => {
	const stringTo = coordsToString([x, y])	
	if (visited[stringTo] && visited[stringTo] <= nSteps) return
	visited[stringTo] = nSteps
	const pipe = map[y][x] === START ? getPipeType([x, y]) : map[y][x]

	for (const [dX, dY] of PIPES[pipe]) {
		toExplore.push({ coords: [x + dX, y + dY], nSteps: nSteps + 1 })
	} 
}

const toExplore = [{ coords, nSteps: 0 }]

while (toExplore.length > 0) {
	const { coords, nSteps } = toExplore.shift()
	go(coords, nSteps)
}

const maxPath = Math.max(...Object.values(visited))

console.log(maxPath)