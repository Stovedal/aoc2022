const newLine = "\n"

const emptyEvent = () => ({ action: (state) => state })
const addEvent = (valueToAdd) => ({ action: (state) => state + valueToAdd })

const executeEvent = (event, x) => {
  const { action } = event
  return action(x)
}

const sumRecorderSignalStrengths = (signals) => {
  return Object.entries(signals).map(([key, value]) => Number(key) * Number(value)).reduce((acc, curr) => acc + curr, 0)
}

const generateEvents = (instruction, queue) => {
  if (instruction.startsWith('noop')) {
    return [ emptyEvent() ]
  } else if (instruction.startsWith('addx ')) {
    const valueToAdd = Number(instruction.replace('addx ', ''))
    return [ emptyEvent(), addEvent(valueToAdd) ]
  }
}


const sumSignalStrengthsAt = ({ instructions, cycles }) => {
  instructions = instructions.split(newLine)
  let cycle = 0
  let x = 1
  let signals = {}

  const eventQueue = instructions.reduce((events, instruction) => [ ...events, ...generateEvents(instruction) ], []);

  do {
    cycle++
    if (cycles.includes(cycle)) {
      signals[cycle] = x
    }

    x = executeEvent(eventQueue.shift(), x)

  } while (eventQueue.length)

  return sumRecorderSignalStrengths(signals)
}

const drawPixel = ({ line, x }) => ([line.length - 1, line.length, line.length + 1].includes(x)) ? '#' : '.'

const drawPixels = ({ instructions }) => {
  const eventQueue = instructions.split(newLine).reduce((events, instruction) => [ ...events, ...generateEvents(instruction) ], []);

  let cycle = 0
  let x = 1
  let drawing = ''
  let line = ''

  do {
    cycle++

    line += drawPixel({ line, x })

    if (line.length === 40) {
      drawing = drawing + newLine + line
      line = ''
    }

    x = executeEvent(eventQueue.shift(), x)

  } while (eventQueue.length)

  return drawing
}


module.exports = {
  compute: drawPixels,
  sumSignalStrengthsAt,
  drawPixels
}
