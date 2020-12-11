import * as fs from 'fs'

// const file = fs.readFileSync('test.txt', 'utf8')
const file = fs.readFileSync('input.txt', 'utf8')
let lines = file.split(/\r?\n/)

interface Content {
  amount: number,
  color: string
}

let rules: { [key: string]: Content[] } = {}

lines.forEach(line => {
  let [color, contents] = line.split('bags contain')
  color = color.trim()
  contents = contents.trim()

  rules[color] = []
  if (contents === 'no other bags.') {
    return
  }

  const bags = contents.split(',')
  bags.forEach(bag => {
    bag = bag.trim()
    if (bag.endsWith('.')) bag = bag.slice(0, bag.length - 1)

    const matches = bag.match(/([0-9]+)\s(.*)\sbags?/) || []

    rules[color] = [...rules[color], {
      amount: parseInt(matches[1]),
      color: matches[2]
    }]
  })
})

// console.log(rules)

// const options: Set<string> = new Set()
// let knownOptions = -1

// const getContainers = (bag: string) => Object.keys(rules)
//   .filter(r => rules[r].some(c => c.color === bag))

// getContainers('shiny gold').forEach(c => options.add(c))

// while (options.size !== knownOptions) {
//   knownOptions = options.size

//   options.forEach(option => {
//     getContainers(option).forEach(c => options.add(c))
//   })
// }

// console.log(options.size)

interface Node {
  bag: string,
  explored: boolean
}

const contents: Node[] = []

rules['shiny gold'].forEach(r => {
  for (let i = 0; i < r.amount; i++) {
    contents.push({
      bag: r.color,
      explored: false
    })
  }
})

while (contents.some(c => !c.explored)) {
  const nextNode = contents.find(c => !c.explored)
  if (!nextNode) continue

  const rule = rules[nextNode.bag]
  rule.forEach(r => {
    for (let i = 0; i < r.amount; i++) {
      contents.push({
        bag: r.color,
        explored: false
      })
    }
  })

  nextNode.explored = true
}

console.log(contents.length)