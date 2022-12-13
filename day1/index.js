const fs = require('fs')

const newLine =  "\n"

let data = fs.readFileSync("./input.txt",  "utf-8");

data = data.split(newLine+newLine)

data = data.map(elfCarryList => Number(elfCarryList.split(newLine).reduce((accCalories, calories) => Number(accCalories) + Number(calories))))

const biggestLoad = data.reduce((max, curr) => max < curr ? curr : max)

console.log(biggestLoad)