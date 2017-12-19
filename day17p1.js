const input = 382
// const input = 3

let buffer = [0]
let currentPosition = 0

for (let i = 1; i < 2018; i++) {
  currentPosition = ((currentPosition + input) % buffer.length) + 1
  buffer.splice(currentPosition, 0, i)
}

console.log('part 1', buffer[currentPosition+1])
