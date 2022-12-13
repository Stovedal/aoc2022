const fs = require('fs');
const { compute } = require('.');

const inputFile = process.argv[2]

console.log('Reading', inputFile)

const data = fs.readFileSync(inputFile,  "utf-8");

console.log(compute(data))
