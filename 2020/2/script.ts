import * as fs from 'fs'

// const file = fs.readFileSync('test.txt', 'utf8')
const file = fs.readFileSync('input.txt', 'utf8')
const lines = file.split(/\r?\n/)

let valid = 0
lines.forEach(line => {
  const [policy, password] = line.split(':')
  // console.log(policy, password)

  const [nums, letter] = policy.split(' ')
  const [first, second] = nums.split('-')
  // console.log(min, max, letter, password)

  // let count = 0
  // for (let i = 0; i < password.length; i++) {
  //   const character = password[i];
  //   if (character === letter) count++
  // }

  // if (count >= parseInt(min) && count <= parseInt(max)) {
  //   valid++
  //   console.log('valid', line)
  // }

  const valid1 = password[parseInt(first)] === letter
  const valid2 = password[parseInt(second)] === letter
  // console.log(line, valid1, valid2)

  if ((valid1 && !valid2) || (!valid1 && valid2)) {
    console.log('valid', line)
    valid++
  }
})

console.log(valid)