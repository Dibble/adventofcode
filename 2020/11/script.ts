import * as fs from 'fs'

// const file = fs.readFileSync('test.txt', 'utf8')
const file = fs.readFileSync('input.txt', 'utf8')
let lines = file.split(/\r?\n/)

const Floor = '.'
const UnoccupiedSeat = 'L'
const OccupiedSeat = '#'

const getNextState = (seat: string, adjacent: string[]): string => {
  if (seat === Floor) return Floor

  if (seat === UnoccupiedSeat && !adjacent.some(a => a === OccupiedSeat)) return OccupiedSeat

  if (seat === OccupiedSeat && adjacent.filter(a => a === OccupiedSeat).length >= 5) return UnoccupiedSeat

  return seat
}

const getAdjacentSeats = (row: number, column: number): string[] => {
  const adjacent: string[] = []

  for (let r = row -1; r < row + 2; r++) {
    if (r < 0 || r >= layout.length) continue
    for (let c = column - 1; c < column + 2; c++) {
      if (c < 0 || c >= layout[r].length) continue
      if (r === row && c === column) continue

      adjacent.push(layout[r][c])
    }
  }

  return adjacent
}

const getVisibleSeats = (row: number, column: number): string[] => {
  const visible: string[] = []
  const directions: [number, number][] = [
    [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]
  ]

  directions.forEach(([xDiff, yDiff]) => {
    let x = column + xDiff
    let y = row + yDiff

    while (y >= 0 && y < layout.length && x >= 0 && x < layout[y].length) {
      // console.log('while', x, y, layout[y][x], xDiff, yDiff)
      if (layout[y][x] === Floor) {
        x += xDiff
        y += yDiff
        continue
      }

      visible.push(layout[y][x])
      x += xDiff
      y += yDiff

      break
    }
  })

  return visible
}

let layout: string[][] = []

lines.forEach((value: string, row: number) => {
  for (let column = 0; column < value.length; column++) {
    const seat = value[column]
    if (!layout[row]) layout[row] = []
    layout[row][column] = seat
  }
})

const printLayout = () => {
  const friendly = layout.map(r => r.join('')).join('\n')
  console.log(friendly)
}

// printLayout()
// console.log(getVisibleSeats(0, 0))

// console.log(layout)

let seatChanged = true
while(seatChanged) {
  seatChanged = false
  const nextLayout: string[][] = []

  for (let row = 0; row < layout.length; row++) {
    const r = layout[row]
    for (let column = 0; column < r.length; column++) {
      const seat = r[column]
      if (!nextLayout[row]) nextLayout[row] = []

      // const adjacent = getAdjacentSeats(row, column)
      const visible = getVisibleSeats(row, column)
      // console.log(row, column, visible)
      // printLayout()
      const next = getNextState(seat, visible)
      nextLayout[row][column] = next

      if (next !== seat) seatChanged = true
    }
  }

  layout = nextLayout
}

const totalOccupied = layout.reduce((prev, currentRow) => {
  return prev + currentRow.filter(s => s === OccupiedSeat).length
}, 0)
console.log(totalOccupied)