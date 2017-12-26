const input = require('./day25input.json')

const tape = {
  '0': 0
}
let position = 0
let state = input.states[input.initialState]

for (let i = 0; i < input.checksum; i++) {
  const transition = state[tape[position] || 0]
  tape[position] = transition.write
  position += transition.move
  state = input.states[transition.next]
}

let q = 0
for (let k in tape) {
  if (tape[k] === 1) {
    q++
  }
}

console.log(q)
