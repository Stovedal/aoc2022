const { countTailPositions } = require("./index")

const newLine = "\n"

describe('Given a set of instructions, the nr of unique positions of tail during the movement is tracked an returned', () => {

  test('Given the instruction R 5, the first five parts move right', () => {
    const instructions = ['R 5'].join(newLine)
    const { rope } = countTailPositions(instructions)
    expect(rope).toEqual([
      { x: 5, y: 0 },
      { x: 4, y: 0 },
      { x: 3, y: 0 },
      { x: 2, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 }
    ])
  })

  test('Given the instruction R 5, the tail count is 1', () => {
    const instructions = ['R 5'].join(newLine)
    const { count } = countTailPositions(instructions)
    expect(count).toEqual(1)
  })

  test('Given the instruction R 5, U8, the rope moves right then up', () => {
    const instructions = ['R 5', 'U 8'].join(newLine)
    const { rope } = countTailPositions(instructions)
    expect(rope).toEqual([
      { x: 5, y: 8 },
      { x: 5, y: 7 },
      { x: 5, y: 6 },
      { x: 5, y: 5 },
      { x: 5, y: 4 },
      { x: 4, y: 4 },
      { x: 3, y: 3 },
      { x: 2, y: 2 },
      { x: 1, y: 1 },
      { x: 0, y: 0 }
    ])
  })

  test('Given the instruction R 5, U8, the tail count is 1', () => {
    const instructions = ['R 5', 'U 8'].join(newLine)
    const { count } = countTailPositions(instructions)
    expect(count).toEqual(1)
  })

  test('Given the instruction R 5, U 8, L 8, the rope moves right then up', () => {
    const instructions = ['R 5', 'U 8', 'L 8'].join(newLine)
    const { rope } = countTailPositions(instructions)
    expect(rope).toEqual([
      { x: -3, y: 8 }, // Head
      { x: -2, y: 8 }, // 1
      { x: -1, y: 8 }, // 2
      { x: 0, y: 8 }, // 3
      { x: 1, y: 8 }, // 4
      { x: 1, y: 7 }, // 5
      { x: 1, y: 6 }, // 6
      { x: 1, y: 5 }, // 7
      { x: 1, y: 4 }, // 8
      { x: 1, y: 3 } // 9
    ])
  })

  test('Given the instruction R 5, U 8, L 8, the tail count is', () => {
    const instructions = ['R 5', 'U 8', 'L 8'].join(newLine)
    const { count } = countTailPositions(instructions)
    expect(count).toEqual(4)
  })
})