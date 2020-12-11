import * as fs from 'fs'

// const file = fs.readFileSync('test.txt', 'utf8')
const file = fs.readFileSync('input.txt', 'utf8')
let lines = file.split(/\r?\n/)

let groups = []

while (lines.indexOf('') > -1) {
  const gap = lines.indexOf('')
  const group = lines.slice(0, gap)

  groups.push(group.join('|'))

  lines = lines.slice(gap + 1)
  // console.log(gap, lines)
}
groups.push(lines.join('|'))

// console.log(groups)

let counts: number[] = []

groups.forEach(group => {
  let questions: { [key: string]: boolean } = {}
  let members = group.split('|')

  for (let i = 0; i < members[0].length; i++) {
    const answer = members[0][i];
    questions[answer] = true
  }

  if (members.length > 1) {
    const others = members.slice(1)

    counts.push(Object.keys(questions)
      .filter(q => questions[q])
      .filter(q => others.every(o => o.includes(q)))
      .length)
  } else {
    counts.push(members[0].length)
  }

  // counts.push(Object.keys(questions).filter(q => questions[q]).length)
})

console.log(counts.reduce((prev, current) => prev + current, 0))