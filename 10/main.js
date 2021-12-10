const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin
});

const lookup = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137
}
const l2 = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4
}
const incompletes = [];

var sum1 = 0;
rl.on('line', (line) => {
  sum1 += analyse(line.split(''), []);
});

rl.on('close', (input) => {
  console.log(`Sum1: ${sum1}`);
  let sum2 = part2();
  console.log(`Sum2: ${sum2}`);
});

const opens = new Map();
opens.set('(', ')');
opens.set('<', '>');
opens.set('[', ']');
opens.set('{', '}');

function analyse(line, q) {
  if (line.length === 0 && q.length > 0) {
    incompletes.push(q);
    return 0;
  }
  const c = line.shift();
  if (opens.has(c)) {
    q.push(opens.get(c));
    return analyse(line, q);
  }
  if (c === q[q.length - 1]) {
    q.pop();
    return analyse(line, q);
  } 
  return lookup[c] || 0;
}

function part2() {
  let sums = incompletes.map(q => q.reverse().reduce((p,c) => (5*p) + l2[c], 0));
  sums.sort((a,b) => a-b);
  const res = sums[Math.floor(sums.length/2)];
  return res;
}