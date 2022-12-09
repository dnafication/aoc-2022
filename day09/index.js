/**
 * Day 9: Advent of Code 2022
 * @see https://adventofcode.com/2022/day/9
 */

// Import the input data
const inputFile = require('path').join(__dirname, 'input.txt')
const input = require('fs').readFileSync(inputFile, 'utf8')

const instructions = input.split('\n')

// Part 2
// I will change my approach of actually using arrays to store the grid
// and instead I will simply track the positions of the head and tail and
// store them in a Set. This will allow me to store the positions of the
// tail in a Set and then I can simply return the size of the Set to get
// the total number of cells visited by the tail.

const headPosition = { x: 0, y: 0 }
const tails = Array.from({ length: 9 }, () => ({ x: 0, y: 0 }))

const tail1PositionSet = new Set() // for part 1
const tail9PositionSet = new Set()

const move = (head, tail) => {
  const { x: hx, y: hy } = head
  const { x: tx, y: ty } = tail

  if (Math.abs(hx - tx) >= 2) {
    hx - tx < 0 ? (tail.x = tx - 1) : (tail.x = tx + 1)
    tail.y = hy
  }
  if (Math.abs(hy - ty) >= 2) {
    hy - ty < 0 ? (tail.y = ty - 1) : (tail.y = ty + 1)
    tail.x = hx
  }
  // console.log(head, tail)
}

for (let i = 0; i < instructions.length; i++) {
  const instruction = instructions[i]
  const [direction, steps] = instruction.split(' ')

  for (let j = 0; j < parseInt(steps); j++) {
    switch (direction) {
      case 'U': {
        headPosition.y += 1
        break
      }
      case 'D': {
        headPosition.y -= 1
        break
      }
      case 'L': {
        headPosition.x -= 1
        break
      }
      case 'R': {
        headPosition.x += 1
        break
      }
    }

    // Move the tail
    for (let k = 0; k < tails.length; k++) {
      const tail = tails[k]
      if (k === 0) {
        move(headPosition, tail)
      } else {
        move(tails[k - 1], tail)
      }
    }

    const line = `${headPosition.x},${headPosition.y}`.padEnd(7, ' ')
    console.log(
      instruction.padEnd(7, ' '),
      line,
      `${tails[0].x},${tails[0].y}`.padEnd(7, ' ')
      // tails.map((t) => `${t.x},${t.y}`.padEnd(7, ' ')).join(' ')
    )

    tail1PositionSet.add(`${tails[0].x},${tails[0].y}`)
    tail9PositionSet.add(`${tails[8].x},${tails[8].y}`)
  }
}

console.log(tail1PositionSet.size)
console.log(tail9PositionSet.size) // couldn't get this to work :(
