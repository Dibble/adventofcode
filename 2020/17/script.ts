import * as fs from 'fs'

// const file = fs.readFileSync('test.txt', 'utf8')
const file = fs.readFileSync('input.txt', 'utf8')
const lines = file.split(/\r?\n/)

interface Cube {
  x: number,
  y: number,
  z: number,
  w: number
}

let activeCubes: Cube[] = []

lines.forEach((line: string, i: number) => {
  for (let s = 0; s < line.length; s++) {
    const cube = line[s]
    if (cube === '#') {
      activeCubes.push({
        x: s,
        y: i,
        z: 0,
        w: 0
      })
    }
  }
})
console.log('initial', activeCubes.length)

for (let cycle = 0; cycle < 6; cycle++) {
  const xMin = Math.min(...activeCubes.map(cube => cube.x))
  const xMax = Math.max(...activeCubes.map(cube => cube.x))
  const yMin = Math.min(...activeCubes.map(cube => cube.y))
  const yMax = Math.max(...activeCubes.map(cube => cube.y))
  const zMin = Math.min(...activeCubes.map(cube => cube.z))
  const zMax = Math.max(...activeCubes.map(cube => cube.z))
  const wMin = Math.min(...activeCubes.map(cube => cube.w))
  const wMax = Math.max(...activeCubes.map(cube => cube.w))

  const nextActiveCubes: Cube[] = []
  for (let x = xMin - 1; x <= xMax + 1; x++) {
    for (let y = yMin - 1; y <= yMax + 1; y++) {
      for (let z = zMin - 1; z <= zMax + 1; z++) {
        for (let w = wMin - 1; w <= wMax + 1; w++) {

          const nearbyActive = activeCubes.filter(cube => Math.abs(cube.x - x) <= 1 && Math.abs(cube.y - y) <= 1 && Math.abs(cube.z - z) <= 1 && Math.abs(cube.w - w) <= 1)
          const currentCubeInactive = activeCubes.find(cube => cube.x === x && cube.y === y && cube.z === z && cube.w === w) === undefined
          // console.log(x, y, z, nearbyActive, currentCubeInactive)

          if (currentCubeInactive && nearbyActive.length === 3) {
            nextActiveCubes.push({ x, y, z, w })
          } else if (!currentCubeInactive && (nearbyActive.length === 3 || nearbyActive.length === 4)) { // nearbyActive includes current cube
            nextActiveCubes.push({ x, y, z, w })
          }
        }
      }
    }
  }

  activeCubes = nextActiveCubes
  // console.log(cycle, activeCubes)
}

console.log(activeCubes.length)