const { setPriority } = require('os');
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin
});

var mtch = {};
var steps = {};
var row = undefined;
rl.on('line', (line) => {
  if (!row) {
    row = line.split('');
  } else if (line.trim().length > 0) {
    // AA -> B
    let b = line.split(' -> ');
    mtch[b[0]] = b[1];
  }
});

rl.on('close', (input) => {
  step();
  for (let i = 0;  i < 9; ++i) {
    iterate();  
  }
  const sum1 = sum();
  console.log(`Sum1: ${sum1}`);
  for (let i = 0;  i < 30; ++i) {
    iterate();
  }
  const sum2 = sum();
  console.log(`Sum2: ${sum2}`);
  });

function step() {
  let newSteps = {};
  for (let i = 0; i < row.length-1; ++i) {
    const m = "" + row[i] + row[i+1];
    if (mtch[m]) {
      const k = row[i] + mtch[m];
      const k2 = mtch[m] + row[i+1] 
      newSteps[k] = (newSteps[k] || 0) + 1;
      newSteps[k2] = (newSteps[k2] || 0) + 1;
    }
  }
  steps = newSteps;
}

function iterate() {
  let newSteps = {};
  Object.entries(steps).forEach(([m,c], i) => {
    if (mtch[m]) {
      const k = m[0] + mtch[m];
      const k2 = mtch[m] + m[1] 
      newSteps[k] = (newSteps[k] || 0) + c;
      newSteps[k2] = (newSteps[k2] || 0) + c;
    } else {
      console.log('miss');
      newSteps[m] = c;
    }
  });
  steps = newSteps;
}

function sum() {
  let sums = Object.entries(steps).reduce((p, [c,k]) => {p[c[0]] = (p[c[0]] || 0)+k; p[c[1]] = (p[c[1]] || 0)+k; return p}, {});
  sums = Object.values(sums).map(t => Math.ceil(t/2)).sort((a,b) => b-a);
  return sums[0] - sums[sums.length-1];
} 