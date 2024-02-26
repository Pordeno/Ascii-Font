"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pixelify = void 0;
const Characters_js_1 = require("./Characters.js");
const chunk_js_1 = require("./deps/deno.land/std@0.217.0/collections/chunk.js");
const Blocks = [
    ' ',
    '▗',
    '▖',
    '▄',
    '▝',
    '▐',
    '▞',
    '▟',
    '▘',
    '▚',
    '▌',
    '▙',
    '▀',
    '▜',
    '▛',
    '█'
];
function pixelify(text) {
    const characters = text
        .split('')
        .map((character) => Characters_js_1.Characters[character] ?? Characters_js_1.Default);
    const lines = Array(11)
        .fill(null)
        .map(() => []);
    for (const character of characters)
        for (let l = 0; l < lines.length; l++)
            lines[l].push(0, ...character[l]);
    const chunks = lines
        .map((line) => (0, chunk_js_1.chunk)(line, 2));
    const rows = (0, chunk_js_1.chunk)(chunks, 2);
    return rows
        .map((row) => {
        let [upper, lower = []] = row;
        upper = upper.map(([first, second]) => [first, second ?? 0]);
        lower = lower.map(([first, second]) => [first, second ?? 0]);
        return upper
            .map((pair, index) => [pair, lower[index] ?? [0, 0]])
            .map((block) => block[0][0] * 8 + block[0][1] * 4 + block[1][0] * 2 + block[1][1])
            .map((index) => Blocks[index])
            .join('');
    })
        .join('\n');
}
exports.pixelify = pixelify;
