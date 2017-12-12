var fs = require('fs')

var instructions = fs.readFileSync('day8input.txt', {encoding: 'utf8'}).split('\n')

var operators = {
  '>': (register, value) => { return register > value },
  '<': (register, value) => { return register < value },
  '>=': (register, value) => { return register >= value },
  '==': (register, value) => { return register == value },
  '<=': (register, value) => { return register <= value },
  '!=': (register, value) => { return register != value }
}

var allRegisters = {}
var commands = []
for (var i = 0; i < instructions.length; i++) {
  if (instructions[i] === '') {
    continue;
  }

  var parts;
  parts = instructions[i].match(/(\S*) (\S*) (-?\d*) if (\S*) (.*) (-?\d*)/)

  allRegisters[parts[1]] = 0

  commands.push({
    register: parts[1],
    action: parts[2],
    value: parseInt(parts[3], 10),
    conditionRegister: parts[4],
    operation: parts[5],
    conditionNumber: parseInt(parts[6], 10)
  })
}

var max = 0
for (var i = 0; i < commands.length; i++) {
  if (operators[commands[i].operation](allRegisters[commands[i].conditionRegister], commands[i].conditionNumber)) {
    if (commands[i].action === 'inc') {
      allRegisters[commands[i].register]+=commands[i].value
    } else {
      allRegisters[commands[i].register]-=commands[i].value
    }
  }

  if (allRegisters[commands[i].register] > max) {
    max = allRegisters[commands[i].register]
  }
}
console.log('part 2', max)

max = 0
for (var key in allRegisters) {
  if (allRegisters[key] > max) {
    max = allRegisters[key]
  }
}
console.log('part 1', max)
