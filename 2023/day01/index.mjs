import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const digits = {
	zero: "0",
	one: "1",
	two: "2",
	three: "3",
	four: "4",
	five: "5",
	six: "6",
	seven: "7",
	eight: "8",
	nine: "9"
}

const digitWords = Object.keys(digits).join("|")
const wordToDigit = word => word.replace(new RegExp(digitWords), match => digits[match] || match)

const content = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8")
const lines = content.split("\n")

const sum = lines.reduce((sum, line) => {
	const digits = Array.from(line.matchAll(new RegExp(`(?=([0-9]|${digitWords}))`, "g")))
	if (digits.length === 0) return sum
	const firstDigit = wordToDigit(digits[0][1])
	const lastDigit = wordToDigit(digits[digits.length - 1][1])
	return sum + parseInt(firstDigit + lastDigit)
}, 0)

console.log(sum)