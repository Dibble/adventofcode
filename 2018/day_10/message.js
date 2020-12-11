const fs = require('fs')

// const input = fs.readFileSync("day_10/input.txt", { encoding: "utf-8" }).trim()
const input = fs.readFileSync("day_10/example.txt", { encoding: "utf-8" }).trim()

const lines = input.split('\n')
const regex = /^position=<\s?(-?[0-9]+), \s?(-?[0-9]+)> velocity=<\s?(-?[0-9]+), \s?(-?[0-9]+)>$/

let coords = []

const printCoords = (current) => {


  let arr = []

  for (let c in current) {
    let position = current[c].position
    if (arr[position.x - smallestX] === undefined) {
      arr[position.x - smallestX] = []
    }

    arr[position.x - smallestX][position.y - smallestY] = '#'
  }

  console.log(arr)
}

const movePoints = (points) => {
  for (let p in points) {
    let point = points[p]
    point.position.x += point.velocity.x
    point.position.y += point.velocity.y
  }
}

for (let row in lines) {
  let line = lines[row].trim()

  let match = line.match(regex)
  let positionX = parseInt(match[1])
  let positionY = parseInt(match[2])
  let velocityX = parseInt(match[3])
  let velocityY = parseInt(match[4])

  coords.push({
    position: { x: positionX, y: positionY },
    velocity: { x: velocityX, y: velocityY }
  })
}

// let iteration = 0
// while (iteration < 4) {
//   printCoords(coords)
//   movePoints(coords)
//   iteration++
// }