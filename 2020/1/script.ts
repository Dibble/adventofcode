import * as fs from 'fs'

// const file = fs.readFileSync('test.txt', 'utf8')
const file = fs.readFileSync('input.txt', 'utf8')
const lines = file.split(/\r?\n/)
// console.log(lines)

const nums = lines.map(line => parseInt(line, 10))
nums.forEach((num, i) => {
  const nums2 = nums.slice(i + 1)
  // console.log('2', nums2)
  nums2.forEach((num2, j) => {
    // if (num + rem === 2020) {
    //   console.log(num, rem, num + rem, num * rem)
    //   return
    // }

    if (num + num2 >= 2020) return

    const nums3 = nums2.slice(j + 1)
    // console.log('3', nums3)
    nums3.forEach(num3 => {
      // console.log(num, num2, num3)
      if (num + num2 + num3 === 2020) {
        console.log('success', num, num2, num3, num + num2 + num3, num * num2 * num3)
        return
      }
    })
  })
})