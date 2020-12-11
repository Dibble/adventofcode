const fs = require('fs')

let zeroPosition = 0
// let state = '#..#.#..##......###...###'.split('')
let state = '..#..###...#####.#.#...####.#..####..###.##.#.#.##.#....#....#.####...#....###.###..##.#....#######'

// const input = fs.readFileSync("day_12/example.txt", { encoding: "utf-8" }).trim()
const input = fs.readFileSync("day_12/input.txt", { encoding: "utf-8" }).trim()
const lines = input.split('\n')

let rules = {}
lines.forEach(line => {
  line = line.trim()
  let parts = line.split('=>')
  rules[parts[0].trim()] = parts[1].trim()
});

// console.log(rules)

const generation = () => {
  state.unshift('.', '.')
  zeroPosition += 2
  state.push('.', '.')

  let newState = []
  for (let s in state) {
    let rule = ''
    for (let i = -2; i < 3; i++) {
      // console.log(parseInt(s) + i, state.join(''))
      rule += parseInt(s) + i < 0 ? '.' : parseInt(s) + i >= state.length ? '.' : state[parseInt(s) + i]
    }
    // console.log(s, rule)

    // console.log(rules[rule])
    newState.push(rules.hasOwnProperty(rule) ? rules[rule] : '.')
  }

  state = newState

  let firstPlant = state.indexOf('#')
  if (firstPlant > -1) {
    state = state.slice(firstPlant)
    zeroPosition -= firstPlant
  }

  let lastPlant = state.lastIndexOf('#')
  if (lastPlant > -1) {
    state = state.slice(0, lastPlant + 1)
  }
}

const newGeneration = () => {
  state = `..${state}..`
  zeroPosition += 2

  for (let rule in rules) {
    console.log(rule)
    let re = new RegExp(rule.replace('.', '\.'))

  }
}

// generation()
for (let gen = 0; gen < 20; gen++) {
  // generation()
  newGeneration()
  // console.log(gen, state.length)
}

const sumState = () => {
  let sum = 0

  for (let s in state) {
    if (state[s] === '#') {
      sum += parseInt(s) - zeroPosition
    }
  }

  return sum
}

console.log(sumState())