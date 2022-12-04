/**
 * Day 3 Advent of Code 2022
 * https://adventofcode.com/2022/day/3
 */

// import the input file
const inputFile = require('path').join(__dirname, 'input.txt')
const input = require('fs').readFileSync(inputFile, 'utf8')

const rucksacks = input.split('\n')

// lower case alphabets
const lcAlphabets = 'abcdefghijklmnopqrstuvwxyz'
const ucAlphabets = lcAlphabets.toUpperCase()
const calculatePriority = (letter) => {
  if (lcAlphabets.includes(letter)) {
    return lcAlphabets.indexOf(letter) + 1
  } else {
    return ucAlphabets.indexOf(letter) + 27
  }
}

const findCommonLetters = (rucksack) => {
  const letters = rucksack.split('')
  const letterCount = letters.length
  const compartment1 = letters.slice(0, letterCount / 2)
  const compartment2 = letters.slice(letterCount / 2, letterCount)
  // find the common letters
  const commonLetters = compartment1.filter((letter) =>
    compartment2.includes(letter)
  )
  return commonLetters
}

const prioritySum = rucksacks.reduce((acc, rucksack) => {
  const commonLetters = findCommonLetters(rucksack)
  const priority = calculatePriority(commonLetters[0])
  return acc + priority
}, 0)

console.log('Sum of priority', prioritySum)

// Part 2
// chunk the rucksacks into 3 each
const chunkedRucksacks = []
for (let i = 0; i < rucksacks.length; i += 3) {
  chunkedRucksacks.push(rucksacks.slice(i, i + 3))
}

// find common letter in three strings
const findCommonChars = (strings) => {
  let commonChars = []
  let temp = strings[0]
  for (let i = 1; i < strings.length; i++) {
    const string = strings[i]
    string.split('').forEach((char) => {
      if (temp.includes(char) && !commonChars.includes(char)) {
        commonChars.push(char)
      }
    })
    temp = commonChars.join('')
    commonChars = []
  }
  return temp
}

const badgePrioritySum = chunkedRucksacks.reduce((acc, rucksacks) => {
  const commonLetters = findCommonChars(rucksacks)
  const priority = calculatePriority(commonLetters[0])
  return acc + priority
}, 0)

console.log('Sum of badge priority', badgePrioritySum)
