const fs = require('fs')

const moves = fs.readFileSync('day16input.txt', {encoding: 'utf8'}).split(',')

let page1 = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p']
let page2 = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p']
let programs = page1
let inactive = page2
let positions = programs.reduce((a, v, i) => { a[v] = i; return a }, {})

function swap(e1, e2) {
  [positions[programs[e1]], positions[programs[e2]]] = [positions[programs[e2]], positions[programs[e1]]];
  [programs[e1], programs[e2]] = [programs[e2], programs[e1]]
}

function idxOf(p) {
  return positions[p]
}

const sCompiled = /s(\d*)/
const xCompiled = /x(\d*)\/(\d*)/
const pCompiled = /p(.)\/(.)/

const jumpTable = {
  s: (move) => {
    let number = parseInt(move.match(sCompiled)[1], 10)

    for (let i = 0; i < programs.length; i++) {
      inactive[(i + number) % programs.length] = programs[i]
      positions[programs[i]] = (i + number) % programs.length
    }
    [programs, inactive] = [inactive, programs]
  },
  x: (move) => {
    let [, a, b] = move.match(xCompiled)
    swap(parseInt(a, 10), parseInt(b, 10))
  },
  p: (move) => {
    let [, a, b] = move.match(pCompiled)
    swap(idxOf(a), idxOf(b))
  }
}

let seenList = []
let seen = {}

for (;;) {
  const sequence = programs.reduce((a, v) => { return a + v }, '')
  if (seen[sequence]) {
    break
  }
  seen[sequence] = true
  seenList.push(sequence)

  moves.forEach((move) => {
    jumpTable[move.charAt(0)](move)
  })
}

console.log('part 1', seenList[1])
console.log('part 2', seenList[1000000000 % i])
