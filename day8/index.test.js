const { countVisibleTrees, findHighestScenicScore } = require("./index")

const newLine = "\n"

describe('Trees are visible if their neighours are shorter', () => {
  test('Of 3x3 trees of the same heiht, only 8 are visible', () => {
    const map = [
      '111',
      '111',
      '111'
    ].join(newLine)
    expect(countVisibleTrees(map)).toEqual(8)
  })
  test('Of 3x3 trees of the same height except from a taller middle tree, all 9 are visible', () => {
    const map = [
      '111',
      '121',
      '111'
    ].join(newLine)
    expect(countVisibleTrees(map)).toEqual(9)
  })

  test('Of 3x3 trees of the same height except from a taller middle tree, all 9 are visible', () => {
    const map = [
      '111',
      '222',
      '111'
    ].join(newLine)
    expect(countVisibleTrees(map)).toEqual(9)
  })

  test('Of all 3x3 trees surrounding the middle tree of the same height only 8 are visible', () => {
    const map = [
      '121',
      '222',
      '121'
    ].join(newLine)
    expect(countVisibleTrees(map)).toEqual(8)
  })

  test('If all surrounding trees of 2 horizontal middle trees are shorter, then all are visible', () => {
    const map = [
      '1111',
      '1221',
      '1111'
    ].join(newLine)
    expect(countVisibleTrees(map)).toEqual(12)
  })

  test('If all surrounding trees of 2 vertical middle trees are shorter, then all are visible', () => {
    const map = [
      '111',
      '121',
      '121',
      '111'
    ].join(newLine)
    expect(countVisibleTrees(map)).toEqual(12)
  })

  test('If all surrounding trees of 2x2 middle trees are shorter, then all are visible', () => {
    const map = [
      '1111',
      '1221',
      '12(2)1',
      '1111'
    ].join(newLine)
    expect(countVisibleTrees(map)).toEqual(16)
  })

  test('If all trees of 4x4 middle trees are equal hight, then all but the middle ones are visible', () => {
    const map = [
      '1111',
      '1111',
      '1111',
      '1111'
    ].join(newLine)
    expect(countVisibleTrees(map)).toEqual(12)
  })

  test('If all middle trees of 4x4 middle trees are shorter, then all but the middle ones are visible', () => {
    const map = [
      '2222',
      '2112',
      '2112',
      '2222'
    ].join(newLine)
    expect(countVisibleTrees(map)).toEqual(12)
  })

  test('If all surrounding edge trees of 5x5 trees are higher, then only those are visible', () => {
    const map = [
      '33333',
      '31113',
      '31213',
      '31113',
      '33333'
    ].join(newLine)
    expect(countVisibleTrees(map)).toEqual(16)
  })

  test('If all surrounding edge trees of 5x5 trees are higher, then only those are visible', () => {
    const map = [
      '12345',
      '12345',
      '12345',
      '12345',
      '12345'
    ].join(newLine)
    expect(countVisibleTrees(map)).toEqual(25)
  })
})

describe('The highest scenic score is found by counting the number of visible trees', () => {
  test('Of 3x3 trees of the same height, the highest scenic score is 1', () => {
    const map = [
      '111',
      '111',
      '111'
    ].join(newLine)
    expect(findHighestScenicScore(map)).toEqual(1)
  })

  test('Of 3x3 trees of the same height except from a shorter middle tree, the highest scenic score is 1', () => {
    const map = [
      '222',
      '212',
      '222'
    ].join(newLine)
    expect(findHighestScenicScore(map)).toEqual(1)
  })

  test('If all middle trees of 4x4 middle trees are shorter, the highest scenic score is 1', () => {
    const map = [
      '2222',
      '2112',
      '2112',
      '2222'
    ].join(newLine)
    expect(findHighestScenicScore(map)).toEqual(1)
  })

  test('In a mix of high and short trees, the highest scenic score is 8', () => {
    const map = [
      '30373',
      '25512',
      '65332',
      '33549',
      '35390'
    ].join(newLine)
    expect(findHighestScenicScore(map)).toEqual(8)
  })
})
