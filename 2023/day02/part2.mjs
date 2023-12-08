import { readTextFile } from "../../io.mjs"

const games = readTextFile("2023/day02/input.txt")
const sets = games.map(game => game.split(": ")[1].split(";"))

const sumPowers = sets.reduce((sumPowers, gameSets) => {
	const minCubes = {}

	for (const set of gameSets) {
		const kubes = set.split(",")

		for (const kube of kubes) {
			const n = parseInt(kube)
			const color = kube.match(/red|green|blue/)[0]

			if (!minCubes[color] || minCubes[color] < n) minCubes[color] = n
		}
	}

	return sumPowers + Object.values(minCubes).reduce((acc, val) => val * acc)
}, 0)


console.log(sumPowers)