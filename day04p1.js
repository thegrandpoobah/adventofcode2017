var fs = require('fs')

var passphrases = fs.readFileSync('day4input.txt', {encoding: 'utf8'}).split('\n')

var parts
var memo
var validCount = 0
var valid

for (var i = 0; i < passphrases.length; i++) {
  if (passphrases[i] === '') {
    continue
  }

  parts = passphrases[i].split(' ')

  valid = true
  memo = {}

  for (var j = 0; j < parts.length; j++) {
    if (memo[parts[j]]) {
      valid = false
      break
    }

    memo[parts[j]] = true
  }

  if (valid) {
    validCount++
  }
}

console.log(validCount)
