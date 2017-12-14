const SPAN = 97
// const SPAN = 7

var firewallDepths = {
  0: 3,
  1: 2, // 0, 1, 0
  2: 6,
  4: 4,
  6: 4,
  8: 8,
  10: 6, // 0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0
  12: 8,
  14: 5,
  16: 6,
  18: 8, // 0, 1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1, 0
  20: 8,
  22: 12,
  24: 6,
  26: 9,
  28: 8,
  30: 12,
  32: 12,
  34: 17,
  36: 12,
  38: 8,
  40: 12,
  42: 12,
  44: 10,
  46: 12,
  48: 12,
  50: 12,
  52: 14,
  54: 14,
  56: 10,
  58: 14,
  60: 12,
  62: 14,
  64: 14,
  66: 14,
  68: 14,
  70: 14,
  72: 14,
  74: 14,
  76: 14,
  86: 14,
  94: 20,
  96: 18
}
// var firewallDepths = {
//   0: 3, // 0, 1, 2, 1, 0 => 5
//   1: 2, // 0, 1, 0 => 3
//   4: 4, // 0, 1, 2, 3, 2, 1, 0 => 7
//   6: 4  // 0, 1, 2, 3, 2, 1, 0 => 7
// }

for (var i = 0; i < SPAN; i++) {
  if (!firewallDepths[i]) {
    firewallDepths[i] = 0
  } else {
    firewallDepths[i] = (firewallDepths[i] - 1) * 2
  }
}

for (var d = 0;; d++) {
  var caught = false
  for (var j = 0; j < SPAN; j++) { // number of generations to cross
    if (firewallDepths[j] !== 0 && (d + j) % firewallDepths[j] === 0) {
      caught = true
    }
  }

  if (!caught) {
    console.log(d)
    break
  }
}
