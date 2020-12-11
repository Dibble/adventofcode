const fs = require('fs')
const { Goblin, Elf } = require('./creatures')

const input = fs.readFileSync('day_15/ex_27755.txt', { encoding: "utf-8" }).trim()
// const input = fs.readFileSync('day_15/input.txt', { encoding: "utf-8" }).trim()
const lines = input.split('\n')

let map = []
let goblins = []
let elves = []

for (let i = 0; i < lines.length; i++) {
  for (let j = 0; j < lines[0].length; j++) {
    if (map[j] === undefined) map[j] = []

    switch (lines[i][j]) {
      case 'G':
        goblins.push(new Goblin(j, i))
        break
      case 'E':
        elves.push(new Elf(j, i))
        break
    }

    map[j][i] = lines[i][j]
  }
}

let roundsComplete = 0
while (goblins.length > 0 && elves.length > 0) {
  let creatures = [...goblins, ...elves]
  creatures.sort((a, b) => {
    if (a.y < b.y) return -1
    if (a.y > b.y) return 1
    if (a.x < b.x) return -1
    if (a.x > b.x) return 1
    return 0
  })

  creatures.forEach(creature => {
    if (creature.health <= 0) return
    let enemies = null
    switch (creature.self) {
      case 'G':
        enemies = elves
        break
      case 'E':
        enemies = goblins
        break
    }

    if (enemies.length === 0) return

    if (!creature.attack(map, enemies)) {
      creature.move(map, enemies)
    } else {
      enemies.filter(enemy => enemy.health <= 0).forEach(enemy => map[enemy.x][enemy.y] = '.')
      enemies = enemies.filter(enemy => enemy.health > 0)
    }
  })

  goblins = goblins.filter(goblin => goblin.health > 0)
  elves = elves.filter(elf => elf.health > 0)

  roundsComplete++
}

console.log('rounds complete: ', roundsComplete)
console.log('elves HP: ', elves.reduce((hp, elf) => hp + elf.health, 0))
console.log('goblins HP: ', goblins.reduce((hp, goblin) => hp + goblin.health, 0))