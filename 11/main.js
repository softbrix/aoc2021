const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin
});

const mt = [];
rl.on('line', (line) => {
  mt.push(line.split('').map(Number));
});

var sum1 = 0;
var sum2 = -1;
rl.on('close', (input) => {
  part1(mt);
  console.log(`Sum1: ${sum1}`);
  for (let i = 0; i < 10; ++i) {
    if (part1(mt)) {
      sum2 += (i+1) * 100;
    }
  }
  console.log(`Sum2: ${sum2}`);
});

var flashes = [];
let flCount = 0;
function part1(mt) {
  for(let i = 0; i < 100; ++i) {
    flashes = [];
    flCount = 0;
    for (let x = 0; x < mt[0].length; ++x) {
      for (let y = 0; y < mt.length; ++y) {
        t({x, y});
      }
    }
    while (flashes.length > 0) {
      flash(flashes.pop());
    }
    for (let x = 0; x < mt[0].length; ++x) {
      for (let y = 0; y < mt.length; ++y) {
        r({x,y})
      }
    }
    if (sum2 < 0 && flCount === 100) {
      sum2 = i + 1;
      return true;
    }
  }
}

function flash(p) {
  for (let i = -1; i <= 1; ++i) {
    for (let j = -1; j <= 1; ++j) {
      t({x:p.x+i, y:p.y+j});
    }
  }
}

function t(p) {
  if (p.y >= mt.length || p.y < 0 || p.x < 0 || p.x >= mt[p.y].length) {
    return;
  }
  if (++mt[p.x][p.y] == 10) {
    flashes.push(p);
    ++sum1;
    ++flCount;
  }
}

function r(p) {
  if (mt[p.x][p.y] > 9) {
    mt[p.x][p.y] = 0;
  }
}