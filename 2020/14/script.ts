import * as fs from 'fs'

// const file = fs.readFileSync('test.txt', 'utf8')
const file = fs.readFileSync('input.txt', 'utf8')
const lines = file.split(/\r?\n/)

interface Instruction {
  location: number,
  value: number
}

// const applyMask = (input: number, mask: string): number => {
//   const binaryInput = input.toString(2).padStart(36, '0')
//   // console.log(input, binaryInput)
//   let result: string[] = []

//   for (let i = 0; i < binaryInput.length; i++) {
//     const bit = binaryInput[i]
//     if (mask[i] === 'X') {
//       result.push(bit)
//     } else {
//       result.push(mask[i])
//     }
//   }

//   return parseInt(result.join(''), 2)
// }

let mask: string = ''
const memory: number[] = []

const getAllAddresses = (input: number): number[] => {
  const binaryInput = input.toString(2).padStart(36, '0')
  let resultBits: string[] = []

  for (let i = 0; i < binaryInput.length; i++) {
    const bit = binaryInput[i]
    if (mask[i] === '0') {
      resultBits.push(bit)
    } else {
      resultBits.push(mask[i])
    }
  }

  // console.log('----')
  // console.log(mask)
  // console.log(binaryInput)
  // console.log(resultBits.join(''))

  let addresses: string[] = ['']
  for (let i = 0; i < resultBits.length; i++) {
    const bit = resultBits[i]
    
    if (bit === '0' || bit === '1') {
      addresses = addresses.map(add => add + bit)
    } else {
      addresses = [...addresses.map(add => add + '0'), ...addresses.map(add => add + '1')]
    }
  }

  // console.log(addresses.join('\n'))
  return addresses.map(add => parseInt(add, 2))
}

let result = 0

lines.forEach(line => {
  if (line.startsWith('mask')) {
    mask = line.substring('mask = '.length)
  } else {
    const matches = line.match(/mem\[([0-9]+)\]\s=\s([0-9]+)/)
    if (matches === null) {
      console.error('failed to parse line', line)
      return
    }
  
    const instruction: Instruction = {
      location: parseInt(matches[1]),
      value: parseInt(matches[2])
    }

    // memory[instruction.location] = applyMask(instruction.value, mask)
    getAllAddresses(instruction.location).forEach(location => {
      if (memory[location] === undefined) memory[location] = 0
      result -= memory[location]
      memory[location] = instruction.value
      result += instruction.value
    })
  }
})

console.log('memory done', memory.length)
console.log(result)
// const filtered = memory.filter(m => !isNaN(m))
// console.log('filtered', filtered.length)
// const result = filtered.reduce((prev, current) => prev + current, 0)
// console.log(result)