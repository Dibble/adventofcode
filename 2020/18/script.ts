import * as fs from 'fs'

// const file = fs.readFileSync('test.txt', 'utf8')
const file = fs.readFileSync('input.txt', 'utf8')
const lines = file.split(/\r?\n/)

const findParenEnd = (input: string): number => {
  let depth: number = 0
  // console.log('find paren', input)

  for (let i = 0; i < input.length; i++) {
    const char = input[i]
    switch (char) {
      case '(':
        depth++
        break
      case ')':
        depth--
        break
    }

    if (depth === 0) {
      // console.log('found paren', i)
      return i
    }
  }

  return -1
}

const applyOp = (left: number, op: string, right: number): number => {
  // console.log('op', `${left} ${op} ${right}`)
  switch (op) {
    case '+':
      return left + right
    case '*':
      return left * right
  }

  throw new Error(`invalid op ${op}`)
}

const solve = (input: string): number => {
  console.log(`solving ${input}`)
  
  let left: number
  let op: string
  let num: string = ''

  while (input.length > 0) {
    const nextChar = input[0]
    input = input.substring(1)
    // console.log('char', nextChar)

    switch (nextChar) {
      case ' ':
        if (num.length === 0) break
        // number complete, parseInt
        // apply left op right
        // set num to empty
        if (left === undefined) {
          left = parseInt(num)
          // console.log('left', left)
        } else {
          // console.log('right', right)
          
          left = applyOp(left, op, parseInt(num))
          op = ''
        }
            
        num = ''
        break
      case '(':
        // find end of parens
        // solve sub expression
        // left op right
        // chop entire parens from line
        const parenEnd = findParenEnd(nextChar + input)
        const value = solve(input.substring(0, parenEnd - 1))
        // console.log('paren end', input, parenEnd, input[parenEnd], value)

        if (left === undefined) {
          left = value
        } else {
          left = applyOp(left, op, value)

          op = ''
        }
        input = input.substring(parenEnd)
        break
      case '+':
      case '*':
        // console.log('op', nextChar)
        op = nextChar
        break
      default:
        // must be digit
        // add digit to num
        num = num + nextChar
        break
    }
  }

  // if num not empty do final op
  if (num.length > 0) {
    left = applyOp(left, op, parseInt(num))
  }

  console.log('solved', left)
  return left
}

const solve2 = (input: string): number => {
  while (input.includes('(')) {
    const firstParen = input.indexOf('(')
    const endParen = findParenEnd(input.substring(firstParen))

    const sub = input.substring(firstParen + 1, firstParen + endParen)
    // console.log('parens', firstParen, endParen, sub)
    const value = solve2(sub)
    input = `${firstParen > 0 ? input.slice(0, firstParen) : ''}${value}${input.slice(firstParen + endParen + 1)}`
  }
  // console.log('parens solved', input)

  while (input.includes('+')) {
    let parts = input.split(' ')
    let op = parts.indexOf('+')
    let left = parts[op - 1]
    let right = parts[op + 1]

    input = [...parts.slice(0, op - 1), parseInt(left) + parseInt(right), ...parts.slice(op + 2)].join(' ')
  }
  // console.log('add', input)

  while (input.includes('*')) {
    const parts = input.split(' ')
    const op = parts.indexOf('*')
    const left = parts[op - 1]
    const right = parts[op + 1]
    // console.log('mult input', parts, op, left, right)
    // console.log('mult output', parts.slice(0, op - 1), parseInt(left) * parseInt(right), parts.slice(op + 2))

    input = [...parts.slice(0, op - 1), parseInt(left) * parseInt(right), ...parts.slice(op + 2)].join(' ')
  }
  
  // console.log('solved', input)
  return parseInt(input)
}

// let line = lines[0]
// let line = lines[3] // 13632
// let line = lines[5]
// console.log(solve2(line))
console.log(lines.map(line => {
  const result = solve2(line)
  console.log(line, result)
  return result
}).reduce((prev: number, current: number) => prev + current, 0))