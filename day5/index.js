const fs = require('fs');
const { countPairOverlaps } = require('./task1');

const newLine =  "\n"
const empty = '   '
const inputFile = process.argv[2]

console.log('Reading', inputFile)

const data = fs.readFileSync(inputFile,  "utf-8");

const [stacks, instructions] = data.split(newLine+newLine).map(line => line.split(newLine))

stacks.pop()
stacks.reverse()

const parseStackLine = (line) => {
  const stackRegex = new RegExp('[A-Z]|   ', 'g')
  return Array.from(line.matchAll(stackRegex)).map((regexResult) => regexResult[0])
}

const containers = []
stacks.map(parseStackLine).forEach((line) => {
  line.forEach((val, index) => {
    if (val !== empty) {
      if (!containers[index]) containers[index] = []
      containers[index].push(val)
    }
  })
})

console.log({ containers })

const parseInstruction = (line) => {
  return line.split(' ').filter(Number).map(Number)
}

const moves = instructions.map(parseInstruction)

console.log({ moves })

// Cratemover 9000
// moves.forEach((move) => {
//   const [nrOfContainers, from, to] = move
//   console.log('Moving', nrOfContainers, 'from', from, 'to', to)
//   for (let i = 0; i < nrOfContainers; i++) {
//     const container = containers[from - 1].pop()
//     containers[to-1].push(container)
//   }
//   console.log(containers)
// })

// Cratemover 9001
moves.forEach((move) => {
  const [nrOfContainers, from, to] = move
  const movingContainers = containers[from - 1].splice(containers[from - 1].length - nrOfContainers)
  containers[to-1] = [...containers[to-1], ...movingContainers]
  console.log(containers)
})

console.log(containers.map((containerStack) => containerStack[containerStack.length - 1]).join(''))