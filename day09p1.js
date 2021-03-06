var fs = require('fs')

var stream = fs.readFileSync('day09input.txt', {encoding: 'utf8'}).split('\n')
var tokens = []

stream[0].split(/([\{\}\<\>\!])/).forEach(function(t) {
  for (var i = 0; i < t.length; i++) {
    tokens.push(t[i])
  }
})

var machineState = 'free'
var groupDepth = 0
var score = 0

var machine = {
  'free': function(token) {
    switch (token) {
      case '<':
        machineState = 'garbage'
        break
      case '{':
        groupDepth++
        break
      case '}':
        score += groupDepth
        groupDepth--
        break
    }
  },
  'eat': function(token) {
    machineState = 'garbage'
  },
  'garbage': function(token) {
    switch (token) {
      case '!':
        machineState = 'eat'
        break
      case '>':
        machineState = 'free'
        break;
    }
  }
}

for (var i = 0; i < tokens.length; i++) {
  if (tokens[i] === '') {
    continue
  }
  machine[machineState](tokens[i])
}

console.log(score)
