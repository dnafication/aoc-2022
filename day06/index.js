/**
 * Day 6: Advent of Code 2022
 * @see https://adventofcode.com/2022/day/6
 */

// Import the input data
const inputFile = require('path').join(__dirname, 'input.txt')
const input = require('fs').readFileSync(inputFile, 'utf8')

// Part 1
let charsBeforeStartOfPacket = 0
const tempBuffer = []

const checkUniqueChars = (str) => {
  const chars = str.split('')
  const uniqueChars = new Set(chars)
  return uniqueChars.size === chars.length
}

for (let i = 0; i < input.length; i++) {
  const char = input[i]
  // change this to 14 for part 2
  if (tempBuffer.length === 4) {
    // console.log(i, tempBuffer.join(''))
    if (checkUniqueChars(tempBuffer.join(''))) {
      charsBeforeStartOfPacket = i
      console.log('Chars before start of packet:', charsBeforeStartOfPacket)
      break
    }
    tempBuffer.shift()
    tempBuffer.push(char)
  } else {
    tempBuffer.push(char)
  }
}
