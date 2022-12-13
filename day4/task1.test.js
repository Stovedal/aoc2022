const { pairOverlaps, countPairOverlaps } = require("./task1")

test('Given pair without overlap, when checking if there is an overlap, then false is returned', () => {
  expect(pairOverlaps('2-4,6-8')).toBeFalsy()
  expect(pairOverlaps('2-3,4-5')).toBeFalsy()
})

test('Given pair with partial or full overlap, when checking if there is an overlap, then true is returned', () => {
  expect(pairOverlaps('5-7,7-9')).toBeTruthy()
  expect(pairOverlaps('2-8,3-7')).toBeTruthy()
  expect(pairOverlaps('6-6,4-6')).toBeTruthy()
  expect(pairOverlaps('2-6,4-8')).toBeTruthy()
})

test('Given list of pairs containing overlaps, when counting overlaps, the number of overlaps is returned', () => {
  const input = `
    2-4,6-8
    2-3,4-5
    5-7,7-9
    2-8,3-7
    6-6,4-6
    2-6,4-8
  `
  expect(countPairOverlaps(input)).toBe(4)
})
