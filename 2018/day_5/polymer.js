const fs = require('fs')

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

const input = fs.readFileSync("input.txt", { encoding: "utf-8" }).trim()
// const input = fs.readFileSync("example.txt", { encoding: "utf-8" })

let results = {}

for (var unit in alphabet) {
  let oldPolymer = ''
  let polymer = input

  console.log('before', polymer.length)
  let oldLength = 0
  while (oldLength !== polymer.length) {
    oldLength = polymer.length
    polymer = polymer.replace(alphabet[unit], '')
    polymer = polymer.replace(alphabet[unit].toUpperCase(), '')
  }
  console.log('after', polymer.length)

  while (oldPolymer !== polymer) {
    oldPolymer = polymer

    for (var a in alphabet) {
      polymer = polymer.replace(alphabet[a] + alphabet[a].toUpperCase(), '')
      polymer = polymer.replace(alphabet[a].toUpperCase() + alphabet[a], '')
    }
  }

  results[alphabet[unit]] = polymer.length
}

console.log(results)