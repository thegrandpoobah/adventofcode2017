const fs = require('fs')

const input = fs.readFileSync('day21input.txt', {encoding: 'utf8'}).split('\n')
input.pop() // remove the empty line at the end

function flipX2(v) {
  // 0,1 => 1,0
  // 2,3    3,2
  return `${v[1]}${v[0]}${v[3]}${v[2]}`
}

function flipY2(v) {
  // 0,1 => 2,3
  // 2,3    0,1
  return `${v[2]}${v[3]}${v[0]}${v[1]}`
}

// 90 degs only, call multiple times for others
function rotate2(v) {
  // 0,1 => 2,0
  // 2,3    3,1
  return `${v[2]}${v[0]}${v[3]}${v[1]}`
}

function flipX3(v) {
  // 0,1,2  => 2,1,0
  // 3,4,5     5,4,3
  // 6,7,8     8,7,6
  return `${v[2]}${v[1]}${v[0]}${v[5]}${v[4]}${v[3]}${v[8]}${v[7]}${v[6]}`
}

function flipY3(v) {
  // 0,1,2  => 6,7,8
  // 3,4,5     3,4,5
  // 6,7,8     0,1,2
  return `${v[6]}${v[7]}${v[8]}${v[3]}${v[4]}${v[5]}${v[0]}${v[1]}${v[2]}`
}

// 90 degs only, call multiple times for others
function rotate3(v) {
  // 0,1,2  => 6,3,0
  // 3,4,5     7,4,1
  // 6,7,8     8,5,2
  return `${v[6]}${v[3]}${v[0]}${v[7]}${v[4]}${v[1]}${v[8]}${v[5]}${v[2]}`
}

const enhancements = input.reduce((a, l) => {
  let parsed

  parsed = l.match(/(.*)\/(.*)\/(.*) \=\> (.*)\/(.*)\/(.*)\/(.*)/)
  if (parsed) {
    let ident = `${parsed[1][0]}${parsed[1][1]}${parsed[1][2]}${parsed[2][0]}${parsed[2][1]}${parsed[2][2]}${parsed[3][0]}${parsed[3][1]}${parsed[3][2]}`

    for (let i = 0; i < 5; i++) {
      a[ident] = `${parsed[4]}${parsed[5]}${parsed[6]}${parsed[7]}`
      a[flipX3(ident)] = `${parsed[4]}${parsed[5]}${parsed[6]}${parsed[7]}`
      a[flipY3(ident)] = `${parsed[4]}${parsed[5]}${parsed[6]}${parsed[7]}`

      ident = rotate3(ident)
    }

    return a
  }

  parsed = l.match(/(.*)\/(.*) \=\> (.*)\/(.*)\/(.*)/)
  if (parsed) {
    let ident = `${parsed[1][0]}${parsed[1][1]}${parsed[2][0]}${parsed[2][1]}`

    for (let i = 0; i < 5; i++) {
      a[ident] = `${parsed[3]}${parsed[4]}${parsed[5]}`
      a[flipX2(ident)] = `${parsed[3]}${parsed[4]}${parsed[5]}`
      a[flipY2(ident)] = `${parsed[3]}${parsed[4]}${parsed[5]}`

      ident = rotate2(ident)
    }

    return a
  }
}, {})

let image = '.#...####'
let size = 3

for (let i = 0; i < 5; i++) {
  let image2 = []
  let cellSize
  let size2

  if (size % 2 === 0) {
    cellSize = 2
    size2 = size * 1.5
  } else if (size % 3 === 0) {
    cellSize = 3
    size2 = Math.ceil(size * 4/3)
  }

  for (let cellX = 0; cellX < size / cellSize; cellX++) {
    for (let cellY = 0; cellY < size / cellSize; cellY++) {
      let cell = ''
      for (let y = 0; y < cellSize; y++) {
        for (let x = 0; x < cellSize; x++) {
          cell += image[((cellY * cellSize) + y) * size + (cellX * cellSize) + x]
        }
      }

      let tile = enhancements[cell]

      for (let y = 0; y < (cellSize + 1); y++) {
        for (let x = 0; x < (cellSize + 1); x++) {
          image2[((cellY * (cellSize + 1)) + y) * size2 + (cellX * (cellSize + 1)) + x] = tile[y * (cellSize + 1) + x]
        }
      }
    }
  }

  size = size2
  image = image2.reduce((a,v) => { return a + v }, '')
}

let count = 0
for (let i = 0; i < image.length; i++) {
  if (image[i] === '#') {
    count++
  }
}

console.log('part 1', count)

