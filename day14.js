var fs = require('fs')

function pad(str) {
  if (str.length === 4) {
    return str
  } else if (str.length === 3) {
    return '0' + str
  } else if (str.length === 2) {
    return '00' + str
  } else if (str.length === 1) {
    return '000' + str
  } else {
    return '0000'
  }
}

function knotHash(stringInput) {
  const LIST_SIZE = 256
  const ROUNDS = 64

  var input = []
  for (var i = 0; i < stringInput.length; i++) {
    input.push(stringInput.charCodeAt(i))
  }
  input.push(17)
  input.push(31)
  input.push(73)
  input.push(47)
  input.push(23)

  var list = []
  for (var i = 0; i < LIST_SIZE; i++) {
    list.push(i)
  }

  var currentPosition = 0
  var skipSize = 0

  function reverse(length) {
    var temp
    for (var i = 0; i < length / 2; i++) {
      temp = list[(currentPosition + i) % LIST_SIZE]
      list[(currentPosition + i) % LIST_SIZE] = list[(currentPosition + length - 1 - i) % LIST_SIZE]
      list[(currentPosition + length - 1 - i) % LIST_SIZE] = temp
    }
  }

  for (var i = 0; i < ROUNDS; i++) {
    input.forEach((length) => {
      reverse(length)
      currentPosition = (currentPosition + length + skipSize) % LIST_SIZE
      skipSize++
    })
  }

  var denseHash = ''
  for (var i = 0; i < 16; i++) {
    var accum = 0
    for (var j = 0; j < 16; j++) {
      accum = accum ^ list[16*i+j]
    }

    var q = accum.toString(16)
    if (q.length === 1) {
      denseHash += '0'
    }
    denseHash += q
  }

  return denseHash
}

var input = 'nbysizxe'

var grid = []
var used = 0

for (var i = 0; i < 128; i++) {
  grid.push([])
  var hash = knotHash(input + '-' + i)
  for (var j = 0; j < hash.length; j++) {
    binary = pad(parseInt(hash.charAt(j), 16).toString(2))
    for (var k = 0; k < binary.length; k++) {
      if (binary.charAt(k) === '1') {
        used++
      }

      grid[i][j * 4 + k] = binary.charAt(k)
    }
  }
}

var regions = 0

function contageon(grid, x, y) {
  var explore = [{x: x, y: y}]

  while (explore.length !== 0) {
    var p = explore.shift()
    if (p.x < 0 || p.x >= 128) continue
    if (p.y < 0 || p.y >= 128) continue

    if (grid[p.y][p.x] === '1') {
      grid[p.y][p.x] = '2'

      explore.push({x:p.x+1, y:p.y})
      explore.push({x:p.x-1, y:p.y})
      explore.push({x:p.x, y:p.y+1})
      explore.push({x:p.x, y:p.y-1})
    }
  }
}

// print the diagram for prettiness
// for (var y = 0; y < 128; y++) {
//   var str = ''
//   for (var x = 0; x < 128; x++) {
//     str += grid[y][x] === '0' ? '.' : '#'
//   }
//   console.log(str)
// }

for (var y = 0; y < 128; y++) {
  for (var x = 0; x < 128; x++) {
    if (grid[y][x] === '1') {
      regions++
      contageon(grid, x, y)
    }
  }
}

console.log('part 1', used)
console.log('part 2', regions)
