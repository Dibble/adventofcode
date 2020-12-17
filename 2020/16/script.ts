import * as fs from 'fs'

// const file = fs.readFileSync('test.txt', 'utf8')
const file = fs.readFileSync('input.txt', 'utf8')
const lines = file.split(/\r?\n/)

interface Rule {
  name: string,
  ranges: [number, number][]
}

type Ticket = number[]

const rules: Rule[] = []
let myTicket: Ticket = []
const nearbyTickets: Ticket[] = []

let mode = 'rules'

lines.forEach(line => {
  if (line.trim() === '') {
    return
  }

  if (line === 'your ticket:') {
    mode = 'mine'
    return
  }

  if (line === 'nearby tickets:') {
    mode = 'nearby'
    return
  }

  switch (mode) {
    case 'rules':
      const matches = line.match(/([a-z\s]+):\s([0-9]+)-([0-9]+)\sor\s([0-9]+)-([0-9]+)/)
      if (matches === null) {
        console.error('failed to parse rule', line)
        return
      }
      // console.log('rule', matches[1], matches[2], matches[3], matches[4], matches[5])
      rules.push({
        name: matches[1],
        ranges: [
          [parseInt(matches[2]), parseInt(matches[3])],
          [parseInt(matches[4]), parseInt(matches[5])]
        ]
      })
      break
    case 'mine':
      myTicket = line.split(',').map(v => parseInt(v))
      // console.log('mine', myTicket)
      break
    case 'nearby':
      const ticket = line.split(',').map(v => parseInt(v))
      nearbyTickets.push(ticket)
      // console.log('nearby', ticket)
      break
  }
})

// console.log(rules, myTicket, nearbyTickets)

// const invalidTickets = nearbyTickets.map((ticket, i) => {
//   const invalidValues = ticket.filter(value => {
//     return rules.every(rule => {
//       return rule.ranges.every(range => {
//         const isInvalid = value < range[0] || value > range[1]
//         // console.log(i, value, range[0], range[1], isInvalid)
//         return isInvalid
//       })
//     })
//   })

//   return invalidValues.reduce((prev, current) => prev + current, 0)
// })

// console.log(invalidTickets)
// console.log(invalidTickets.reduce((prev, current) => prev + current, 0))

const validTickets = nearbyTickets.filter(ticket => {
  return ticket.every(value => {
    return rules.some(rule => {
      // value is within rule ranges
      return rule.ranges.some(range => {
        return value >= range[0] && value <= range[1]
      })
    })
  })
})

// console.log(validTickets)
const orderedRules: Rule[] = []
let i = 0
while (orderedRules.filter(rule => rule !== undefined).length < myTicket.length) {
  const validRules = rules.filter(rule => {
    if (rule === undefined) return false

    return [myTicket, ...validTickets].every((ticket, j) => {
      return rule.ranges.some(range => {
        // console.log(i, j, ticket[i] >= range[0] && ticket[i] <= range[1])
        return ticket[i] >= range[0] && ticket[i] <= range[1]
      })
    })
  })

  if (validRules.length === 1) {
    const ruleId = rules.findIndex((rule: Rule) => rule !== undefined && rule.name === validRules[0].name)
    console.log('found rule order', i, ruleId, rules[ruleId].name)
    orderedRules[i] = (rules[ruleId])
    delete rules[ruleId]
  }

  i = (i + 1) % myTicket.length
}

console.log(orderedRules)
let result = 1
orderedRules.forEach((rule, i) => {
  if (rule.name.startsWith('departure')) {
    console.log(rule.name, myTicket[i])
    result *= myTicket[i]
  }
})

console.log(result)