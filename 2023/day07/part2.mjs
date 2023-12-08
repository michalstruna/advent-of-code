import { readTextFile } from "../../io.mjs"

const cardTypes = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"]

const hands = readTextFile("2023/day07/input.txt").map(line => {
	const [cards, bid] = line.split(" ")
	const nCardTypes = cards.split("").reduce((acc, card) => ({ ...acc, [card]: (acc[card] || 0) + 1 }), {})
	const nJs = nCardTypes.J || 0
	delete nCardTypes.J
	const [value1, value2] = Object.values(nCardTypes).sort().reverse().slice(0, 2)

	return { cards: cards.split(""), bid: parseInt(bid), value: ((value1 || 0) + nJs) * 10 + (value2 || 0), nJs }
}).sort((a, b) => {
	const diff = a.value - b.value
	if (diff !== 0) return diff
	const i = a.cards.findIndex((card, i) => card !== b.cards[i])
	return cardTypes.indexOf(b.cards[i]) - cardTypes.indexOf(a.cards[i]) > 0 ? 1 : -1
})

const totalWinnings = hands.reduce((acc, hand, i) => acc + hand.bid * (i + 1), 0)

console.log(totalWinnings)