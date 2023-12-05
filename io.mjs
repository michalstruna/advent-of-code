import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const readTextFile = (filepath, splitLines = true) => {
	const content = fs.readFileSync(path.join(__dirname, filepath), "utf-8")
	return splitLines ? content.split("\n") : content
}