const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin
});

var mt = [];
var lows = [];
rl.on('line', (line) => {
  mt.push(line.split('').map(Number));
});

rl.on('close', (input) => {
  let res = mt.map((row, y) => analyse(row, y));
  let sum1 = res.flat().reduce((t, i) => t + i, 0);
  console.log(`Sum1: ${sum1}`);

  let basins = lows.map(calcBasins).sort((a,b) => b - a);
  let sum2 = basins[0] * basins[1] * basins[2];
  console.log(`Sum2: ${sum2}`);
});

function analyse(row, y) {
  return row.map((t, x) => isLow(t, x, y)).filter(x => x > 0)
}

function isLow(v, x, y) {
  if (v < g(x-1, y) &&
      v < g(x+1, y) &&
      v < g(x, y-1) &&
      v < g(x, y+1)) {
        lows.push({x, y});
        return v + 1;
      }
  return -1;
}

let visited = new Set();
function calcBasins(p) {
  let k = ''+p.x+','+p.y;
  if (visited.has(k) || g(p.x,p.y) == 9) {
    return 0;
  }
  visited.add(k);
  let b = 1 +
  calcBasins({x:p.x - 1, y:p.y}) +
  calcBasins({x:p.x + 1, y:p.y}) + 
  calcBasins({x:p.x,     y:p.y - 1}) +
  calcBasins({x:p.x,     y:p.y + 1});
  return  b;
}

function g(x, y) {
  if (x < 0 || x >= mt[0].length ||
    y < 0 || y >= mt.length) {
    return 9;
  }
  return mt[y][x];
}