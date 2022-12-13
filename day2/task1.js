const fs = require('fs')

const newLine =  "\n"

let data = fs.readFileSync("./input.txt",  "utf-8");

rounds = data.split(newLine)

const winScore = 6
const drawScore = 3
const looseScore = 0

const isRock = (move) => ['A', 'X'].includes(move)
const isPaper = (move) => ['B', 'Y'].includes(move)
const isScissor = (move) => ['C', 'Z'].includes(move)

const getMoveScore = (move) => {
  if(isRock(move)) return 1
  if(isPaper(move)) return 2
  if(isScissor(move)) return 3
  console.error('INVALID MOVE', move)
}

const calculateWinScore = ({ myMove, opponentsMove }) => {
  if (myMove === 3 && opponentsMove === 1) return looseScore
  if (myMove === 1 && opponentsMove === 3) return winScore

  if (myMove > opponentsMove) return winScore
  if (myMove < opponentsMove) return looseScore

  if (myMove === opponentsMove) return drawScore

  console.error('INVALID WIN CONDITION FOR', { myMove, opponentsMove })
}

const calculateRoundScore = (round) => {
  const [ opponentsMove, myMove ] = round.split(' ').map(getMoveScore)
  const winScore = calculateWinScore({ myMove, opponentsMove })
  return myMove + winScore
}

let totalScore = 0

rounds.forEach(round => {
  const roundScore = calculateRoundScore(round)
  console.log('Round score:', roundScore)
  totalScore += roundScore
});

console.log('Total score:', totalScore)
