import * as fs from 'fs'

// const file = fs.readFileSync('test.txt', 'utf8')
const file = fs.readFileSync('input.txt', 'utf8')
const lines = file.split(/\r?\n/)

const startingNumbers = lines[0].split(',').map(n => parseInt(n))

const memory: number[][] = []

let turn: number = 1
let lastSpoken: number = -1
startingNumbers.forEach(n => {
  memory[n] = [turn]
  turn++
  lastSpoken = n
})

while (turn <= 30000000) {
  let speak: number

  if (memory[lastSpoken].length === 1) {
    speak = 0
  } else {
    speak = memory[lastSpoken][memory[lastSpoken].length - 1] - memory[lastSpoken][memory[lastSpoken].length - 2]
  }

  lastSpoken = speak
  memory[speak] = [...(memory[speak] || []), turn]
  memory[speak] = memory[speak].slice(memory[speak].length - 2)

  // console.log(turn, speak, memory[speak])
  turn++
}

console.log(lastSpoken)
