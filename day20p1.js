const fs = require('fs')

const input = fs.readFileSync('day20input.txt', {encoding: 'utf8'}).split('\n')
input.pop() // remove the empty line at the end

const particles = input.map((l) => {
  const [, px, py, pz, vx, vy, vz, ax, ay, az] = l.match(/p\=\<(\-?\d*),(\-?\d*),(\-?\d*)\>, v\=\<(\-?\d*),(\-?\d*),(\-?\d*)\>, a\=\<(\-?\d*),(\-?\d*),(\-?\d*)\>/).map((x) => {
    return parseInt(x, 10)
  })

  return {
    p: {
      x: px,
      y: py,
      z: pz
    },
    v: {
      x: vx,
      y: vy,
      z: vz
    },
    a: {
      x: ax,
      y: ay,
      z: az
    }
  }
})

let slowest = Number.MAX_VALUE
let slowestIdx = 0

particles.forEach((p, idx) => {
  const distance = Math.sqrt(p.a.x*p.a.x + p.a.y*p.a.y + p.a.z*p.a.z)
  if (distance < slowest) {
    slowest = distance
    slowestIdx = idx
  }
})

console.log('part 1', slowestIdx)
