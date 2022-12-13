/**
 * Day 7: Advent of Code 2022
 * @see https://adventofcode.com/2022/day/7
 */

// Import the input data
const inputFile = require('path').join(__dirname, 'input.txt')
const input = require('fs').readFileSync(inputFile, 'utf8')

const lines = input.split('\n')

/**
 *
 * @param {string} line
 */
const interpretLine = (line) => {
  if (line.startsWith('$')) {
    const [, cmd, arg] = line.split(' ')

    return {
      type: 'command',
      value: {
        cmd,
        arg
      }
    }
  } else if (line.startsWith('dir')) {
    return {
      type: 'dir',
      value: {
        type: 'dir',
        name: line.split(' ')[1],
        size: 0
      }
    }
  } else {
    return {
      type: 'file',
      value: {
        type: 'file',
        name: line.split(' ')[1],
        size: parseInt(line.split(' ')[0])
      }
    }
  }
}

const allDirs = {}
let currentPath = ['root']

for (let i = 0; i < lines.length; i += 1) {
  const line = lines[i]
  const { type, value } = interpretLine(line)

  if (type === 'command') {
    const { cmd, arg } = value

    if (cmd === 'cd') {
      if (arg === '..') {
        if (currentPath.length > 1) {
          currentPath.pop()
        }
      } else if (arg === '/') {
        currentPath = ['root']
      } else {
        currentPath.push(arg)
      }
    }
  } else {
    let tempPath = [...currentPath]

    while (tempPath.length > 0) {
      let key = tempPath.length === 0 ? 'root' : tempPath.join('/')
      allDirs[key] ? (allDirs[key] += value.size) : (allDirs[key] = value.size)
      tempPath.pop()
    }
  }
}

console.log(
  `Part 1`,
  Object.values(allDirs)
    .filter((v) => v <= 100_000)
    .reduce((a, b) => a + b, 0)
)

// dir sizes sorted
const sortedDirSizes = Object.values(allDirs).sort((a, b) => a - b)

const currentFreeSpace = 70_000_000 - Math.max(...sortedDirSizes)
const minSizeToBeDeleted = 30_000_000 - currentFreeSpace

const sizeOfDirToBeDeleted = sortedDirSizes.find((v) => v >= minSizeToBeDeleted)

console.log(`Part 2`, sizeOfDirToBeDeleted)
