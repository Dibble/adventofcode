import * as fs from 'fs'

// const file = fs.readFileSync('test.txt', 'utf8')
const file = fs.readFileSync('input.txt', 'utf8')
let lines = file.split(/\r?\n/)

// let highestSeat = -1
const seenSeats: number[] = []

lines.forEach(line => {
  const row = line.substring(0, 7)
  const column = line.substring(7)

  const rowRange = [0, 127]
  for (let i = 0; i < row.length; i++) {
    const character = row[i];
    const rangeSize = rowRange[1] - rowRange[0] + 1

    if (character === 'F') {
      rowRange[1] = rowRange[1] - rangeSize / 2
    } else {
      rowRange[0] = rowRange[0] + rangeSize / 2
    }
  }

  const colRange = [0, 7]
  for (let i = 0; i < column.length; i++) {
    const character = column[i];
    const rangeSize = colRange[1] - colRange[0] + 1

    if (character === 'L') {
      colRange[1] = colRange[1] - rangeSize / 2
    } else {
      colRange[0] = colRange[0] + rangeSize / 2
    }
  }

  const seatId = rowRange[0] * 8 + colRange[0]
  // console.log(line, rowRange[0], colRange[0], seatId)

  seenSeats.push(seatId)
})

seenSeats.sort((a,b) => a-b)

seenSeats.forEach((seat, i, arr) => {
  if (i === 0) return

  if (seat - arr[i - 1] === 2) console.log('my seat', seat - 1)
  // console.log(seat - arr[i - 1], seat, arr[i - 1])
})