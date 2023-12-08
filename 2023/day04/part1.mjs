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

// Part 1
let points = cards.reduce((sum, { nIntersection }) => {
	const points = (nIntersection === 0 ? 0 : 2**(nIntersection - 1))
	return sum + points
}, 0)

console.log(points)