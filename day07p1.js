var fs = require('fs')

var productions = fs.readFileSync('day07input.txt', {encoding: 'utf8'}).split('\n')

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
    weight: splits[2],
    children: (splits[3] || '').split(', ')
  }

  if (!isChild[splits[1]]) {
    isChild[splits[1]] = false;
  }

  for (var j = 0; j < nodeMaps[splits[1]].children.length; j++) {
    isChild[nodeMaps[splits[1]].children[j]] = true
  }
}

for (var key in nodeMaps) {
  if (!isChild[key]) {
    console.log(key)
  }
}
