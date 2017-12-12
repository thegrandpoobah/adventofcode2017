var fs = require('fs')

var input = fs.readFileSync('day12input.txt', {encoding: 'utf8'}).split('\n')

var graph = {}
for (var i = 0; i < input.length; i++) {
  if (!input[i]) {
    continue
  }
  graph[i] = input[i].match(/(.*) \<\-\> (.*)/)[2].split(', ')
}

function hashSize(hash) {
  var count = 0
  for (var key in hash) {
    count++
  }
  return count
}

var set = {}
function mst(node) {
  for (var i = 0; i < (node || []).length; i++) {
    if (set[node[i]]) {
      continue
    }

    set[node[i]] = true
    mst(graph[node[i]])
  }
}

mst(graph[0])
console.log('part 1', hashSize(set))

var groupCount = 0
while (hashSize(graph) > 0) {
  set = {}
  groupCount++

  set[Object.keys(graph)[0]] = true
  mst(graph[Object.keys(graph)[0]])

  for (var key in set) {
    delete graph[key]
  }
}

console.log('part 2', groupCount)
