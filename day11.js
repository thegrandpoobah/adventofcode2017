var fs = require('fs')

var path = fs.readFileSync('day11input.txt', {encoding: 'utf8'}).split(',')

var positionX = 0
var positionY = 0
var farthest = 0

for (var i = 0; i < path.length; i++) {
  if (!path[i]) {
    continue
  }

  switch (path[i]) {
    case 'n':
      positionY-=2
      break
    case 's':
      positionY+=2
      break
    case 'ne':
      positionX++
      positionY--
      break
    case 'se':
      positionX++
      positionY++
      break
    case 'sw':
      positionX--
      positionY++
      break
    case 'nw':
      positionX--
      positionY--
      break
  }

  var distance = Math.abs(positionX) + (Math.abs(positionY) - Math.abs(positionX)) / 2
  if (distance > farthest) {
    farthest = distance
  }
}

console.log('part 1', Math.abs(positionX) + (Math.abs(positionY) - Math.abs(positionX)) / 2)
console.log('part 2', farthest)


