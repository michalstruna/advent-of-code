import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const content = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8")
const games = content.split("\n")
const sets = games.map(game => game.split(": ")[1].split(";"))

const limits = { red: 12, green: 13, blue: 14 }

const { sumIds, sumPowers } = sets.reduce(({ sumIds, sumPowers }, gameSets, i) => {
	let isPossible = true
	const minCubes = {}

	for (const set of gameSets) {
		const kubes = set.split(",")

		for (const kube of kubes) {
			const n = parseInt(kube)
			const color = kube.match(/red|green|blue/)[0]

			if (n > limits[color]) isPossible = false
			if (!minCubes[color] || minCubes[color] < n) minCubes[color] = n
		}
	}

	return {
		sumIds: isPossible ? sumIds + i + 1 : sumIds,
		sumPowers: sumPowers + Object.values(minCubes).reduce((acc, val) => val * acc)
	}
}, { sumIds: 0, sumPowers: 0 })


console.log("Sum of IDs:", sumIds)
console.log("Sum of powers:", sumPowers)