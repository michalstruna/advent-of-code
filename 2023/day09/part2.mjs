import { readTextFile } from "../../io.mjs"

const seqs = readTextFile("2023/day09/input.txt").map(line => line.split(" ").map(x => parseInt(x)))
const isZeroSeq = seq => seq.every(n => n === 0)

const getDiffData = diffData => {
	const seq = diffData[diffData.length - 1]
	if (isZeroSeq(seq)) return diffData
	const diffs = []

	for (let i = seq.length - 1; i > 0; i--) {
		diffs.unshift(seq[i] - seq[i - 1])
	}

	return getDiffData([...diffData, diffs])
}

const getPrev = seq => {
	const diffData = getDiffData([seq])
	let prev = 0

	for (let i = diffData.length - 2; i >= 0; i--) {
		const diffs = diffData[i]
		prev = diffs[0] - prev
	}

	return prev
}

const sum = seqs.reduce((acc, seq) => acc + getPrev(seq), 0)

console.log(sum)