const { sumSignalStrengthsAt } = require("./index")

const newLine = "\n"

describe('Given a set of instructions and decided cycles, the sum of the signal strength at all given cycles is returned', () => {
  test('Given one noop instruction, and cycle 1, the untouched x val 1 is returned', () => {
    const instructions = ['noop'].join(newLine)
    const cycles = [1]
    expect(sumSignalStrengthsAt({ instructions, cycles })).toEqual(1)
  })

  test('Given one noop and one addX 3 instructions, and cycle 1, the untouched x val 1 is returned', () => {
    const instructions = ['noop', 'addX 3'].join(newLine)
    const cycles = [1]
    expect(sumSignalStrengthsAt({ instructions, cycles })).toEqual(1)
  })

  test('Given one noop and one addX 3 instructions, and cycle 3, the x val 3 is returned', () => {
    const instructions = ['noop', 'addX 3'].join(newLine)
    const cycles = [3]
    expect(sumSignalStrengthsAt({ instructions, cycles })).toEqual(1)
  })
})