import { readTextFile } from "../../io.mjs"

const lines = readTextFile("2023/day03/input.txt")
let sumPartNumbers = 0
const potentialGears = {}

const checkSurrounding = (lineIndex, index, data) => {
	const lastIndex = index + data.length - 1

	const surroundingsCoords = [[lineIndex, index - 1], [lineIndex, lastIndex + 1]]

	for (let i = index - 1; i <= lastIndex + 1; i++) {
		surroundingsCoords.push([lineIndex - 1, i], [lineIndex + 1, i])
	}

	let isSurrounded = false

	for (const [lineIndex, index] of surroundingsCoords) {
		const char = lines[lineIndex]?.[index]
		if (char !== undefined && char !== ".") isSurrounded = true
		if (char === "*") {
			const coords = `${lineIndex}:${index}`
			if (!potentialGears[coords]) potentialGears[coords] = []
			potentialGears[coords].push(parseInt(data))
		}
	}

	return isSurrounded

}

for (let i = 0; i < lines.length; i++) {
	const line = lines[i]
	const numberMatches = Array.from(line.matchAll(/[0-9]+/g))

	for (const match of numberMatches) {
		if (checkSurrounding(i, match.index, match[0])) {
			sumPartNumbers += parseInt(match[0])
		}
	}
}

const gears = Object.values(potentialGears).filter(gear => gear.length === 2)
const sumGearRatios = gears.reduce((sum, [a, b]) => sum + a * b, 0)

console.log("Sum of part numbers:", sumPartNumbers)
console.log("Sum of gear ratios:", sumGearRatios)
