var fs = require('fs')

var spreadsheet = fs.readFileSync('day02input.txt', {encoding: 'utf8'}).split('\n')

var sum = 0

for (var i = 0; i < spreadsheet.length; i++) {
  if (spreadsheet[i] === '') {
    continue
  }

  var row = spreadsheet[i].split(' ')

  var min = Number.MAX_VALUE
  var max = Number.MIN_VALUE

  for (var j = 0; j < row.length; j++ ) {
    var num = parseInt(row[j], 10)

    if (num < min) {
      min = num
    }

    if (num > max) {
      max = num
    }
  }

  sum += max - min
}

console.log(sum)
