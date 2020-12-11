const fs = require('fs')

const size = 50
const minutes = 1000000000

// const input = fs.readFileSync('day_18/example.txt', { encoding: "utf-8" }).trim()
const input = fs.readFileSync('day_18/input.txt', { encoding: "utf-8" }).trim()
const lines = input.split('\n')

const evolve = (acre, adjacent) => {
  switch (acre) {
    case '.':
      return adjacent.filter(a => a === '|').length >= 3 ? '|' : '.'
    case '|':
      return adjacent.filter(a => a === '#').length >= 3 ? '#' : '|'
    case '#':
      return adjacent.filter(a => a === '|').length >= 1 && adjacent.filter(a => a === '#').length >= 1 ? '#' : '.'
  }
}

const getAdjacent = (x, y, f) => {
  let adjacent = []
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (!(i === 0 && j === 0) && x + i >= 0 && x + i < size && y + j >= 0 && y + j < size) {
        adjacent.push(f[x + i][y + j])
      }
    }
  }

  return adjacent
}

let field = []

for (let y = 0; y < lines.length; y++) {
  let line = lines[y]

  for (let x = 0; x < line.length; x++) {
    if (field[x] === undefined) field[x] = []

    field[x][y] = line[x]
  }
}

let currentMinute = 0
while (currentMinute < minutes) {
  console.log(currentMinute, minutes)
  let newField = []
  for (let x = 0; x < size; x++) {
    if (newField[x] === undefined) newField[x] = []
    for (let y = 0; y < size; y++) {
      newField[x][y] = evolve(field[x][y], getAdjacent(x, y, field))
    }
  }

  field = newField
  currentMinute++
}

const getTotalResource = () => {
  let [trees, lumberyards] = [0, 0]

  for (let x in field) {
    for (let y in field[x]) {
      switch (field[x][y]) {
        case '#':
          trees++
          break
        case '|':
          lumberyards++
          break
      }
    }
  }

  console.log('trees', trees)
  console.log('lumberyards', lumberyards)

  return trees * lumberyards
}

console.log(getTotalResource())