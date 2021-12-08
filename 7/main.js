const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin
});

var crabs = [];
rl.on('line', (line) => {
  crabs = line.split(',')
});

rl.on('close', (input) => {
  const max = Math.max(...crabs);
  let minSum = Number.MAX_SAFE_INTEGER;
  let minSum2 = Number.MAX_SAFE_INTEGER;
  for (let d = 0;  d <= max; ++d) {
    let dx1 = 0;
    let dx2 = 0
    for (let c in crabs) {
      let dx = Math.abs(crabs[c] - d);
      dx1 += dx;
      dx2 += moveCost(dx);
    }
    if (dx1 < minSum) {
      minSum = dx1;
    }
    if (dx2 < minSum2) {
      minSum2 = dx2;
    }
  }
  console.log(`Sum1: ${minSum}`);
  console.log(`Sum2: ${minSum2}`);
});

let COSTS = {};
function moveCost(t) {
  if (t <= 0) {
    return 0;
  }
  if (!COSTS[t]) {
    COSTS[t] = t + moveCost(t-1);
  }
  return COSTS[t];
}