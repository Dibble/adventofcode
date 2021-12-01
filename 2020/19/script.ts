import * as fs from 'fs'

const file = fs.readFileSync('test.txt', 'utf8')
// const file = fs.readFileSync('input.txt', 'utf8')
const lines = file.split(/\r?\n/)

interface Rule {
  id: number
  children: number[][]
  character: string
}

const space = lines.findIndex(line => line.trim() === '')
const rules: Rule[] = lines.slice(0, space).map(line => {
  const split = line.split(':')
  const id = parseInt(split[0])
  const rule = split[1].trim()

  if (rule.startsWith('"')) {
    return {
      id,
      character: rule.substring(1, rule.length - 1),
      children: []
    }
  }

  const children = rule.split('|').map(r => r.trim().split(' ').map(id => parseInt(id)))
  return {
    id,
    children,
    character: ''
  }
})

const messages: string[] = lines.slice(space + 1)

// console.log(rules, messages)
// console.log(rules.map(r => `${r.id}: ${JSON.stringify(r.children)}`))

type Status = [boolean, string]

const testRule = (ruleId: number, message: string): Status => {
  const rule = rules.find(r => r.id === ruleId)
  if (rule === undefined) throw new Error(`failed to find rule ${ruleId}`)

  if (rule.character !== '' && message.startsWith(rule.character)) {
    return [true, message.substring(rule.character.length)]
  }

  if (ruleId === 8) {
    // 1+ matches of rule 42
    let result42: Status = [true, message]
    while (result42[0] && result42[1].length > 0) {
      result42 = testRule(42, result42[1])
    }

    if (message !== result42[1]) { // at least one match of 42, some of message has been consumed
      return [true, result42[1]]
    }

    return [false, message]
  }

  if (ruleId === 11) {
    // n 42s, followed by n 31s, where n >= 1

    // count matches of rule 42, until first match of rule 31
    let match42 = 0
    let match31 = false
    let messageTest = message
    while (!match31 && messageTest.length > 0) {
      const result31 = testRule(31, messageTest)
      if (result31[0] && match42 > 0) { // found at least one 42, first match of 31
        match31 = true
      } else {
        const result42 = testRule(42, messageTest)
        if (result42[0]) { // matches rule 42
          match42++
          messageTest = result42[1]
        } else { // doesn't match either rule 42 or rule 31
          return [false, '']
        }
      }
    }

    if (match42 > 0 && messageTest.length > 0) {
      // check matches of rule 31 equals same number
      let match31 = 0
      while (match31 < match42 && messageTest.length > 0) {
        const result31 = testRule(31, messageTest)
        if (result31[0]) {
          match31++
          messageTest = result31[1]
        } else {
          return [false, '']
        }
      }

      if (match31 === match42) {
        return [true, messageTest]
      }

      return [false, '']
    } else {
      return [false, '']
    }
  }
  
  let result: Status = [false, message]
  rule.children.forEach((child: number[]) => {
    if (result[0]) {
      return
    }

    let status: Status = [true, message]
    child.forEach(ruleId => {
      if (!status[0]) return
      const [isValid, remaining] = testRule(ruleId, status[1])
      status = [isValid, remaining]
    })

    result = status
  })

  return result
}

const validMessages = messages.filter(message => {
  const [valid, remaining] = testRule(0, message)

  return valid && remaining.length === 0
})

console.log(validMessages, validMessages.length)