import * as fs from 'fs'

// const file = fs.readFileSync('test.txt', 'utf8')
const file = fs.readFileSync('input.txt', 'utf8')
let lines = file.split(/\r?\n/)

interface Instruction {
  command: string,
  argument: number
}

const instructions: Instruction[] = []

lines.forEach(line => {
  const matches = line.match(/(acc|jmp|nop)\s([+|-][0-9]+)/)

  if (matches === null) {
    console.log('no match', line)
    return
  }

  instructions.push({
    command: matches[1],
    argument: parseInt(matches[2])
  })
})

const jmpOrNop = instructions.map((ins, i) => ins.command === 'jmp' || ins.command === 'nop' ? i : -1).filter(j => j > -1)
jmpOrNop.forEach(ins => {
  const newInstructions = [...instructions]
  newInstructions.splice(ins, 1, { command: instructions[ins].command === 'jmp' ? 'nop' : 'jmp', argument: instructions[ins].argument })

  let currentInstruction: number = 0
  const visited: number[] = []
  let accumulator = 0

  while (!visited.includes(currentInstruction)) {
    if (currentInstruction >= instructions.length) {
      console.log('terminated', accumulator, ins)
      return
    }

    const instruction = newInstructions[currentInstruction]
    visited.push(currentInstruction)
    // console.log('executing', currentInstruction, instruction.command, instruction.argument)

    switch (instruction.command) {
      case 'acc':
        accumulator = accumulator + instruction.argument
        currentInstruction++
        break
      case 'jmp':
        currentInstruction = currentInstruction + instruction.argument
        break
      case 'nop':
        currentInstruction++
        break
    }
  }

  // console.log('loop', ins)
})
