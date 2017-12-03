// R,U,L,L,D,D,R,R,R,U,U,U,L,L,L,L,D,D,D,D
// var input = 1024

var input = 325489
var direction = 'N'
var repeat = 0
var times = 1
var coordX = 0
var coordY = 0
var deltaX = 0
var deltaY = 0
var memo = {'0:0': 1}
var num

function stencil(coordX, coordY) {
  return  (memo[(coordX - 1) + ':' + (coordY - 1)] || 0) +
          (memo[(coordX    ) + ':' + (coordY - 1)] || 0) +
          (memo[(coordX + 1) + ':' + (coordY - 1)] || 0) +
          (memo[(coordX - 1) + ':' + (coordY    )] || 0) +
          (memo[(coordX    ) + ':' + (coordY    )] || 0) +
          (memo[(coordX + 1) + ':' + (coordY    )] || 0) +
          (memo[(coordX - 1) + ':' + (coordY + 1)] || 0) +
          (memo[(coordX    ) + ':' + (coordY + 1)] || 0) +
          (memo[(coordX + 1) + ':' + (coordY + 1)] || 0)
}

for (var i = 0; i < input; i++) {
  coordX += deltaX
  coordY += deltaY

  memo[coordX + ':' + coordY] = num = stencil(coordX, coordY)
  if (num > input) {
    break
  }

  repeat++
  if (repeat !== times) {
    continue
  }

  if (direction === 'N') {
    direction = 'R'

    deltaX = 1
    deltaY = 0
  } else if  (direction === 'R') {
    direction = 'U'

    deltaX = 0
    deltaY = 1
  } else if (direction === 'U') {
    direction = 'L'
    times++

    deltaX = -1
    deltaY = 0
  } else if (direction === 'L') {
    direction = 'D'

    deltaX = 0
    deltaY = -1
  } else if (direction === 'D') {
    times++
    direction = 'R'

    deltaX = 1
    deltaY = 0
  }

  repeat = 0
}

console.log(num)
