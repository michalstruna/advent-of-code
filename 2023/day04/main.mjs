import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const content = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8")
const lines = content.split("\n")

const lineToArray = line => line.trim().split(/ +/)
const getIntersection = (arr1, arr2) => arr1.filter(item => arr2.indexOf(item) !== -1)

const cards = lines.map((line, i) => {
	const numbers = line.split(": ")[1]
	const [winning, my] = numbers.split(" | ").map(lineToArray)
	const intersection = getIntersection(winning, my)
	return { n: i, winning, my, nIntersection: intersection.length }
})

// Part 1
let points = cards.reduce((sum, { nIntersection }) => {
	const points = (nIntersection === 0 ? 0 : 2**(nIntersection - 1))
	return sum + points
}, 0)

// Part 2
let nCards = 0
const nCardsByType = cards.map(() => 1)

for (let i = 0; i < cards.length; i++) {
	const card = cards[i]
	nCards += nCardsByType[i]

	for (let j = i + 1; j < i + 1 + card.nIntersection; j++) {
		nCardsByType[j] += nCardsByType[i]
	}
}

/*// Stupid slow non-mathematical brute force attempt.
const cardsFifo = [...cards]

while (cardsFifo.length) {
	const card = cardsFifo.shift()
	nCards++

	if (card.nIntersection > 0) {
		const startIndex = card.n + 1
		cardsFifo.push(...cards.slice(startIndex, startIndex + card.nIntersection))
	}
}*/

console.log("Points:", points)
console.log("Cards:", nCards)