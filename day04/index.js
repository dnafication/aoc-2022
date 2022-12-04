/**
 * Day 4 Advent of Code 2022
 * https://adventofcode.com/2022/day/4
 */

// import the input file
const inputFile = require('path').join(__dirname, 'input.txt')
const input = require('fs').readFileSync(inputFile, 'utf8')

const expandRange = (range) => {
  const [start, end] = range.split('-').map(Number)
  const expandedRange = []
  for (let i = start; i <= end; i++) {
    expandedRange.push(i)
  }
  return expandedRange
}

const assignmentPairs = input
  .split('\n')
  .map((pair) => pair.split(',').map(expandRange))

const checkIfFullyContainsTheOther = (pair) => {
  const [first, second] = pair
  if (first.length >= second.length) {
    return second.every((number) => first.includes(number))
  }
  return first.every((number) => second.includes(number))
}

const listOfFullyContainedPairs = assignmentPairs.filter(
  checkIfFullyContainsTheOther
)

console.log(
  'Number of assignment pairs that has a range that fully contains the other: ',
  listOfFullyContainedPairs.length
)

// Part 2
const checkAnyOverlap = (pair) => {
  const [first, second] = pair
  return first.some((number) => second.includes(number))
}

const listOfOverlappingPairs = assignmentPairs.filter(checkAnyOverlap)

console.log(
  'Number of assignment pairs that has a range that overlaps with the other: ',
  listOfOverlappingPairs.length
)
