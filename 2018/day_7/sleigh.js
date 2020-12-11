const fs = require('fs')

const input = fs.readFileSync("day_7/input.txt", { encoding: "utf-8" }).trim()
// const input = fs.readFileSync("day_7/example.txt", { encoding: "utf-8" }).trim()
let lines = input.split('\n')

let dependsOn = {} // {'A' : ['B', 'X', 'Q']}
const lineRegex = /^Step ([A-Z]) must be finished before step ([A-Z]) can begin.$/

let availableSteps = []

for (let row in lines) {
  let line = lines[row].trim()

  let match = line.match(lineRegex)
  let dependency = match[1]
  let step = match[2]

  if (dependsOn[step] === undefined) dependsOn[step] = []
  dependsOn[step].push(dependency)

  if (availableSteps.indexOf(step) === -1) availableSteps.push(step)
  if (availableSteps.indexOf(dependency) === -1) availableSteps.push(dependency)
}

// console.log(dependsOn)

let completedSteps = []
let currentWork = {} // {'A': 64, 'C': 55}
let currentTime = 0

while (completedSteps.length < availableSteps.length) {
  // console.log(currentTime)
  for (var work in currentWork) {
    // console.log(work)
    // console.log(currentWork[work], currentTime)
    if (currentWork[work] <= currentTime) {
      // console.log(work)
      completedSteps.push(work)
      delete currentWork[work]
    }
  }

  let readySteps = availableSteps
    .filter((val) => !completedSteps.includes(val))
    .filter((val) => !Object.keys(currentWork).includes(val))
    .filter((val) => {
      if (dependsOn[val] === undefined) return true

      return dependsOn[val].reduce((accumulator, current) => {
        return accumulator && completedSteps.includes(current)
      }, true)
    })

  // console.log(readySteps)
  // console.log(currentTime, completedSteps.length, readySteps.length, OBject.keys(currentWork).length)

  // console.log(readySteps)
  let offset = 0
  let nextSteps = readySteps.sort()
  while (Object.keys(currentWork).length < 5 && offset < nextSteps.length) {
    // console.log('add work')
    currentWork[nextSteps[offset]] = currentTime + (nextSteps[offset].charCodeAt(0) - 4)
    offset++
  }
  // let nextStep = readySteps.sort()[0]
  // console.log(nextStep)
  // completedSteps.push(nextStep)

  currentTime++
}

console.log(completedSteps.join(''))
console.log(currentTime - 1)