import { readTextFile } from "../../io.mjs"

const lines = readTextFile("2023/day08/input.txt")
const instructions = lines.shift()

lines.shift()

const paths = lines.map(line => {
	const [source, target] = line.split(" = ")
	const [left, right] = target.slice(1, target.length - 1).split(", ")
	return { source, left, right }
}).reduce((acc, path) => ({ ...acc, [path.source]: path }), {})

let current = "AAA"
const target = "ZZZ"
let steps = 0
let ip = 0

while (current !== target) {
	const instruction = instructions[ip++ % instructions.length]
	const data = paths[current]
	current = instruction === "L" ? data.left : data.right
	steps++

	if (current === target) {
		break
	}
}

console.log(steps)