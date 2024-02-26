
import { pixelify } from '../Source/mod.ts'


const text = `Use the search parameter 'Text' to change this text.`

const ascii = pixelify(text)

console.debug(ascii)
