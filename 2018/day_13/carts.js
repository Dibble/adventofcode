const fs = require('fs')
const direction = require('./direction')
const Cart = require('./cart')

const input = fs.readFileSync("day_13/input.txt", { encoding: "utf-8" })
// const input = fs.readFileSync("day_13/example2.txt", { encoding: "utf-8" })
const lines = input.split('\n')

let tracks = []
let carts = []
let collision = false

// const checkCollision = () => carts.forEach(cart1 => {
//   let collisions = carts.filter(cart2 => cart1.x === cart2.x && cart1.y === cart2.y)

//   if (collisions.length > 1) {
//     collision = true
//     console.log(cart1.x, cart1.y)
//   }
// })
const checkCollision = (id, x, y) => {
  let cartsHere = carts.filter(cart => {
    let keep = cart.x === x && cart.y === y
    return keep
  })
  if (cartsHere.length > 1) carts = carts.filter(cart => {
    return cart.x !== x || cart.y !== y
  })
}

const cartSorter = (a, b) => {
  if (a.y < b.y) return -1
  if (a.y > b.y) return 1
  if (a.y === b.y && a.x < b.x) return -1
  if (a.x === b.x && a.y === b.y) return 0
  return 1
}

for (let i = 0; i < lines.length; i++) {
  let line = lines[i]

  for (let j = 0; j < line.length; j++) {
    if (tracks[j] === undefined) tracks[j] = []
    let character = line[j]

    if (character === '>') {
      carts.push(new Cart(j, i, direction.RIGHT))
      tracks[j][i] = '-'
    } else if (character === '<') {
      carts.push(new Cart(j, i, direction.LEFT))
      tracks[j][i] = '-'
    } else if (character === 'v') {
      carts.push(new Cart(j, i, direction.DOWN))
      tracks[j][i] = '|'
    } else if (character === '^') {
      carts.push(new Cart(j, i, direction.UP))
      tracks[j][i] = '|'
    } else {
      tracks[j][i] = character
    }
  }
}

while (carts.length > 1) {
  carts.sort(cartSorter)

  carts.forEach(cart => {
    let cartTrack = tracks[cart.x][cart.y]
    let [x, y] = cart.move(cartTrack)

    checkCollision(cart.id, x, y)
  })
}

console.log(carts)
console.log(carts[0].id, carts[0].x, carts[0].y)
