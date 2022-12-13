/**
 * Advent of Code 2022
 * --- Day 8: Treetop Tree House ---
 */

// Import the input data
const inputFile = require('path').join(__dirname, 'input.txt')
const input = require('fs').readFileSync(inputFile, 'utf8')

const treeHeights = input.split('\n').map((line) => line.split('').map(Number))

// console.log(treeHeights)

// Part 1
// top and bottom row are already visible so we start at 1
// and end at treeHeights.length - 1

let visibleTrees = 0

for (let i = 1; i < treeHeights.length - 1; i += 1) {
  const row = treeHeights[i]
  for (let j = 1; j < row.length - 1; j += 1) {
    const col = treeHeights.map((row) => row[j])
    const thisHeight = row[j]
    const west = row.slice(0, j)
    const east = row.slice(j + 1)
    const north = col.slice(0, i)
    const south = col.slice(i + 1)
    if (west.every((height) => height < thisHeight)) {
      visibleTrees += 1
      // console.log(`visibleTrees: ${i}, ${j}: ${thisHeight}`)
      continue
    }
    if (east.every((height) => height < thisHeight)) {
      visibleTrees += 1
      // console.log(`visibleTrees: ${i}, ${j}: ${thisHeight}`)
      continue
    }
    if (north.every((height) => height < thisHeight)) {
      visibleTrees += 1
      // console.log(`visibleTrees: ${i}, ${j}: ${thisHeight}`)
      continue
    }
    if (south.every((height) => height < thisHeight)) {
      visibleTrees += 1
      // console.log(`visibleTrees: ${i}, ${j}: ${thisHeight}`)
      continue
    }
  }
}

console.log(
  `visibleTrees: ${
    visibleTrees +
    (treeHeights.length - 1) * 2 +
    (treeHeights[0].length - 1) * 2
  }`
)

// Part 2

const scenicScores = []
for (let i = 1; i < treeHeights.length - 1; i += 1) {
  const row = treeHeights[i]
  for (let j = 1; j < row.length - 1; j += 1) {
    const col = treeHeights.map((row) => row[j])
    const thisHeight = row[j]
    const west = row.slice(0, j).reverse()
    const east = row.slice(j + 1)
    const north = col.slice(0, i).reverse()
    const south = col.slice(i + 1)

    const westVisible = []
    const eastVisible = []
    const northVisible = []
    const southVisible = []
    for (let i = 0; i < west.length; i += 1) {
      const height = west[i]
      if (height < thisHeight) {
        westVisible.push(height)
      } else {
        westVisible.push(height)
        break
      }
    }
    for (let i = 0; i < east.length; i += 1) {
      const height = east[i]
      if (height < thisHeight) {
        eastVisible.push(height)
      } else {
        eastVisible.push(height)
        break
      }
    }
    for (let i = 0; i < north.length; i += 1) {
      const height = north[i]
      if (height < thisHeight) {
        northVisible.push(height)
      } else {
        northVisible.push(height)
        break
      }
    }
    for (let i = 0; i < south.length; i += 1) {
      const height = south[i]
      if (height < thisHeight) {
        southVisible.push(height)
      } else {
        southVisible.push(height)
        break
      }
    }
    // console.log(westVisible, eastVisible, northVisible, southVisible)
    const scenicScore =
      westVisible.length *
      eastVisible.length *
      northVisible.length *
      southVisible.length

    scenicScores.push(scenicScore)
  }
}
const maxScenicScore = Math.max(...scenicScores)
console.log(`maxScenicScore: ${maxScenicScore}`)
