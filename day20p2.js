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
    },
    finished: false
  }
})

for (let i = 0; i < 100000; i++) {
  const space = {}

  particles.forEach((p, idx) => {
    if (p.finished) {
      return
    }

    p.v.x += p.a.x
    p.v.y += p.a.y
    p.v.z += p.a.z

    p.p.x += p.v.x
    p.p.y += p.v.y
    p.p.z += p.v.z

    if (space[`${p.p.x}:${p.p.y}:${p.p.z}`]) {
      space[`${p.p.x}:${p.p.y}:${p.p.z}`].finished = true
      p.finished = true
    }
    space[`${p.p.x}:${p.p.y}:${p.p.z}`] = p
  })
}

const remaining = particles.reduce((a, v) => {
  if (!v.finished) {
    a++
  }
  return a
}, 0)

console.log(remaining)
