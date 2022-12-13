const newLine = "\n"

const countVisibleTrees = (map) => {
  map = formatMap(map)
  let visibleTreeCount = 0

  const verticalLength = map.length
  const horizontalLength = map[0].length

  const visibleEdgeTreeCount = ((verticalLength * 2) + (horizontalLength * 2)) - 4

  iterateMap({
    map, onRead: ({ horizontalIndex, verticalIndex }) => {
      if (isTreeVisibleAt(map)({ horizontalIndex, verticalIndex })) {
        visibleTreeCount++
      }
    }
  })
  return visibleEdgeTreeCount + visibleTreeCount
}

const findHighestScenicScore = (map) => {
  map = formatMap(map)

  let highestScore = 0

  iterateMap({
    map, onRead: ({ horizontalIndex, verticalIndex }) => {
      const scenicScore = calculateScenicScore({ map, horizontalIndex, verticalIndex })
      if (scenicScore > highestScore) {
        highestScore = scenicScore
      }
    }
  })

  return highestScore
}

const countVisibleTreesInLine = (treeLine, outlookPoint) => {
  let visibleTrees = 0
  let blocked = false
  treeLine.forEach((tree) => {
    if (blocked) return

    if (tree < outlookPoint) {
      visibleTrees++
    }

    if (tree >= outlookPoint ) {
      visibleTrees++
      blocked = true
    }
  })
  return visibleTrees
}

const calculateScenicScore = ({ map, horizontalIndex, verticalIndex }) => {
  const { middleTree, leftTrees, rightTrees, topTrees, bottomTrees } = readMapFrom({ map, horizontalIndex, verticalIndex })
  const visibleLeftTrees = countVisibleTreesInLine(leftTrees.reverse(), middleTree)
  const visibleRightTrees = countVisibleTreesInLine(rightTrees, middleTree)
  const visibleTopTrees = countVisibleTreesInLine(topTrees.reverse(), middleTree)
  const visibleBottomTrees = countVisibleTreesInLine(bottomTrees, middleTree)
  return visibleLeftTrees * visibleRightTrees * visibleTopTrees * visibleBottomTrees
}

const splitAt = (arr, index) => [arr.slice(0, index), arr.slice(index + 1, arr.length)]
const tallestOf = (arr) => arr.reduce((curr, max) => curr > max ? curr : max, 0)

const readMapFrom = ({ map, horizontalIndex, verticalIndex }) => {
  const middleTree = map[verticalIndex][horizontalIndex]

  const horizontalTrees = map[verticalIndex]
  const verticalTrees = map.map((horizontalLine) => horizontalLine[horizontalIndex])

  const [leftTrees, rightTrees] = splitAt(horizontalTrees, horizontalIndex)
  const [topTrees, bottomTrees] = splitAt(verticalTrees, verticalIndex)

  return { middleTree, leftTrees, rightTrees, topTrees, bottomTrees }
}

const isTreeVisibleAt = (map) => ({ horizontalIndex, verticalIndex }) => {
  const { middleTree, leftTrees, rightTrees, topTrees, bottomTrees } = readMapFrom({ map, horizontalIndex, verticalIndex })
  const visible = !(
    tallestOf(leftTrees) >= middleTree
    && tallestOf(rightTrees) >= middleTree
    && tallestOf(topTrees) >= middleTree
    && tallestOf(bottomTrees) >= middleTree
  )
  return visible
}

const iterateMap = ({ map, onRead }) => {
  const verticalLength = map.length
  const horizontalLength = map[0].length

  for (let horizontalIndex = 1; horizontalIndex < (horizontalLength - 1); horizontalIndex++) {
    for (let verticalIndex = 1; verticalIndex < (verticalLength - 1); verticalIndex++) {
      onRead({ horizontalIndex, verticalIndex })
    }
  }
}

const formatMap = (map) => map
  .split(newLine)
  .map((line) => line.split('').map(Number))

module.exports = {
  compute: findHighestScenicScore,
  countVisibleTrees,
  findHighestScenicScore
}