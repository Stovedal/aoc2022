const fs = require('fs');
const { compute } = require('.');

const inputFile = process.argv[2]

console.log('Reading', inputFile)
const data = fs.readFileSync(inputFile,  "utf-8");

const cycles = [20, 60, 100, 140, 180, 220]
console.log(compute({ instructions: data, cycles }))
