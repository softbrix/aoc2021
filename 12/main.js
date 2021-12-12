const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin
});

const node = {
  
}

function pt(a,b) {
  if (!edges[a]) {
    edges[a] = [];
  }
}

var edges = {};
rl.on('line', (line) => {
  const t = line.split('-');
  edges[t[0]] = (edges[t[0]] || []).concat([t[1]]);
  edges[t[1]] = (edges[t[1]] || []).concat([t[0]]);
});

rl.on('close', (input) => {
  console.log(edges)
  const sum1 = walkTheWalk('start', [], 0);
  //let res = mt.map((row, y) => analyse(row, y));
  //let sum1 = res.flat().reduce((t, i) => t + i, 0);
  console.log(`Sum1: ${sum1}`);

  //console.log(`Sum2: ${sum2}`);
});

function isLower(str) {
  return str.toLowerCase() == str;
}

function walkTheWalk(node, visited, steps) {
  if (visited.indexOf(node) >= 0) {
    return 0;
  }
  if (node == "end") {
    return 1;
  }
  if (isLower(node)) {
    visited = visited.concat([node])
  }
  return edges[node]
    .map(t => walkTheWalk(t, visited,++steps))
    .reduce((a, i) => a+i, 0)
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