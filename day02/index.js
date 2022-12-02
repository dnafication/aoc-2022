/**
 * Day 2
 * https://adventofcode.com/2022/day/2
 *
 *
 * Part 1
 * Opponent
 * A for Rock
 * B for Paper
 * C for Scissors
 *
 * Your choice
 * X for Rock
 * Y for Paper
 * Z for Scissors
 *
 * Score for the shape
 * Rock = 1
 * Paper = 2
 * Scissors = 3
 *
 * Score for the outcome
 * Win = 6
 * Draw = 3
 * Lose = 0
 *
 */

// import the input file
const inputFile = require('path').join(__dirname, 'input.txt')
const input = require('fs').readFileSync(inputFile, 'utf8')

// split the input into an array of strings
const games = input.split('\n')

// combinations of shapes
const shapeDictionary = {
  A: 'Rock',
  B: 'Paper',
  C: 'Scissors',
  X: 'Rock',
  Y: 'Paper',
  Z: 'Scissors'
}

const shapeScore = {
  X: 1,
  Y: 2,
  Z: 3,
  Rock: 1,
  Paper: 2,
  Scissors: 3
}

const scoreLookup = {
  RockRock: 3,
  RockPaper: 6,
  RockScissors: 0,
  PaperRock: 0,
  PaperPaper: 3,
  PaperScissors: 6,
  ScissorsRock: 6,
  ScissorsPaper: 0,
  ScissorsScissors: 3
}

// function to calculate the score for a game
const calculateScore = (game) => {
  const [opponent, myChoice] = game.split(' ')
  const opponentShape = shapeDictionary[opponent]
  const myShape = shapeDictionary[myChoice]

  const myShapeScore = shapeScore[myChoice]

  const score = myShapeScore + scoreLookup[`${opponentShape}${myShape}`]

  return score
}

// calculate the total score
const totalScore = games.map(calculateScore).reduce((a, b) => a + b)

console.log(`Total score: ${totalScore}`)

/**
 * Part 2
 * X = lose the game
 * Y = draw the game
 * Z = win the game
 */

// function to calculate the score for a game
const calculateScore2 = (game) => {
  const [opponent, myDecision] = game.split(' ')
  const opponentShape = shapeDictionary[opponent]
  let myShape

  if (myDecision === 'X') {
    // lose the game
    if (opponentShape === 'Rock') {
      myShape = 'Scissors'
    } else if (opponentShape === 'Paper') {
      myShape = 'Rock'
    } else if (opponentShape === 'Scissors') {
      myShape = 'Paper'
    }
  } else if (myDecision === 'Y') {
    // draw the game
    myShape = opponentShape
  } else if (myDecision === 'Z') {
    // win the game
    if (opponentShape === 'Rock') {
      myShape = 'Paper'
    } else if (opponentShape === 'Paper') {
      myShape = 'Scissors'
    } else if (opponentShape === 'Scissors') {
      myShape = 'Rock'
    }
  }

  const myShapeScore = shapeScore[myShape]
  const score = myShapeScore + scoreLookup[`${opponentShape}${myShape}`]

  console.log(
    `Opponent: ${opponentShape}, My choice: ${myShape}, My score: ${score}`
  )
  return score
}

// calculate the total score
const totalScore2 = games.map(calculateScore2).reduce((a, b) => a + b)

console.log(`Total score part 2: ${totalScore2}`)
