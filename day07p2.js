var fs = require('fs')

var productions = fs.readFileSync('day7input.txt', {encoding: 'utf8'}).split('\n')

var isChild = {}
var nodeMaps = {}

for (var i = 0; i < productions.length; i++) {
  if (productions[i] === '') {
    continue;
  }

  var splits;

  splits = productions[i].match(/(\S*) \((\d*)\) -> (.*)/)
  if (!splits) {
    splits = productions[i].match(/(\S*) \((\d*)\)/)
  }

  nodeMaps[splits[1]] = {
    name: splits[1],
    weight: parseInt(splits[2], 10),
    children: splits[3] ? splits[3].split(', ') : []
  }

  if (!isChild[splits[1]]) {
    isChild[splits[1]] = false;
  }

  for (var j = 0; j < nodeMaps[splits[1]].children.length; j++) {
    isChild[nodeMaps[splits[1]].children[j]] = true
  }
}

var rootProgram = '';
for (var key in nodeMaps) {
  if (!isChild[key]) {
    rootProgram = key
    break
  }
}

function traverse(program, errors) {
  if (!program) {
    return 0
  }

  var childrenWeights = []
  var cumulativeWeight = program.weight
  for (var i = 0; i < program.children.length; i++) {
    var w = traverse(nodeMaps[program.children[i]], errors)
    childrenWeights.push(w)
    cumulativeWeight += w
  }

  if (program.children.length !== 0) {
    var count = {}
    var idx = {}
    for (var i = 0; i < childrenWeights.length; i++) {
      idx[childrenWeights[i]] = i
      if (!count[childrenWeights[i]]) {
        count[childrenWeights[i]] = 1
      } else {
        count[childrenWeights[i]]++
      }
    }

    for (var key in count) {
      if (count[key] === 1) {
        var difference = 0
        for (var i = 0; i < childrenWeights.length; i++) {
          difference = childrenWeights[i] - key
          if (difference !== 0) {
            break
          }
        }

        errors.push(nodeMaps[program.children[idx[key]]].weight + difference)
      }
    }
  }

  return cumulativeWeight
}

var errors = []
traverse(nodeMaps[rootProgram], errors)
console.log(errors[0])
