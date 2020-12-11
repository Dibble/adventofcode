const fs = require('fs')

const input = fs.readFileSync("input.txt", { encoding: "utf-8" })
let lines = input.split("\n")

claimed = []
overlaps = 0
valid = []

for (row = 0; row < lines.length; row++) {
  let line = lines[row]

  const re = /\#([0-9]+) \@ ([0-9]+)\,([0-9]+)\: ([0-9]+)\x([0-9]+)/
  let match = line.match(re)
  id = match[1]
  left = parseInt(match[2])
  top = parseInt(match[3])
  width = parseInt(match[4])
  height = parseInt(match[5])

  valid.push(id)

  for (x = 0; x < width; x++) {
    let xPos = left + x
    if (claimed[xPos] === undefined) {
      claimed[xPos] = []
    }

    for (y = 0; y < height; y++) {
      let yPos = top + y

      if (claimed[xPos][yPos] === undefined) {
        claimed[xPos][yPos] = [id]
      } else {
        claimed[xPos][yPos].push(id)

        for (var claim in claimed[xPos][yPos]) {
          let index = valid.indexOf(claimed[xPos][yPos][claim])
          if (index > -1) valid.splice(index, 1)
        }
      }
    }
  }
}

console.log(overlaps)
console.log(valid.length)
console.log(valid)