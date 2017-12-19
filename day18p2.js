const fs = require('fs')

const instructions = fs.readFileSync('day18input.txt', {encoding: 'utf8'}).split('\n')
instructions.pop() // remove the empty line at the end

function vorr(registers, value) {
  const v = parseInt(value, 10)
  if (isNaN(v)) {
    return registers[value]
  } else {
    return v
  }
}

const jumpTable = {
  set: (state, register, value) => {
    state.registers[register] = vorr(state.registers, value)
    state.programCounter++
  },
  add: (state, register, value) => {
    state.registers[register] += vorr(state.registers, value)
    state.programCounter++
  },
  mul: (state, register, value) => {
    state.registers[register] *= vorr(state.registers, value)
    state.programCounter++
  },
  mod: (state, register, value) => {
    state.registers[register] %= vorr(state.registers, value)
    state.programCounter++
  },
  snd: (state, register) => {
    state.sendQueue.push(vorr(state.registers, register))
    state.programCounter++
    state.sent++
  },
  rcv: (state, register) => {
    if (state.recvQueue.length === 0) {
      state.waiting = true
      return
    }

    state.waiting = false
    state.registers[register] = state.recvQueue.shift()
    state.programCounter++
  },
  jgz: (state, register, offset) => {
    if (vorr(state.registers, register) > 0) {
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
  id: 0,
  programCounter: 0,
  registers: {p:0},
  recvQueue: [],
  waiting: false,
  finished: false,
  sent: 0
}, {
  id: 1,
  programCounter: 0,
  registers: {p:1},
  recvQueue: [],
  waiting: false,
  finished: false,
  sent: 0
}]
states[0].sendQueue = states[1].recvQueue
states[1].sendQueue = states[0].recvQueue

for (;;) {
  if (states[0].waiting && states[1].waiting) {
    break
  }
  if (states[0].finished && states[1].finished) {
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

console.log(states[1].sent)
