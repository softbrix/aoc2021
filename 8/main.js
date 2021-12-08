const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin
});

var sum1 = 0;
var sum2 = 0; 
rl.on('line', (line) => {
  var parts = line.split('| ');
  sum1 += parts[1].split(' ').filter(x => [2,3,4,7].indexOf(x.length) >= 0).length
  sum2 += analyse(parts);
});

rl.on('close', (input) => {
  console.log(`Sum1: ${sum1}`);
  console.log(`Sum2: ${sum2}`);
});

function analyse(parts) {
  let segs = parts[0].split(' ');
  let map = toLenMap(segs);

  let n = [];
  n[1] = map[2][0];
  n[7] = map[3][0];
  n[4] = map[4][0];
  n[8] = map[7][0];
  
  // 3, 5, 2
  n[3] = f3(map[5], n[1]);
  map[5] = map[5].filter(x => x !== n[3]);
  n[5] = f5(map[5], n[4]);
  map[5] = map[5].filter(x => x !== n[5]);
  n[2] = map[5][0];

  // 9, 0, 6
  n[9] = f9(map[6], n[4]);
  map[6] = map[6].filter(x => x !== n[9]);
  n[0] = f0(map[6], n[1]);
  map[6] = map[6].filter(x => x !== n[0]);
  n[6] = map[6][0];

  let dict = toDict(n);
  let sum = 0;
  for (let p of parts[1].split(' ')) {
    sum *= 10;
    p = id(p);
    sum += dict[p];
  }
  return sum;
}

function f3(segs, one) { return segs.filter(x => xor(one, x).length === 2)[0]; }
function f5(segs, four) { return segs.filter(x => xor(four, x).length === 3)[0]; }
function f9(segs, four) { return segs.filter(x => xor(four, x).length === 4)[0]; }
function f0(segs, one) { return segs.filter(x => xor(one, x).length === 2)[0]; }

function xor(a, b) {
  let res = '';
  for(let c of a) {
    if (b.indexOf(c) >= 0) {
      res += c;
    }
  }
  return res;
}

function toLenMap(segs) {
  let res = {};
  for (let s in segs) {
    let k = segs[s].length;
    if (!res[k]) {
      res[k] = []
    }
    res[k].push(segs[s]);
  }
  return res;
}

function toDict(n) {
  let res = {};
  n.forEach((t, i) => {
    res[id(t)] = i;
  })
  return res;
}

function id(s) {
  return s.split('').sort().join('');
}