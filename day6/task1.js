
// const findMarker = (buffer, limit) => {
//   for(let i = limit; i < buffer.length; i++) {
//     const sequence = new Set(buffer.slice(i - limit, i))
//     if (sequence.size === limit) return i
//   }
//   console.error('No marker found for', buffer, 'using limit', limit)
// }

const findMarker = (buffer, limit, offset = 0) =>
  (new Set(buffer.slice(offset, offset + limit)).size === limit)
    ? offset + limit
    : findMarker(buffer, limit, offset + 1)




module.exports = {
  findMarker
}