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
  return contents.split('')
})

const { groups: rucksackGroups} = rucksacks.reduce(({ groups, counter }, rucksack) => {
  if (counter < 2) {
    groups[groups.length - 1].push(rucksack)
    return { groups, counter: counter + 1 }
  } else {
    groups.push([rucksack])
    return { groups, counter: 0 }
  }
}, { groups: [], counter: 3 })


const findBadge = (rucksackGroup) => {
  const [ group1, group2, group3 ] = rucksackGroup

  return group1.find((item) => (group2.includes(item) && group3.includes(item)))
}

const totPriorities = rucksackGroups.reduce((priorities, group) => {
  const badge = findBadge(group)
  return priorities + calculatePriority(badge)
}, 0)

console.log(totPriorities)