const fs = require('fs')

const input = fs.readFileSync("input.txt", { encoding: "utf-8" })
let lines = input.split("\n")

let entries = {}

for (row = 0; row < lines.length; row++) {
  let timestamp = lines[row].substring(1, 17).trim()
  let text = lines[row].substring(18).trim()

  entries[Date.parse(timestamp).valueOf()] = text
}

let sortedKeys = Object.keys(entries).sort().reverse()

let currentGuard = ''
let guardAsleep = null
let guardPattern = {} // { '3109': { '0': 0, '1': 0 ...}}

for (var key in sortedKeys) {
  let time = sortedKeys[key]
  let activity = entries[time]

  const re = /Guard \#([0-9]+) begins shift/
  let match = activity.match(re)
  if (match) {
    currentGuard = match[1]
    guardAsleep = null
    if (guardPattern[currentGuard] === undefined) guardPattern[currentGuard] = {}

  } else if (activity === "falls asleep") {
    let sleepTime = new Date()
    sleepTime.setTime(time)
    guardAsleep = sleepTime

  } else if (activity === "wakes up") {
    let wakeTime = new Date()
    wakeTime.setTime(time)

    for (let x = guardAsleep.getMinutes(); x < wakeTime.getMinutes(); x++) {
      if (guardPattern[currentGuard][x.toString()] === undefined) {
        guardPattern[currentGuard][x.toString()] = 1
      } else {
        guardPattern[currentGuard][x.toString()]++
      }

      // if (guardPattern[currentGuard]['total'] === undefined) guardPattern[currentGuard]['total'] = 0
      // guardPattern[currentGuard]['total']++
    }
  }
}

// let sleepiestGuard = Object.keys(guardPattern).reduce((previous, current) => {
//   return guardPattern[previous]['total'] > guardPattern[current]['total'] ? previous : current
// })

// find sleepiest minute per guard
let sleepiestGuardMinute = {}
Object.keys(guardPattern).forEach((guard) => {
  let minutes = guardPattern[guard]

  if (Object.keys(minutes).length > 0) {
    sleepiestGuardMinute[guard] = Object.keys(minutes).reduce((previous, current) => {
      return minutes[previous] > minutes[current] ? previous : current
    })
  }
})

let sleepiestGuard = null
let sgm = 0
Object.keys(guardPattern).forEach((guard) => {
  if (guardPattern[guard][sleepiestGuardMinute[guard]] > sgm) {
    sleepiestGuard = guard
    sgm = guardPattern[guard][sleepiestGuardMinute[guard]]
  }
})

console.log(sleepiestGuard)
console.log(sleepiestGuardMinute[sleepiestGuard])
console.log(parseInt(sleepiestGuard) * parseInt(sleepiestGuardMinute[sleepiestGuard]))
