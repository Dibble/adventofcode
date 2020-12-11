import * as fs from 'fs'

// const file = fs.readFileSync('test.txt', 'utf8')
const file = fs.readFileSync('input.txt', 'utf8')
let lines = file.split(/\r?\n/)

const adapters = lines.map(l => parseInt(l))
adapters.sort((a, b) => a-b)
const max = Math.max(...adapters)
console.log('adapters', adapters)

// let currentJolts = 0
// const joltageDiffs: number[] = []

// while (adapters.length > 0) {
//   const nextAdapter = adapters.shift()
//   if (!nextAdapter) {
//     console.log('ran out of adapters')
//     break
//   }

//   if (nextAdapter - currentJolts > 3) {
//     console.log('invalid diff', nextAdapter, currentJolts)
//     break
//   }

//   // console.log('diff', currentJolts, nextAdapter, nextAdapter - currentJolts)

//   joltageDiffs.push(nextAdapter - currentJolts)
//   currentJolts = nextAdapter
// }

// const ones = joltageDiffs.filter(j => j === 1).length
// const threes = joltageDiffs.filter(j => j === 3).length + 1

// console.log(ones, threes, ones * threes)


const getNextAdapters = (current: number) => {
  return adapters.filter(a => a - current < 4 && a > current)
}

const findRoutes = (start: number, end: number): number => {
  const leaves: number[] = [start]
  
  while (!leaves.every(leaf => leaf === end)) {
    // const lowestLeaf = Math.min(...leaves)
    // if (lowestLeaf === max) break
    
    const lowIndex = leaves.findIndex(l => l < end)
    const next = getNextAdapters(leaves[lowIndex])
    
    leaves[lowIndex] = next[0]
    if (next.length > 1) {
      leaves.push(...next.slice(1))
    }
  }
  
  // console.log('findRoutes', start, end, leaves.length)
  return leaves.length
}

const input = [0, ...adapters]
const singleRoutes = input.slice(0, input.length - 1).filter((value, i) => input[i + 1] - value === 3).map((value, i) => [value, input[input.findIndex(v => v === value) + 1]])
console.log(singleRoutes)

let current = 0
const permutations: number[] = []
while (current < max) {
  const pair = singleRoutes.find(r => r[0] >= current)
  // console.log('pair', pair, current)
  if (!pair) {
    permutations.push(findRoutes(current, max))
    break
  }

  if (pair[0] === current) {
    current = pair[1]
    continue
  }

  permutations.push(findRoutes(current, pair[0]))
  current = pair[1]
}

// console.log(permutations)
console.log(permutations.reduce((prev, current) => prev * current, 1))