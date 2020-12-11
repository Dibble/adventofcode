import * as fs from 'fs'

// const file = fs.readFileSync('test.txt', 'utf8')
const file = fs.readFileSync('input.txt', 'utf8')
const lines = file.split(/\r?\n/)

const open = '.'
const tree = '#'

const slopes = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2]
]
let results: number[] = []

slopes.forEach(([right, down]) => {
  // console.log(right, down)
  let x = 0
  let y = 0
  let trees = 0

  while (lines[y + 1]) {
    x = (x + right) % lines[y].length
    y = y + down

    if (lines[y][x] === tree) {
      trees++
    }
  }

  console.log(right, down, trees)
  results.push(trees)
})

console.log(results)
console.log(results.reduce((prev, current) => prev * current, 1))