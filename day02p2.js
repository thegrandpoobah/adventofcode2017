var fs = require('fs')

var spreadsheet = fs.readFileSync('day02input.txt', {encoding: 'utf8'}).split('\n')

var sum = 0

for (var i = 0; i < spreadsheet.length; i++) {
  if (spreadsheet[i] === '') {
    continue
  }

  var row = spreadsheet[i].split(' ')

  for (var j1 = 0; j1 < row.length; j1++) {
    for (var j2 = j1 + 1; j2 < row.length; j2++) {
      var a = parseInt(row[j1], 10)
      var b = parseInt(row[j2], 10)

      var div = Math.max(a, b) / Math.min(a, b)
      if (div - Math.trunc(div) === 0) {
        sum += div
      }
    }
  }
}

console.log(sum)
