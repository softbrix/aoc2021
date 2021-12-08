const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin
});

var squids = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
rl.on('line', (line) => {
  line.split(',').forEach(x => squids[x]++)
});

rl.on('close', (input) => {
  let sum1 = 0;
  for (let i = 0;  i < 256; ++i) {
    let newSquids = [];
    for (let a = 8; a >= 0; a--) {
      if (a == 0) {
        newSquids[8] = squids[0];
        newSquids[6] = newSquids[6] + squids[0];
      } else {
        newSquids[a-1] = squids[a]; 
      }
    }
    squids = newSquids;
    if (i === 79) {
      sum1 = squids.reduce((p, x) => p+x, 0);
    }
  }
  let sum2 = squids.reduce((p, x) => p+x, 0);
  console.log(`Sum1: ${sum1}`);
  console.log(`Sum2: ${sum2}`);
});