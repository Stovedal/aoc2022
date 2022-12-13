const fs = require('fs')

const newLine =  "\n"
const inputFile = process.argv[2]

console.log('Reading', inputFile)
const data = fs.readFileSync(inputFile,  "utf-8");



const calculatePriority = (item) => {
  const code = item.charCodeAt()
  if (code >= 'a'.charCodeAt()) {
    return code - 'a'.charCodeAt() + 1
  } else {
    return code - 'A'.charCodeAt() + 27
  }
}

const rucksacks = data.split(newLine).map((contents) => {
  const firstCompartment = contents.split('').splice(0, contents.length/2)
  const secondCompartment = contents.split('').splice(contents.length/2)
  return { firstCompartment, secondCompartment }
})

const duplicatedItems = rucksacks.map(({ firstCompartment, secondCompartment }) => {
  return secondCompartment.find((item) => firstCompartment.includes(item))
})

const sumOfItemPriorities = duplicatedItems.reduce((acc, curr) => acc + calculatePriority(curr), 0)

console.log({ sumOfItemPriorities })