var generator1 = 634
var generator2 = 301
// var generator1 = 65
// var generator2 = 8921

const GENERATOR1_FACTOR = 16807
const GENERATOR2_FACTOR = 48271
const DIVIDER = 2147483647
const GENERATIONS = 40000000
// const GENERATIONS = 5

var equals = 0
for (var i = 0; i < GENERATIONS; i++) {
  generator1 = (generator1 * GENERATOR1_FACTOR) % DIVIDER
  generator2 = (generator2 * GENERATOR2_FACTOR) % DIVIDER

  if ((generator1 & 0xffff) === (generator2 & 0xffff)) {
    equals++
  }
}
console.log(equals)
