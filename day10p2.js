const LIST_SIZE = 256
const ROUNDS = 64

var stringInput = '147,37,249,1,31,2,226,0,161,71,254,243,183,255,30,70'
// var stringInput = 'AoC 2017'

var input = []
for (var i = 0; i < stringInput.length; i++) {
  input.push(stringInput.charCodeAt(i))
}
input.push(17)
input.push(31)
input.push(73)
input.push(47)
input.push(23)

var list = []
for (var i = 0; i < LIST_SIZE; i++) {
  list.push(i)
}

var currentPosition = 0
var skipSize = 0

function reverse(length) {
  var temp
  for (var i = 0; i < length / 2; i++) {
    temp = list[(currentPosition + i) % LIST_SIZE]
    list[(currentPosition + i) % LIST_SIZE] = list[(currentPosition + length - 1 - i) % LIST_SIZE]
    list[(currentPosition + length - 1 - i) % LIST_SIZE] = temp
  }
}

for (var i = 0; i < ROUNDS; i++) {
  input.forEach((length) => {
    reverse(length)
    currentPosition = (currentPosition + length + skipSize) % LIST_SIZE
    skipSize++
  })
}

var denseHash = ''
for (var i = 0; i < 16; i++) {
  var accum = 0
  for (var j = 0; j < 16; j++) {
    accum = accum ^ list[16*i+j]
  }

  var q = accum.toString(16)
  if (q.length === 1) {
    denseHash += '0'
  }
  denseHash += q
}

console.log(denseHash)
