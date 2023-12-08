import { readTextFile } from "../../io.mjs"

const lines = readTextFile("2023/day04/input.txt")

const lineToArray = line => line.trim().split(/ +/)
const getIntersection = (arr1, arr2) => arr1.filter(item => arr2.indexOf(item) !== -1)

const cards = lines.map((line, i) => {
	const numbers = line.split(": ")[1]
	const [winning, my] = numbers.split(" | ").map(lineToArray)
	const intersection = getIntersection(winning, my)
	return { n: i, winning, my, nIntersection: intersection.length }
})

let nCards = 0
const nCardsByType = cards.map(() => 1)

for (let i = 0; i < cards.length; i++) {
	const card = cards[i]
	nCards += nCardsByType[i]

	for (let j = i + 1; j < i + 1 + card.nIntersection; j++) {
		nCardsByType[j] += nCardsByType[i]
	}
}

console.log(nCards)