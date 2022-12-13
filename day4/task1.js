
const isBetween = (num, [leftLim, rightLim]) => num >= leftLim && num <= rightLim

const range = (rangeLims, out) => {
  if (!out) out = []
  if(rangeLims[0] === rangeLims[1]) {
    return [...out, rangeLims[0]]
  } else {
    return range([rangeLims[0] + 1,rangeLims[1]], [...out, rangeLims[0]])
  }
}

const costlyPairOverlaps = (pair) => {
  const ranges = pair.split(',').map((range) => range.split('-').map(Number))
  const rangeA = range(ranges[0])
  const rangeB = new Set(range(ranges[1]))
  const overlap = rangeA.find((item) => rangeB.has(item))
  return Boolean(overlap)
}

const pairOverlaps = (pair) => {
  const ranges = pair.split(',').map((range) => range.split('-'))
  if (
    isBetween(ranges[0][0], ranges[1])
    || isBetween(ranges[0][1], ranges[1])
    || isBetween(ranges[1][0], ranges[0])
    || isBetween(ranges[1][1], ranges[0])
    ) {
    return true
  }
  return false
}

const newLine =  "\n"

const countPairOverlaps = (list) => {
  const pairs = list.split(' ').join('').split(newLine).filter(Boolean)
  return pairs.filter((pair) => {
    console.log(pair, pairOverlaps(pair))
    return costlyPairOverlaps(pair)
  }).length
}

module.exports = {
  pairOverlaps,
  countPairOverlaps
}