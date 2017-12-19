// NOTE: this solution is terrible and eats a lot of memory
// it has to be run with node --max-old-space-size=12000 to give an answer
const input = 382
// const input = 3

console.log('allocating memory')
let pool = {}
for (let i = 0; i < 50000001; i++) {
  pool[i] = {v:0, next: undefined}
}
let poolPtr = 0
console.log('done!')

function getNext() {
  let p = pool[poolPtr]
  poolPtr++
  return p
}
let buffer = getNext()
buffer.next = buffer
let currentPosition = buffer

for (let i = 0; i < 50000000; i++) {
  if (i % 50000 === 0) {
    console.log(i)
  }
  for (let j = 0; j < input; j++) {
    currentPosition = currentPosition.next
  }
  let next = getNext()
  next.v = i + 1
  next.next = currentPosition.next
  currentPosition.next = next
  currentPosition = currentPosition.next
}

for (;;) {
  if (currentPosition.v === 0) {
    console.log('part 2', currentPosition.next.v)
    break
  }
  currentPosition = currentPosition.next
}

