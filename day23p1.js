const fs = require('fs')

const instructions = fs.readFileSync('day23input.txt', {encoding: 'utf8'}).split('\n')
instructions.pop() // remove the empty line at the end

function vorr(registers, value) {
  const v = parseInt(value, 10)
  if (isNaN(v)) {
    return registers[value] || 0
  } else {
    return v
  }
}

const jumpTable = {
  set: (state, register, value) => {
    state.registers[register] = vorr(state.registers, value)
    state.programCounter++
  },
  sub: (state, register, value) => {
    state.registers[register] -= vorr(state.registers, value)
    state.programCounter++
  },
  mul: (state, register, value) => {
    state.registers[register] *= vorr(state.registers, value)
    state.programCounter++
    state.muls++
  },
  jnz: (state, register, offset) => {
    if (vorr(state.registers, register) !== 0) {
      state.programCounter += vorr(state.registers, offset)
    } else {
      state.programCounter++
    }

    if (state.programCounter < 0 || state.programCounter >= instructions.length) {
      state.finished = true
    }
  }
}

let states = [{
  programCounter: 0,
  registers: {a:1},
  finished: false,
  muls: 0
}]

for (;;) {
  if (states[0].finished) {
    break
  }

  states.forEach((state) => {
    if (state.finished) {
      return
    }

    const [instruction, ...args] = instructions[state.programCounter].split(' ')
    jumpTable[instruction](state, ...args)
  })
}

console.log(states[0].registers.h)
