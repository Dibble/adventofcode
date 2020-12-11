const fs = require('fs')

const input = fs.readFileSync('day_17/example.txt', { encoding: "utf-8" }).trim()
// const input = fs.readFileSync('day_17/input.txt', { encoding: "utf-8" }).trim()
const lines = input.split('\n')

let previousWaterVolume = -1
let reservoir = []
let [smallestX, smallestY, largestX, largestY] = [null, null, null, null]
const [sourceX, sourceY] = [500, 0]

for (let l in lines) {
  let line = lines[l]

  let coords = line.split(',').map(c => c.trim())
  coords.sort((a, b) => a.startsWith('x') ? -1 : 1)

  let xRange = coords[0].substring(2)
  let yRange = coords[1].substring(2)

  let [xMin, xMax] = xRange.split('..')
  let [yMin, yMax] = yRange.split('..')

  if (smallestX === null || xMin < smallestX) smallestX = xMin
  if (smallestY === null || yMin < smallestY) smallestY = yMin

  if (xMax === undefined) xMax = xMin
  if (yMax === undefined) yMax = yMin

  if (largestX === null || xMax > largestX) largestX = xMax
  if (largestY === null || yMax > largestY) largestY = yMax

  for (let x = xMin; x <= xMax; x++) {
    if (reservoir[x] === undefined) reservoir[x] = []
    for (let y = yMin; y <= yMax; y++) {
      reservoir[x][y] = '#'
    }
  }
}

const getWaterVolume = () => {
  return reservoir.reduce((volume, column) => {
    return column.reduce((columnVolume, row) => {
      return row === '~' || row === '|' ? columnVolume + 1 : columnVolume
    }, 0) + volume
  }, 0)
}

const moveWater = () => {
  for (let y = largestY; y >= Math.min(smallestY, 0); y--) {

  }
}

while (previousWaterVolume !== getWaterVolume()) {
  previousWaterVolume = getWaterVolume()
  console.log(previousWaterVolume)
}