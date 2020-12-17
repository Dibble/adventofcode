import * as fs from 'fs'

// const file = fs.readFileSync('test.txt', 'utf8')
const file = fs.readFileSync('input.txt', 'utf8')
let lines = file.split(/\r?\n/)

// const time = parseInt(lines[0])
// const buses = lines[1].split(',').filter(b => b !== 'x').map(b => parseInt(b))
interface Bus {
  id: number,
  offset: number
}

const buses: Bus[] = lines[1].split(',').map((bus: string, i: number) => ({ id: parseInt(bus), offset: i})).filter(b => !isNaN(b.id))

// console.log(time, buses)

// const nextDepartures = buses.map(bus => {
//   let dep = 0
//   while (dep <= time) {
//     dep += bus
//   }
//   return dep
// })

// const earliest = Math.min(...nextDepartures)
// const busIndex = nextDepartures.findIndex(b => b === earliest)
// const nextBus = buses[busIndex]
// const wait = earliest - time

// console.log(nextBus, earliest, wait, nextBus * wait)

const increment = 37 * 601
let current = increment
let found = false

while (!found) {
  const potentialX = current - 37
  if (buses.every(bus => (potentialX + bus.offset) % bus.id === 0)) {
    console.log('answer', potentialX)
    found = true
  }
}