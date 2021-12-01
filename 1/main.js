const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin
});

let sum1 = 0, sum2 = 0
var last1 = NaN, last2 = NaN;
var mem = [];
rl.on('line', (line) => {
  n = Number(line);
  // PT1
  if (n > last1) {
    sum1++;
  }
  last1 = n;
  // PT2
  mem.push(n);
  if (mem.length < 3) {
    return;
  }
  let val = mem[0] + mem[1] + mem[2];
  if (val > last2) {
      sum2++;
  }
  last2 = val;
  mem.shift();
});

rl.on('close', (input) => {
  console.log(`Sum1: ${sum1}`);
  console.log(`Sum2: ${sum2}`);
});