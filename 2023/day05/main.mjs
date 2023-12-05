import { readTextFile } from "../../io.mjs"

const lines = readTextFile("2023/day05/input.txt")

const tmpItems = lines.shift().split(": ")[1].split(" ").map(n => parseInt(n))
let items = []
let ranges

for (let i = 0; i < tmpItems.length; i++) {
	//items.push({ from: tmpItems[i], to: tmpItems[i] + tmpItems[i + 1] - 1 }) // TODO: Part 2
	items.push(tmpItems[i])
}

const getRanges = () => {
	const ranges = []

	while (lines.length > 0) {
		const line = lines.shift()

		if (!line || line.endsWith(" map:")) {
			if (ranges.length === 0) {
				continue
			} else {
				break
			}
		}

		const [destStart, sourceStart, length] = line.split(" ").map(n => parseInt(n))
		ranges.push({ destStart, sourceStart, length })
	}

	return ranges.length > 0 ? ranges : null
}

while (ranges = getRanges()) {
	items = items.map(item => {
		const range = ranges.find(r => r.sourceStart <= item && r.sourceStart + r.length > item)
		return range ? range.destStart + (item - range.sourceStart) : item
	})

}

const minEntity = Math.min(...items)

console.log(minEntity)