const fs = require('fs');
const { countPairOverlaps } = require('./task1');

const newLine =  "\n"
const inputFile = process.argv[2]

console.log('Reading', inputFile)
const data = fs.readFileSync(inputFile,  "utf-8");
console.log('read', data)
console.log(countPairOverlaps(data))