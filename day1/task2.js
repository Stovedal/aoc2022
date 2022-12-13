const fs = require('fs')

const newLine =  "\n"

let data = fs.readFileSync("./input.txt",  "utf-8");

data = data.split(newLine+newLine)

data = data.map(elfCarryList => Number(elfCarryList.split(newLine).reduce((accCalories, calories) => Number(accCalories) + Number(calories))))

const biggestLoad = data.sort()
const length = biggestLoad.length
biggestLoad.map(load => console.log(load))
// console.log('hej', biggestLoad[length - 1] + biggestLoad[length - 2] + biggestLoad[length - 3])
