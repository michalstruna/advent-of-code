import { readTextFile } from "../../io.mjs"

const lines = readTextFile("2023/day06/input.txt")
const [time, distance] = lines.map(line => line.replace(/(^.*:)|( +)/g, ""))

let nWays = 0

for (let i = 1; i < time; i++) {
	const myDist = (time - i) * i
	if (myDist > distance) nWays++
}


console.log(nWays)
