const fs = require('fs');
const { findMarker, traverseFileStructure, findSumOfSizes, identifyDirectoryToDelete } = require('./task1');
const newLine =  "\n"

const inputFile = process.argv[2]

console.log('Reading', inputFile)

const data = fs.readFileSync(inputFile,  "utf-8");

console.log(findSumOfSizes(data))
console.log(identifyDirectoryToDelete(data))