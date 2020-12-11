import * as fs from 'fs'

// const file = fs.readFileSync('test.txt', 'utf8')
const file = fs.readFileSync('input.txt', 'utf8')
let lines = file.split(/\r?\n/)

// const preamble = 5
const preamble = 25

const stack = lines.slice(0, preamble).map(l => parseInt(l))
let invalid = -1

for (let i = preamble; i < lines.length; i++) {
  const next = parseInt(lines[i])
  
  let valid = false
  for (let j = 0; j < stack.length - 1 && !valid; j++) {
    const s1 = stack[j]
    for (let k = j + 1; k < stack.length && !valid; k++) {
      const s2 = stack[k]
      if (s1 + s2 === next) {
        valid = true
        break
      }
    }
  }

  if (!valid) {
    // console.log('invalid', next, stack)
    invalid = next
    break
  }

  stack.shift()
  stack.push(next)
}

const wholeSet = lines.map(l => parseInt(l))

for (let i = 0; i < wholeSet.length; i++) {
  const first = wholeSet[i]
  let sum = first
  let j = i + 1
  // console.log('i', i, j, sum)
  
  while (sum < invalid && j < wholeSet.length) {
    // console.log('while', i, j, sum, invalid)
    sum += wholeSet[j]
    j++

    if (sum === invalid) {
      const range = wholeSet.slice(i, j)
      const sumOfRange = range.reduce((prev, curr) => prev + curr, 0)
      const min = Math.min(...range)
      const max = Math.max(...range)
      console.log('contig range found', range, sumOfRange, min, max, min + max)
      break
    }
  }
}