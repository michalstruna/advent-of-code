import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const content = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8")
const games = content.split("\n")
const sets = games.map(game => game.split(": ")[1].split(";"))

const limits = { red: 12, green: 13, blue: 14 }

const sum = sets.reduce((sumIds, gameSets, i) => {
	for (const set of gameSets) {
		const kubes = set.split(",")

		for (const kube of kubes) {
			const n = parseInt(kube)
			const color = kube.match(/red|green|blue/)[0]

			if (n > limits[color]) return sumIds
		}
	}

	return sumIds + i + 1
}, 0)


console.log(sum)