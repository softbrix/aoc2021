const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin
});

var mtrx = [];
const COST = [];
rl.on('line', (line) => {
  COST[mtrx.length] = [];
  mtrx[mtrx.length] = line.split('').map(Number);
});

rl.on('close', (input) => {
  const sum1 = search();
  console.log(`Sum1: ${sum1}`);
  scale(5);
  const sum2 = search();
  console.log(`Sum2: ${sum2}`);
});

function search() {
  const MAX_X = mtrx[0].length-1, MAX_Y = mtrx.length-1;
  let m = {'0':[{x: 0, y: 1}, {x: 1, y: 0}]};
  COST[0][0] = 0;
  function push(v, el) {
    if (!m[v]) {
      m[v] = [];
    }
    m[v].push(el);
  }
  while (Object.keys(m).length > 0) {
    let k = Math.min(...Object.keys(m).map(Number));
    let q = m[k];
    delete m[k];
    while (q.length > 0) {
      let s = q.pop();
      if (COST[s.y][s.x]) {
        continue;
      }
      const v = mtrx[s.y][s.x] + min(s.x,s.y);
      COST[s.y][s.x] = v;
      if (s.y < MAX_Y) {
        push(v+mtrx[s.y+1][s.x], {x:s.x, y:s.y+1});
      }
      if (s.x < MAX_X) {
        push(v+mtrx[s.y][s.x+1],{x:s.x+1, y:s.y});
      }
      if (s.x > 0 && !COST[s.y][s.x-1]) {
        push(v+mtrx[s.y][s.x-1],{x:s.x-1, y:s.y});
      }
      if (s.y > 0 && !COST[s.y-1][s.x]) {
        push(v+mtrx[s.y-1][s.x],{x:s.x, y:s.y-1});
      }
    }
  }
 
  return COST[MAX_X][MAX_Y];
}

function min(x,y) {
  return Math.min(m(x-1,y), m(x,y-1),m(x+1,y), m(x,y+1));
}

function m(x,y) {
  if (y >= 0 && y < mtrx.length &&
     x >= 0 && x < mtrx[0].length) {
       if (COST[y][x] === undefined) {
         return Number.MAX_VALUE;
       }
       return COST[y][x];
     }
  return Number.MAX_VALUE;
}

function printMtrx(mt) {
  mt.forEach(t => {
    console.log(t.reduce((p,c) => {p += String(c).padStart(3); return p}, ""))
  })
}

function scale(size) {
  let newMtrx = [];
  for(let y = 0; y < size*mtrx.length; ++y) {
    COST[y] = [];
    const line = [];
    const dy = Math.floor(y/mtrx.length);
    const oldy = y % mtrx.length;
    for(let x = 0; x < size*mtrx[0].length; ++x) {
      line[x] = mtrx[oldy][x%mtrx[0].length] + dy + Math.floor(x/mtrx[0].length)
      if (line[x] > 9) {
        line[x] -= 9;
      }
    }
    newMtrx[y] = line;
  }
  mtrx = newMtrx;
}