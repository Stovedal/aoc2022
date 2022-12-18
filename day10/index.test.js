const { sumSignalStrengthsAt, drawPixels } = require("./index")

const newLine = "\n"

describe('Given a set of instructions and decided cycles, the sum of the signal strength at all given cycles is returned', () => {
  test('Given one noop instruction, and cycle 1, the untouched x val 1 is returned', () => {
    const instructions = ['noop'].join(newLine)
    const cycles = [1]
    expect(sumSignalStrengthsAt({ instructions, cycles })).toEqual(1)
  })

  test('Given one noop and one addX 3 instructions, and cycle 1, the signal strength 1 is returned', () => {
    const instructions = ['noop', 'addx 3', 'noop'].join(newLine)
    const cycles = [1]
    expect(sumSignalStrengthsAt({ instructions, cycles })).toEqual(1)
  })

  test('Given one noop and one addX 3 instructions, and cycle 3, the signal strength 4 returned', () => {
    const instructions = ['noop', 'addx 3', 'noop'].join(newLine)
    const cycles = [4]
    expect(sumSignalStrengthsAt({ instructions, cycles })).toEqual(16)
  })

  test('Given one positive and one negative addx instructions negates', () => {
    const instructions = ['addx 3', 'addx -5', 'noop'].join(newLine)
    const cycles = [5]
    expect(sumSignalStrengthsAt({ instructions, cycles })).toEqual(-5)
  })

  test('Given first portion of test input, at cycle 20 420 is returned', () => {
    const instructions = [
      'addx 15',
      'addx -11',
      'addx 6',
      'addx -3',
      'addx 5',
      'addx -1',
      'addx -8',
      'addx 13',
      'addx 4',
      'noop',
      'addx -1'
    ].join(newLine)
    const cycles = [20]
    expect(sumSignalStrengthsAt({ instructions, cycles })).toEqual(420)
  })
})

describe('Using instructions pixels can be drawn', () => {
  test('Two add instructions draws pixles correctly', () => {
    const instructions = [
      'addx 15',
      'addx -11'
    ]
    expect(drawPixels({ instructions })).toEqual('##..')
  })

  test('Two add instructions draws pixles correctly', () => {
    const instructions = [
      'addx 15',
      'addx -11'
    ]
    expect(drawPixels({ instructions })).toEqual('##..')
  })
})