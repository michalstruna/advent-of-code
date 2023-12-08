import { readTextFile } from "../../io.mjs"

const games = readTextFile("2023/day02/input.txt")
const sets = games.map(game => game.split(": ")[1].split(";"))
const limits = { red: 12, green: 13, blue: 14 }

const sumIds = sets.reduce((sumIds, gameSets, i) => {
	let isPossible = true

	for (const set of gameSets) {
		const kubes = set.split(",")

		for (const kube of kubes) {
			const n = parseInt(kube)
			const color = kube.match(/red|green|blue/)[0]
			if (n > limits[color]) isPossible = false
		}
	}

	return isPossible ? sumIds + i + 1 : sumIds
}, 0)


console.log(sumIds)