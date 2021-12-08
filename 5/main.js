const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin
});

var map = new Map();
var diagonals = [];
rl.on('line', (line) => {
  let path = parse(line);
  if (path.length != 2) {
    throw new Error('Invalid path!')
  }
  if (path[0].y == path[1].y) {
    let from = Math.min(path[0].x, path[1].x);
    let to = Math.max(path[0].x, path[1].x);
    for(let i  = from; i <= to; ++i) {
      let k = "" + i + "," + path[0].y;
      let v = map.get(k)
      if (!v) {
        v = 0;
      }
      ++v;
      map.set(k, v);
    }
  } else if (path[0].x == path[1].x) {
    let from = Math.min(path[0].y, path[1].y);
    let to = Math.max(path[0].y, path[1].y);
    //console.log('from', from, to)
    for(let i  = from; i <= to; ++i) {
      let k = "" + path[0].x + "," + i;
      let v = map.get(k)
      if (!v) {
        v = 0;
      }
      ++v;
      map.set(k, v);
    }
  } else {
    diagonals.push(path)
  }
});

function parse(line) {
  return line.split(' -> ').map(x => { let t = x.split(','); return {x: Number(t[0]), y: Number(t[1])}});
}

rl.on('close', (input) => {
  let sum1 = solve1(map);
  addDiagonals(diagonals, map);
  let sum2 = solve1(map);
  console.log(`Sum1: ${sum1}`);
  console.log(`Sum2: ${sum2}`);
});

function solve1(map) {
  return [...map.values()].filter(x => x > 1).length;
}

function addDiagonals(diagonals, map) {
  for (let x in diagonals) {
    let path = diagonals[x];
    let iterations = Math.abs(path[0].x - path[1].x);
    let tl = path[0]
    let dx = (path[1].x - path[0].x)/iterations;
    let dy = (path[1].y - path[0].y)/iterations;
    console.log('from', tl, iterations, dx, dy)
    for(let i  = 0; i <= iterations; ++i) {
      let k = "" + (tl.x + (dx*i)) + "," + (tl.y + (dy*i));
      let v = map.get(k)
      if (!v) {
        v = 0;
      }
      ++v;
      map.set(k, v);
    }
  }
}