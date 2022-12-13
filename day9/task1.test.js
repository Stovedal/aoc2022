const { countTailPositions } = require("./task1")

const newLine = "\n"

describe('Given a set of instructions, the nr of unique positions of tail during the movement is tracked an returned', () => {
  test('Given instruction go right once, the tail position count of 1 is returned', () => {
    const instructions = ['R 1'].join(newLine)
    expect(countTailPositions(instructions)).toEqual(1)
  })

  test('Given instruction go right twice, the tail position count of 2 is returned', () => {
    const instructions = ['R 2'].join(newLine)
    expect(countTailPositions(instructions)).toEqual(2)
  })

  test('Given instruction go right once, then up once, the tail position count of 1 is returned', () => {
    const instructions = ['R 1', 'U 1'].join(newLine)
    expect(countTailPositions(instructions)).toEqual(1)
  })

  test('Given instruction go right once, then up twice, the tail position count of 2 is returned', () => {
    const instructions = ['R 1', 'U 2'].join(newLine)
    expect(countTailPositions(instructions)).toEqual(2)
  })

  test('Given test instructions, the tail position count of 2 is returned', () => {
    const instructions = ['R 4', 'U 4', 'L 3', 'D 1', 'R 4', 'D 1', 'L 5', 'R 2'].join(newLine)
    expect(countTailPositions(instructions)).toEqual(13)
  })
})
