const direction = require('./direction')

let id = 0

class Cart {
  constructor (x, y, direction) {
    this.id = id
    this.x = x
    this.y = y
    this.direction = direction
    this.turns = 0

    this.move = this.move.bind(this)

    id++
  }

  move (currentTrack) {
    console.log(`moving cart ${this.id}`, this.x, this.y, currentTrack)

    switch (currentTrack) {
      case '-':
      case '|':
        this.moveForward()
        break
      case '/':
        if (this.direction === direction.UP || this.direction === direction.DOWN) {
          this.turnRight()
          this.moveForward()
        } else if (this.direction === direction.RIGHT || this.direction === direction.LEFT) {
          this.turnLeft()
          this.moveForward()
        }
        break
      case '\\':
        if (this.direction === direction.UP || this.direction === direction.DOWN) {
          this.turnLeft()
          this.moveForward()
        } else if (this.direction === direction.RIGHT || this.direction === direction.LEFT) {
          this.turnRight()
          this.moveForward()
        }
        break
      case '+':
        if (this.turns % 3 === 0) {
          this.turnLeft()
        } else if (this.turns % 3 === 2) {
          this.turnRight()
        }

        this.turns++
        this.moveForward()
        break
    }

    return [this.x, this.y]
  }

  moveForward () {
    switch (this.direction) {
      case direction.LEFT:
        this.x--
        break
      case direction.RIGHT:
        this.x++
        break
      case direction.UP:
        this.y--
        break
      case direction.DOWN:
        this.y++
        break
    }
  }

  turnLeft () {
    switch (this.direction) {
      case direction.LEFT:
        this.direction = direction.DOWN
        break
      case direction.RIGHT:
        this.direction = direction.UP
        break
      case direction.UP:
        this.direction = direction.LEFT
        break
      case direction.DOWN:
        this.direction = direction.RIGHT
        break
    }
  }

  turnRight () {
    switch (this.direction) {
      case direction.LEFT:
        this.direction = direction.UP
        break
      case direction.RIGHT:
        this.direction = direction.DOWN
        break
      case direction.UP:
        this.direction = direction.RIGHT
        break
      case direction.DOWN:
        this.direction = direction.LEFT
        break
    }
  }
}

module.exports = Cart