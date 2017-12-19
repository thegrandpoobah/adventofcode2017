const fs = require('fs')

const network = fs.readFileSync('day19input.txt', {encoding: 'utf8'}).split('\n')
network.pop() // remove the empty line at the end

let path = []
let count = 0
let x=0,y=0
let dx=0,dy=1

for (var i = 0; i < network[0].length; i++) {
  if (network[0].charAt(i) === '|') {
    x = i
    break
  }
}

target:
for (;;) {
  count++
  x+=dx
  y+=dy

  switch (network[y].charAt(x)) {
    case '|':
    case '-':
      // no need to do anything here, just keep going
      break
    case '+':
      if (Math.abs(dx) === 1) {
        const down = (network[y + 1] || '').charAt(x)
        const up = (network[y - 1] || '').charAt(x)

        dx = 0
        dy = 0

        if (down === '|' || down === '+') {
          dy = 1
        } else if (up === '|' || up === '+') {
          dy = -1
        }
      } else if (Math.abs(dy) === 1) {
        const left = (network[y] || '').charAt(x - 1)
        const right = (network[y] || '').charAt(x + 1)

        dx = 0
        dy = 0

        if (left === '-' || left === '+') {
          dx = -1
        } else if (right === '-' || right === '+') {
          dx = 1
        }
      }

      if (dx===0 && dy===0) {
        break target
      }
      break
    case ' ':
      break target
    default:
      path.push(network[y].charAt(x))
      break
  }
}

console.log('part 1', path.reduce((a, v) => { return a + v }, ''))
console.log('part 2', count)
