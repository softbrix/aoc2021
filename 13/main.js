const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin
});

var pts = {};
var parsePoints = true;
var operations = [];
rl.on('line', (line) => {
  if (line.trim().length === 0) {
    parsePoints = false;
    return;
  }
  if (parsePoints) {
    pts[line] = 1;
    const t = line.split(',').map(Number);
  } else {
    // fold along y=7
    let b = line.substr("fold along ".length).split('=')
    b[0] = b[0] == 'x'
    operations.push(b);
  }
});

rl.on('close', (input) => {
  const sum1 = fold(operations.shift());
  console.log(`Sum1: ${sum1}`);
  while (operations.length > 0) {
    fold(operations.shift());
  }
  console.log('Part 2:')
  print(pts)
});

function fold(inpt) {
  const op = inpt[0];
  const offset = inpt[1];
  const newPts = {};
  Object.keys(pts).forEach(k => {
    let [x,y] = k.split(',').map(Number);
    if (op) {
      if (x > offset) {
        x = 2*offset - x;
      }
    } else {
      if (y > offset) {
        y = 2*offset - y;
      }
    }
    newPts[kid(x,y)] = 1;
  });
  pts = newPts;
  return Object.keys(pts).length;
}

function print(pts) {
  const [maxX, maxY] = Object.keys(pts).map(a => a.split(',').map(Number))
  .reduce((a, c) => {a[0] = Math.max(a[0], c[0]);a[1] = Math.max(a[1], c[1]); return a;}, [0,0] );
  for (var y = 0; y <= maxY; ++y) {
    let line = "";
    for (var x = 0; x <= maxX; ++x) {
      if (pts[kid(x,y)]) {
        line += "#"
      } else {
        line += " "
      }
    }
    console.log(line)
  }
  console.log("---------")
}

function kid(x,y) {
  return '' + x+',' + y;
}