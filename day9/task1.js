const newLine = "\n"

const hashPosition = ({ x, y }) => `${x}, ${y}`

const movePosition = ({ direction, position }) => {
  switch (direction) {
    case 'R':
      return { ...position, x: position.x + 1}
    case 'L':
      return { ...position, x: position.x - 1}
    case 'U':
      return { ...position, y: position.y + 1}
    case 'D':
      return { ...position, y: position.y - 1}
    default:
      console.error('ERROR: invalid direction', direction)
  }
}

const difference = (headPosition, tailPosition) => {
  const xDiff = headPosition.x - tailPosition.x
  const yDiff = headPosition.y - tailPosition.y
  return { xDiff, yDiff }
}

const touching = ({ xDiff, yDiff }) => {
  return Math.abs(xDiff) < 2 && Math.abs(yDiff) < 2
}

const aligned = ({ xDiff, yDiff }) => {
  return xDiff === 0 || yDiff === 0 
}

const alignTailPosition = ({ headPosition, tailPosition, direction }) => {
  if (['U', 'D'].includes(direction)) return { ...tailPosition, x: headPosition.x }
  if (['R', 'L'].includes(direction)) return { ...tailPosition, y: headPosition.y }
  console.error('ERROR: invalid direction', direction)
}

const moveTail = ({ headPosition, tailPosition, direction }) => {
  let diff = difference(headPosition, tailPosition)

  if (touching(diff)) return tailPosition

  if (!aligned(diff)) {
    tailPosition = alignTailPosition({ tailPosition, headPosition, direction })
  }

  return movePosition({ direction, position: tailPosition })
}

const countTailPositions = (instructions) => {
  instructions = instructions.split(newLine).map(instruction => instruction.split(' ').map((v) => Number(v) ? Number(v) : v))
  const uniqueTailPositions = new Set([])

  let tailPosition = { x: 0, y: 0 }
  let headPosition = { x: 0, y: 0}

  instructions.map((instruction) => {
    const [ direction, moves ] = instruction
    for (let movesLeft = moves; movesLeft > 0; movesLeft--) {
      headPosition = movePosition({ direction, position: headPosition })
      tailPosition = moveTail({ headPosition, tailPosition, direction })  
      uniqueTailPositions.add(hashPosition(tailPosition))
    }
  })

  return uniqueTailPositions.size
}

module.exports = {
  compute: countTailPositions,
  countTailPositions
}