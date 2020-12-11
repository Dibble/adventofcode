const fs = require('fs')

const input = fs.readFileSync("day_6/input.txt", { encoding: "utf-8" }).trim()
// const input = fs.readFileSync("day_6/example.txt", { encoding: "utf-8" }).trim()
let lines = input.split('\n')

let sizeX = 0
let sizeY = 0

// find minimum size that fits all coords
for (var row in lines) {
  let line = lines[row].trim()
  let coords = line.split(',', 2)
  let x = parseInt(coords[0])
  let y = parseInt(coords[1])

  if (x > sizeX) sizeX = x
  if (y > sizeY) sizeY = y
}

console.log(sizeX, sizeY)

let manhattanGraph = []
// let manhattanAreas = {}

// find nearest coord for each point
for (var x = 0; x <= sizeX; x++) {
  for (var y = 0; y <= sizeY; y++) {
    // let nearestCoord = ''
    // let nearestDistance = null
    let sumOfManhattan = 0

    for (var row in lines) {
      let line = lines[row].trim()
      let coords = line.split(',', 2)
      let coordX = parseInt(coords[0])
      let coordY = parseInt(coords[1])

      let manhattanDistance = Math.sqrt(Math.pow(coordX - x, 2)) + Math.sqrt(Math.pow(coordY - y, 2))
      // console.log(x, y, row, manhattanDistance)

      sumOfManhattan += manhattanDistance
    }

    // console.log(x, y, nearestCoord, nearestDistance)

    if (manhattanGraph[y] === undefined) manhattanGraph[y] = []
    // manhattanGraph[y][x] = nearestCoord
    manhattanGraph[y][x] = sumOfManhattan

    // if (manhattanAreas[nearestCoord] === undefined) manhattanAreas[nearestCoord] = 0
  }
}

// for (var y = 0; y <= sizeY; y++) {
//   console.log(manhattanGraph[y])
// }
// console.log(manhattanGraph)

// remove all nearest coords for edge point (infinite areas)
// for (var x = 0; x <= sizeX; x++) {
//   let topEdgeCoord = manhattanGraph[0][x]
//   let bottomEdgeCoord = manhattanGraph[sizeY][x]

//   manhattanAreas[topEdgeCoord] = null
//   manhattanAreas[bottomEdgeCoord] = null
// }

// for (var y = 0; y <= sizeY; y++) {
//   let leftEdgeCoord = manhattanGraph[y][0]
//   let rightEdgeCoord = manhattanGraph[y][sizeX]

//   manhattanAreas[leftEdgeCoord] = null
//   manhattanAreas[rightEdgeCoord] = null
// }

let sumBelowThreshold = 0

// count total area for each coord
for (var x = 0; x <= sizeX; x++) {
  for (var y = 0; y <= sizeY; y++) {
    // let coord = manhattanGraph[y][x]
    let sum = manhattanGraph[y][x]
    // if (manhattanAreas[coord] !== undefined && manhattanAreas[coord] !== null) {
    //   manhattanAreas[coord]++
    // }
    if (sum < 10000) {
      sumBelowThreshold++
    }
  }
}

console.log(sumBelowThreshold)

// find largest area
// let largestArea = 0
// for (var key in Object.keys(manhattanAreas)) {
//   let value = manhattanAreas[key]

//   if (value !== null && value > largestArea) {
//     largestArea = value
//   }
// }

// console.log(largestArea)