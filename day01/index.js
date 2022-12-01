// read the input file
const input = require('fs').readFileSync(__dirname + '/input.txt', 'utf8')

const elvesCalories = input.split('\n\n')

const elvesCaloriesSummed = elvesCalories.map((elfCalories) => {
  const calories = elfCalories.split('\n').map(Number)
  return calories.reduce((a, b) => a + b)
})

const max = Math.max(...elvesCaloriesSummed)
const index = elvesCaloriesSummed.indexOf(max)
console.log(
  `The elf with the most calories is at index: ${index} with ${max} calories.`
)

// sort the elves by calories descending
// sort function mutates the array
elvesCaloriesSummed.sort((a, b) => b - a)
console.log(
  `Sum of top 3 elves calories: ${elvesCaloriesSummed
    .slice(0, 3)
    .reduce((a, b) => a + b)}`
)
