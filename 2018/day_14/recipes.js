let [elf1, elf2] = [0, 1]
let recipes = ['3', '7']
// const improvements = 768071
const pattern = '768071'

const addNewRecipes = () => {
  let recipeSum = parseInt(recipes[elf1]) + parseInt(recipes[elf2])
  let newRecipes = recipeSum.toString().split('')

  newRecipes.forEach(recipe => recipes.push(recipe))
}

const moveElves = () => {
  elf1 = (elf1 + 1 + parseInt(recipes[elf1])) % recipes.length
  elf2 = (elf2 + 1 + parseInt(recipes[elf2])) % recipes.length
}

// while (recipes.length < improvements + 10) {
//   addNewRecipes()
//   moveElves()
// }

// console.log(recipes.slice(improvements, improvements + 10).join(''))

while (recipes.length <= pattern.length || !recipes.slice(recipes.length - pattern.length - 1).join('').includes(pattern)) {
  addNewRecipes()
  moveElves()
}

console.log(recipes.slice(recipes.length - pattern.length - 1))
console.log(recipes.length)