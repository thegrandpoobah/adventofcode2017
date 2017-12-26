const fs = require('fs')

const components = fs.readFileSync('day24input.txt', {encoding: 'utf8'}).split('\n')
components.pop() // remove the empty line at the end

const componentMap = components.reduce((a, c) => {
  const [l,r] = c.split('/')
  const part = {
    left: parseInt(l, 10),
    right: parseInt(r, 10)
  }

  if (!a[part.left]) {
    a[part.left] = []
  }
  a[part.left].push(part)

  if (!a[part.right]) {
    a[part.right] = []
  }
  a[part.right].push(part)

  return a
}, {})

potentials = []
function build(componentMap, needed, path) {
  potentials.push(path)

  const nextList = (componentMap[needed] || [])
  if (nextList.length === 0) {
    return
  }

  nextList.forEach((c) => {
    let use = true

    path.forEach((p) => {
      if (p === c) {
        use = false
      }
    })

    if (use) {
      const nPath = path.slice();
      nPath.push(c)
      let needMe
      if (needed === c.left) {
        needMe = c.right
      } else {
        needMe = c.left
      }
      build(componentMap, needMe, nPath)
    }
  })
}

build(componentMap, 0, [])

const scores = potentials.reduce((scores, path) => {
  scores[path.length] = Math.max(scores[path.length] || 0, path.reduce((a, p) => {
    a += p.left + p.right
    return a
  }, 0))
  return scores
}, {})

let longestBridge = 0
let highestScore = 0
for (let k in scores) {
  longestBridge = Math.max(longestBridge, parseInt(k, 10))
  highestScore = Math.max(highestScore, scores[k])
}

console.log('part 1', highestScore)
console.log('part 2', scores[longestBridge])
