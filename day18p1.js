const fs = require('fs')

const instructions = fs.readFileSync('day18input.txt', {encoding: 'utf8'}).split('\n')
instructions.pop() // remove the empty line at the end

let programCounter = 0
let registers = {}
let lastFreq, lastRecovery

const jumpTable = {
  set: (register, value) => {
    if (isNaN(parseInt(value, 10))) {
      registers[register] = registers[value]
    } else {
      registers[register] = parseInt(value, 10)
    }
  },
  add: (register, value) => {
    if (isNaN(parseInt(value, 10))) {
      registers[register] += registers[value]
    } else {
      registers[register] += parseInt(value, 10)
    }
  },
  mul: (register, value) => {
    if (isNaN(parseInt(value, 10))) {
      registers[register] *= registers[value]
    } else {
      registers[register] *= parseInt(value, 10)
    }
  },
  mod: (register, value) => {
    if (isNaN(parseInt(value, 10))) {
      registers[register] %= registers[value]
    } else {
      registers[register] %= parseInt(value, 10)
    }
  },
  snd: (register) => {
    lastFreq = registers[register]
  },
  rcv: (register) => {
    if (registers[register] !== 0) {
      lastRecovery = lastFreq
      return -1
    }
  },
  jgz: (register, offset) => {
    if (registers[register] > 0) {
      programCounter += offset - 1
    }
  }
}

while (programCounter >= 0 && programCounter < instructions.length) {
  const [instruction, ...args] = instructions[programCounter].split(' ')
  programCounter++
  if (jumpTable[instruction](...args) === -1) {
    break
  }
}

console.log(lastRecovery)
