const fs = require('fs')
const operators = require('./operators')

// const input = fs.readFileSync('day_16/example.txt', { encoding: "utf-8" }).trim()
const input = fs.readFileSync('day_16/input.txt', { encoding: "utf-8" }).trim()
const lines = input.split('\n')

let beforeState = []
let afterState = []
let instruction = [] // opcode, A, B, C

let opcodeTests = {}
let operatorsKnown = []

const opcodeTester = (operator) => {
  let result = operator(beforeState, instruction[1], instruction[2], instruction[3])

  if (result.length !== afterState.length) return false

  for (let reg in result) {
    if (result[reg] !== afterState[reg]) return false
  }

  return true
}

// let samplesMoreThanThree = 0

for (let l in lines) {
  let line = lines[l].trim()

  if (line.startsWith('Before:')) {
    let matches = /Before:\s+\[(.*)\]/.exec(line)
    beforeState = matches[1].split(',').map(val => parseInt(val.trim()))
  } else if (line.startsWith('After:')) {
    let opcode = instruction[0]
    if (opcodeTests[opcode] !== undefined && opcodeTests[opcode].length === 1) {
      continue
    }

    let matches = /After:\s+\[(.*)\]/.exec(line)
    afterState = matches[1].split(',').map(val => parseInt(val.trim()))

    let opcodesToTest = opcodeTests[opcode] === undefined
      ? operators
      : opcodeTests[opcode].filter(operator => !operatorsKnown.includes(operator.name))
    opcodeTests[opcode] = opcodesToTest.filter(opcodeTester)

    if (opcodeTests[opcode].length === 1) {
      operatorsKnown.push(opcodeTests[opcode][0].name)
    }

    // if (operators.filter(opcodeTester).length >= 3) samplesMoreThanThree++
  } else if (line !== '') {
    instruction = line.split(' ').map(val => parseInt(val.trim()))
  }
}

const input2 = fs.readFileSync('day_16/input2.txt', { encoding: "utf-8" }).trim()
const lines2 = input2.split('\n')

let registers = [0, 0, 0, 0]
for (let i in lines2) {
  let commandLine = lines2[i]
  let [command, A, B, C] = commandLine.split(' ').map(c => parseInt(c))

  let operator = opcodeTests[command][0]
  registers = operator(registers, A, B, C)

  console.log(registers)
}