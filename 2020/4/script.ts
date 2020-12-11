import * as fs from 'fs'

// const file = fs.readFileSync('test.txt', 'utf8')
const file = fs.readFileSync('input.txt', 'utf8')
let lines = file.split(/\r?\n/)

// console.log(lines)

let passports = []

while (lines.indexOf('') > -1) {
  const gap = lines.indexOf('')
  const passport = lines.slice(0, gap)

  passports.push(passport.join(' '))

  lines = lines.slice(gap + 1)
  // console.log(gap, lines)
}
passports.push(lines.join(' '))

// console.log(passports)

let valid = 0

passports.forEach(passport => {
  console.log(passport)

  const fields = passport.split(' ')
  const requiredFields: [string, (value: string) => boolean][] = [
    ['byr', (value: string) => value.length === 4 && parseInt(value) >= 1920 && parseInt(value) <= 2002],
    ['iyr', (value: string) => value.length === 4 && parseInt(value) >= 2010 && parseInt(value) <= 2020],
    ['eyr', (value: string) => value.length === 4 && parseInt(value) >= 2020 && parseInt(value) <= 2030],
    ['hgt', (value: string) => {
      const unit = value.substring(value.length - 2)
      const num = value.substring(0, value.length - 2)
      switch (unit) {
        case 'cm':
          return parseInt(num) >= 150 && parseInt(num) <= 193
        case 'in':
          return parseInt(num) >= 59 && parseInt(num) <= 76
        default:
          return false
      }
    }],
    ['hcl', (value: string) => value.length === 7 && /#[0-9a-f]{6}/.test(value)],
    ['ecl', (value: string) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value)],
    ['pid', (value: string) => value.length === 9 && /[0-9]{9}/.test(value)]
  ]

  if (requiredFields.every(([reqField, isValid]) => {
    const matchingField = fields.filter(f => f.startsWith(`${reqField}:`))
    const isOk = matchingField.length === 1 && isValid(matchingField[0].substring(4))
    console.log(matchingField[0], isOk)
    return isOk
  })) {
    console.log(passport)
    valid ++
  }
})

console.log(valid)