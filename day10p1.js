const LIST_SIZE = 256

var input = [147,37,249,1,31,2,226,0,161,71,254,243,183,255,30,70]
// const LIST_SIZE = 5

// var input = [3,4,1,5]

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

input.forEach((length) => {
  reverse(length)
  currentPosition = currentPosition + length + skipSize) % LIST_SIZE
  skipSize++
})

console.log(list[0] * list[1])
