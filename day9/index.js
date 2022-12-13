const newLine = "\n"

const hashPosition = ({ x, y }) => `${x},${y}`

const movePosition = ({ direction, position }) => {
  switch (direction) {
    case 'R':
      return { ...position, x: position.x + 1 }
    case 'L':
      return { ...position, x: position.x - 1 }
    case 'U':
      return { ...position, y: position.y + 1 }
    case 'D':
      return { ...position, y: position.y - 1 }
    default:
      console.error('ERROR: invalid direction', direction)
  }
}

const differenceBetween = (headPosition, tailPosition) => {
  const xDiff = headPosition.x - tailPosition.x
  const yDiff = headPosition.y - tailPosition.y
  return { xDiff, yDiff }
}

const isTouching = ({ xDiff, yDiff }) => Math.abs(xDiff) < 2 && Math.abs(yDiff) < 2

const isAligned = ({ xDiff, yDiff }) => xDiff === 0 || yDiff === 0

const stepOf = (num) => num/Math.abs(num)

const moveStraightLy = ({ difference, tailPosition }) => {
  const { xDiff, yDiff } = difference
  if (Math.abs(yDiff) > 1) return { ...tailPosition, y: tailPosition.y + stepOf(yDiff) }
  if (Math.abs(xDiff) > 1) return { ...tailPosition, x: tailPosition.x + stepOf(xDiff) }
  console.error('ERROR: could not move straightly')
}

const moveDiagonally = ({ difference, tailPosition }) => {
  const { xDiff, yDiff } = difference
  return { y: tailPosition.y + stepOf(yDiff), x: tailPosition.x + stepOf(xDiff) }
}

const moveTail = ({ headPosition, tailPosition }) => {
  const difference = differenceBetween(headPosition, tailPosition)
  if (isTouching(difference)) return tailPosition
  if (isAligned(difference)) return moveStraightLy({ difference, tailPosition })
  return moveDiagonally({ difference, tailPosition })
}

const buildRope = (length) => {
  if (length === 1) return [{ x: 0, y: 0 }]
  return [{ x: 0, y: 0 }, ...buildRope(length - 1)]
}

const formatInstructions = instructions => instructions.split(newLine).map(instruction => instruction.split(' ').map((v) => Number(v) ? Number(v) : v))

const countTailPositions = (instructions) => {
  instructions = formatInstructions(instructions)

  const uniqueTailPositions = new Set([])
  const rope = buildRope(10)

  instructions.map((instruction) => {
    const [direction, moves] = instruction
    for (let movesLeft = moves; movesLeft > 0; movesLeft--) {
      rope[0] = movePosition({ direction, position: rope[0] })
      for (let partIndex = 1; partIndex < rope.length; partIndex++) {
        rope[partIndex] = moveTail({ headPosition: rope[partIndex - 1], tailPosition: rope[partIndex], direction })
      }
      uniqueTailPositions.add(hashPosition(rope[rope.length - 1]))
    }
  })

  return { rope, count: uniqueTailPositions.size }
}

module.exports = {
  compute: countTailPositions,
  countTailPositions
}
