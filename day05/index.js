/**
 * Day 5: Advent of Code 2022
 * @see https://adventofcode.com/2022/day/5
 */

// Import the input data
const inputFile = require('path').join(__dirname, 'input.txt')
const input = require('fs').readFileSync(inputFile, 'utf8')

// Part 1

// instruction template
// move 2 from 7 to 4
const instructions = input.split('\n')

// [T]             [P]     [J]
// [F]     [S]     [T]     [R]     [B]
// [V]     [M] [H] [S]     [F]     [R]
// [Z]     [P] [Q] [B]     [S] [W] [P]
// [C]     [Q] [R] [D] [Z] [N] [H] [Q]
// [W] [B] [T] [F] [L] [T] [M] [F] [T]
// [S] [R] [Z] [V] [G] [R] [Q] [N] [Z]
// [Q] [Q] [B] [D] [J] [W] [H] [R] [J]
//  1   2   3   4   5   6   7   8   9
const stacks = [
  ['T', 'F', 'V', 'Z', 'C', 'W', 'S', 'Q'],
  ['B', 'R', 'Q'],
  ['S', 'M', 'P', 'Q', 'T', 'Z', 'B'],
  ['H', 'Q', 'R', 'F', 'V', 'D'],
  ['P', 'T', 'S', 'B', 'D', 'L', 'G', 'J'],
  ['Z', 'T', 'R', 'W'],
  ['J', 'R', 'F', 'S', 'N', 'M', 'Q', 'H'],
  ['W', 'H', 'F', 'N', 'R'],
  ['B', 'R', 'P', 'Q', 'T', 'Z', 'J']
]
// for Part 2 solution
let stacksClone = JSON.parse(JSON.stringify(stacks))

const parseInstruction = (instruction) => {
  const [, count, , from, , to] = instruction.split(' ')
  return {
    count: parseInt(count, 10),
    from: parseInt(from, 10),
    to: parseInt(to, 10)
  }
}

// in place move, one at a time
for (let i = 0; i < instructions.length; i++) {
  const instruction = instructions[i]
  const { count, from, to } = parseInstruction(instruction)
  console.log(`move ${count} from ${from} to ${to}`)
  const fromStack = stacks[from - 1]
  const toStack = stacks[to - 1]
  for (let j = 0; j < count; j++) {
    toStack.unshift(fromStack.shift())
  }
}

console.log('Part 1', stacks.map((s) => s.shift()).join(''))

// Part 2
// in place move, multiple at a time
for (let i = 0; i < instructions.length; i++) {
  const instruction = instructions[i]
  const { count, from, to } = parseInstruction(instruction)
  console.log(`move ${count} from ${from} to ${to}`)
  const fromStack = stacksClone[from - 1]
  const toStack = stacksClone[to - 1]
  const moved = fromStack.splice(0, count)
  toStack.unshift(...moved)
}

console.log('Part 2', stacksClone.map((s) => s.shift()).join(''))
