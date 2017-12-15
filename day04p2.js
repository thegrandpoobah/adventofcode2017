var fs = require('fs')

var passphrases = fs.readFileSync('day04input.txt', {encoding: 'utf8'}).split('\n')

var parts
var memo
var validCount = 0
var valid

function distribution(word) {
  var res = {}
  for (var i = 0; i < word.length; i++) {
    if (!res[word.charAt(i)]) {
      res[word.charAt(i)] = 0
    }
    res[word.charAt(i)]++
  }
  return res
}

for (var i = 0; i < passphrases.length; i++) {
  if (passphrases[i] === '') {
    continue
  }

  parts = passphrases[i].split(' ')

  valid = true

allLoops:
  for (var j = 0; j < parts.length; j++) {
    for (var k = j + 1; k < parts.length; k++) {
      var a = distribution(parts[j])
      var b = distribution(parts[k])

      var anagram = true
      for (var key in a) {
        if (a[key] !== b[key]) {
          anagram = false
          break
        }
      }
      for (var key in b) {
        if (a[key] !== b[key]) {
          anagram = false
          break
        }
      }

      if (anagram) {
        valid = false
        break allLoops
      }
    }
  }

  if (valid) {
    validCount++
  }
}

console.log(validCount)
