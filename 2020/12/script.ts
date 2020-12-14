import { dir } from 'console'
import * as fs from 'fs'

// const file = fs.readFileSync('test.txt', 'utf8')
const file = fs.readFileSync('input.txt', 'utf8')
let lines = file.split(/\r?\n/)

interface Instruction {
  command: string,
  argument: number
}

const instructions: Instruction[] = lines.map(l => ({
  command: l[0],
  argument: parseInt(l.slice(1))
}))

enum Direction {
  NORTH,
  EAST,
  SOUTH,
  WEST
}

let x: number = 0
let y: number = 0
let direction: Direction = Direction.EAST
let waypointX = 10
let waypointY = -1

// const turnRight = (degrees: number) => {
//   direction = (direction + (degrees / 90)) % 4
// }

// const turnLeft = (degrees: number) => {
//   direction = direction - (degrees / 90)
//   if (direction < 0) direction += 4
// }

const rotateRight = (degrees: number) => {
  let newX = 0
  let newY = 0

  switch (degrees) {
    case 90:
      newX = -waypointY
      newY = waypointX
      break
    case 180:
      newX = -waypointX
      newY = -waypointY
      break
    case 270:
      newX = waypointY
      newY = -waypointX
      break
  }

  waypointX = newX
  waypointY = newY
}

const rotateLeft = (degrees: number) => {
  let newX = 0
  let newY = 0

  switch (degrees) {
    case 90:
      newX = waypointY
      newY = -waypointX
      break
    case 180:
      newX = -waypointX
      newY = -waypointY
      break
    case 270:
      newX = -waypointY
      newY = waypointX
      break
  }

  waypointX = newX
  waypointY = newY
}

instructions.forEach(i => {
  switch (i.command) {
    case 'N':
      waypointY -= i.argument
      break
    case 'E':
      waypointX += i.argument
      break
    case 'S':
      waypointY += i.argument
      break
    case 'W':
      waypointX -= i.argument
      break
    case 'L':
      rotateLeft(i.argument)
      break
    case 'R':
      rotateRight(i.argument)
      break
    case 'F':
      x += (waypointX * i.argument)
      y += (waypointY * i.argument)
      break
  }

  console.log(x, y, direction)
})

console.log(x, y, direction, Math.abs(x) + Math.abs(y))