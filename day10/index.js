/**
 * Advent of Code 2022
 * --- Day 10: Cathode-Ray Tube ---
 * @see https://adventofcode.com/2022/day/10
 */

const inputFile = require('path').join(__dirname, 'input.txt')
const input = require('fs').readFileSync(inputFile, 'utf8')

const lines = input.split('\n')

const parseInstruction = (line) => {
  const [cmd, arg] = line.split(' ')
  return { cmd, arg, cycles: cmd === 'noop' ? 1 : 2 }
}

const instructions = lines.map(parseInstruction)

// console.log(instructions)

let X = 1
let cycleCount = 0
const interestingCycles = Array.from({ length: 6 }, (v, k) => k * 40 + 20)
const signalStrength = []

console.log(interestingCycles)

for (let i = 0; i < instructions.length; i++) {
  const instruction = instructions[i]
  const { cmd, arg, cycles } = instruction
  for (let j = 0; j < cycles; j += 1) {
    cycleCount += 1
    if (interestingCycles.includes(cycleCount)) {
      console.log(`Cycle ${cycleCount}: X=${X}`)
      signalStrength.push(X * cycleCount)
    }
  }
  if (cmd === 'addx') {
    X += parseInt(arg, 10)
  }
}

// total signal strength
console.log(
  'Part 1:',
  signalStrength.reduce((a, b) => a + b, 0)
)

// Part 2
// ------
const crtWidth = 40
const crtHeight = 6
X = 1
cycleCount = 1
const SPRITE_PIXELS = 3
const crtState = []

const drawCrt = (spritePosition, cycleCount) => {
  if (
    cycleCount >= spritePosition &&
    cycleCount < spritePosition + SPRITE_PIXELS
  ) {
    return '#'
  }
  return '.'
}

for (let i = 0; i < instructions.length; i++) {
  const instruction = instructions[i]
  const { cmd, arg, cycles } = instruction
  for (let j = 0; j < cycles; j += 1) {
    crtState.push(drawCrt(X, cycleCount))
    cycleCount += 1
    if (cycleCount > 40) {
      cycleCount = 1
    }
  }
  if (cmd === 'addx') {
    X += parseInt(arg, 10)
  }
}

console.log('Part 2:')

for (let i = 0; i < crtHeight; i += 1) {
  const row = crtState.slice(i * crtWidth, (i + 1) * crtWidth)
  console.log(row.join(''))
}
