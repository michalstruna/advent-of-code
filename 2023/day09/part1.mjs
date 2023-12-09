import { readTextFile } from "../../io.mjs"

const seqs = readTextFile("2023/day09/input.txt").map(line => line.split(" ").map(x => parseInt(x)))
const isZeroSeq = seq => seq.every(n => n === 0)

const getDiffData = diffData => {
	const seq = diffData[diffData.length - 1]
	if (isZeroSeq(seq)) return diffData
	const diffs = seq.map((diff, i) => seq[i + 1] - diff)
	diffs.pop()
	return getDiffData([...diffData, diffs])
}

const getNext = seq => {
	const diffData = getDiffData([seq])
	let next = 0

	for (let i = diffData.length - 2; i >= 0; i--) {
		const diffs = diffData[i]
		next = diffs[diffs.length - 1] + next
	}

	return next
}

const sum = seqs.reduce((acc, seq) => acc + getNext(seq), 0)

console.log(sum)