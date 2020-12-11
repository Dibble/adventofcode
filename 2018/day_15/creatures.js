const PF = require('pathfinding')

class Creature {
  constructor (x, y) {
    this.x = x
    this.y = y
    this.enemy = null
    this.health = 200
    this.power = 3

    this.attack = this.attack.bind(this)
    this.move = this.move.bind(this)
    this.getAdjacentEnemies = this.getAdjacentEnemies.bind(this)
    this.getPath = this.getPath.bind(this)
  }

  getPath (map, sourceX, sourceY) {
    let finder = new PF.AStarFinder()
    let grid = new PF.Grid(map.length, map[0].length)

    for (let x = 0; x < map.length; x++) {
      for (let y = 0; y < map[x].length; y++) {
        if (map[x][y] !== '.') grid.setWalkableAt(x, y, false)
      }
    }

    return (destination) => {
      return finder.findPath(sourceX, sourceY, destination.x, destination.y, grid)
    }
  }

  getAdjacentEnemies (map) {
    return [
      { x: this.x, y: this.y - 1 },
      { x: this.x - 1, y: this.y },
      { x: this.x + 1, y: this.y },
      { x: this.x, y: this.y + 1 }
    ].filter(square => map[square.x][square.y] === this.enemy)
  }

  attack (map, enemies) {
    let adjacentEnemies = this.getAdjacentEnemies(map)
    if (adjacentEnemies.length > 0) {
      let target = enemies.find(enemy => enemy.x === adjacentEnemies[0].x && enemy.y === adjacentEnemies[0].y)
      target.health = target.health - this.power
      console.log(this.self, 'attacking', target.self, 'health:', target.health, 'remaining enemies:', enemies.length)
      return true
    }

    return false
  }

  move (map, enemies) {
    let inReach = []
    enemies.forEach(enemy => inReach.push(
      { x: enemy.x, y: enemy.y - 1 },
      { x: enemy.x - 1, y: enemy.y },
      { x: enemy.x + 1, y: enemy.y },
      { x: enemy.x, y: enemy.y + 1 }
    ))
    inReach = inReach.filter(position => map[position.x][position.y] === '.')

    if (inReach.length === 0) return

    let routes = inReach.map(this.getPath(map, this.x, this.y)).filter(route => route.length > 0)
    if (routes.length === 0) return

    routes.sort((a, b) => {
      if (a.length < b.length) return -1
      if (a.length === b.length) return 0
      if (a.length > b.length) return 1
    })

    let shortestRoutes = routes.filter(route => route.length <= routes[0].length)
    shortestRoutes.sort((a, b) => {
      let aDestination = a[a.length - 1]
      let bDestination = b[b.length - 1]

      if (aDestination[1] < bDestination[1]) return -1
      if (aDestination[1] > bDestination[1]) return 1
      if (aDestination[0] < bDestination[0]) return -1
      if (aDestination[0] > bDestination[0]) return 1
      return 0
    })

    let route = shortestRoutes[0]
    let nextPosition = route[1]

    map[this.x][this.y] = '.'
    this.x = nextPosition[0]
    this.y = nextPosition[1]
    map[this.x][this.y] = this.self
  }
}

class Elf extends Creature {
  constructor (x, y) {
    super(x, y)
    this.self = 'E'
    this.enemy = 'G'
  }
}

class Goblin extends Creature {
  constructor (x, y) {
    super(x, y)
    this.self = 'G'
    this.enemy = 'E'
  }
}

module.exports = { Goblin, Elf }