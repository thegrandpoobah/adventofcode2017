// this is a conversion of the assembly program given as input
var h = 0
for (var b = 106500; b <= 123500; b+=17) {
getOut:
  for (var d = 2; d < b; d++) {
    for (var e = 2; e < b; e++) {
      if (d * e > b) {
        break
      }
      if (d * e == b) {
        h++
        break getOut
      }
    }
  }
}
console.log(h)
