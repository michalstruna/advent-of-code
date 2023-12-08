import { readTextFile } from "../../io.mjs"

const lines = readTextFile("2023/day01/input.txt")

const sum = lines.reduce((sum, line) => {
	const digits = Array.from(line.matchAll(/[0-9]/g))
	if (digits.length === 0) return sum
	const firstDigit = digits[0][0]
	const lastDigit = digits[digits.length - 1][0]

	return sum + parseInt(firstDigit + lastDigit)
}, 0)

console.log(sum)