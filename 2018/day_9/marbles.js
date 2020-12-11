const NumberOfPlayers = 411
const NumberOfMarbles = 7117000

let currentPlayer = 1
let currentMarble = 1
let currentMarblePosition = 0

let playerScores = new Array(NumberOfPlayers).fill(0)

const newNode = (value) => {
  let node = { Value: value }
  node.Next = node
  node.Prev = node

  return node
}

const removeNode = (node) => {
  let prev = node.Prev
  let next = node.Next

  prev.Next = next
  next.Prev = prev
}

const insertNode = (insertAfter, node) => {
  let next = insertAfter.Next
  insertAfter.Next = node
  next.Prev = node
  node.Prev = insertAfter
  node.Next = next
}

let currentNode = newNode(0)

while (currentMarble <= NumberOfMarbles) {
  if (currentMarble % 23 === 0) {
    playerScores[currentPlayer - 1] += currentMarble

    // let positionToRemove = currentMarblePosition - 7
    // if (positionToRemove < 0) positionToRemove += circle.length
    for (let i = 0; i < 7; i++) {
      currentNode = currentNode.Prev
    }

    playerScores[currentPlayer - 1] += currentNode.Value
    // playerScores[currentPlayer - 1] += circle[positionToRemove]

    // circle.splice(positionToRemove, 1)
    currentNode = currentNode.Next
    removeNode(currentNode.Prev)
    // currentMarblePosition = positionToRemove
  } else {
    // let newPosition = currentMarblePosition + 2
    // while (newPosition > circle.length) newPosition -= circle.length
    let newest = newNode(currentMarble)
    insertNode(currentNode.Next, newest)

    // circle.splice(newPosition, 0, currentMarble)
    // currentMarblePosition = newPosition
    currentNode = newest
  }

  currentMarble++
  currentPlayer++
  if (currentPlayer > NumberOfPlayers) currentPlayer = 1
}

console.log(playerScores.reduce((accumulator, current) =>
  current > accumulator ? current : accumulator, 0))

// console.log(playerScores)