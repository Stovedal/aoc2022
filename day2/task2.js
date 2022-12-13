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

const shouldLoose = (move) => move === 1
const shouldDraw = (move) => move === 2
const shouldWin = (move) => move === 3

const getMoveScore = (move) => {
  if(isRock(move)) return 1
  if(isPaper(move)) return 2
  if(isScissor(move)) return 3
  console.error('INVALID MOVE', move)
}

const calculateWinScore = ({ myMove, opponentsMove }) => {
  if (myMove === 1 && opponentsMove === 3) return winScore
  if (myMove === 3 && opponentsMove === 1) return looseScore

  if (myMove > opponentsMove) return winScore
  if (myMove < opponentsMove) return looseScore

  if (myMove === opponentsMove) return drawScore

  console.error('INVALID WIN CONDITION FOR', { myMove, opponentsMove })
}

const calculateWinningMove = ({ opponentsMove }) => (opponentsMove === 3) ? 1 : opponentsMove + 1
const calculateLoosingMove = ({ opponentsMove }) => (opponentsMove === 1) ? 3 : opponentsMove - 1
const calculateDrawMove = ({ opponentsMove }) => opponentsMove

const calculateMyMove = ({ opponentsMove, myInstruction }) => {
  if(shouldLoose(myInstruction)) return calculateLoosingMove({ opponentsMove })
  if(shouldDraw(myInstruction)) return calculateDrawMove({ opponentsMove })
  if(shouldWin(myInstruction)) return calculateWinningMove({ opponentsMove })
}

const calculateRoundScore = (round) => {
  const [ opponentsMove, myInstruction ] = round.split(' ').map(getMoveScore)
  const myMove = calculateMyMove({ opponentsMove, myInstruction })
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
