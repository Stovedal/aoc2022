const { findMarker } = require("./task1")

test('Given limit of 4, marker with 4 distinct characters is found', () => {
  expect(findMarker('bvwbjplbgvbhsrlpgdmjqwftvncz', 4)).toBe(5)
  expect(findMarker('nppdvjthqldpwncqszvftbrmjlhg', 4)).toBe(6)
  expect(findMarker('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 4)).toBe(10)
  expect(findMarker('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 4)).toBe(11)
})

test('Given limit of 14, marker with 14 distinct characters is found', () => {
  expect(findMarker('mjqjpqmgbljsphdztnvjfqwrcgsmlb', 14)).toBe(19)
  expect(findMarker('bvwbjplbgvbhsrlpgdmjqwftvncz', 14)).toBe(23)
  expect(findMarker('nppdvjthqldpwncqszvftbrmjlhg', 14)).toBe(23)
  expect(findMarker('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 14)).toBe(29)
  expect(findMarker('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 14)).toBe(26)
})