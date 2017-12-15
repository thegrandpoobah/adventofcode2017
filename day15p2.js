var generator1 = 634
var generator2 = 301
// var generator1 = 65
// var generator2 = 8921

const GENERATOR1_FACTOR = 16807
const GENERATOR2_FACTOR = 48271
const DIVIDER = 2147483647
const GENERATIONS = 5000000
// const GENERATIONS = 5

function next(g, factor, multiple) {
  for (;;) {
    g = (g * factor) % DIVIDER
    if (g % multiple === 0) {
      return g
    }
  }
}

var equals = 0
for (var i = 0; i < GENERATIONS; i++) {
  generator1 = next(generator1, GENERATOR1_FACTOR, 4)
  generator2 = next(generator2, GENERATOR2_FACTOR, 8)

  if ((generator1 & 0xffff) === (generator2 & 0xffff)) {
    equals++
  }
}
console.log(equals)
