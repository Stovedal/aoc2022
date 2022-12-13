const fs = require('fs');
const { findMarker } = require('./task1');

const inputFile = process.argv[2]
const limit = Number(process.argv[3])

console.log('Reading', inputFile)

const data = fs.readFileSync(inputFile,  "utf-8");

console.log(findMarker(data, limit))