const { setPriority } = require('os');
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin
});

var tests = [[23,-10],[25,-9],[ 27,-5],[ 29,-6],[ 22,-6],[ 21,-7],[ 9,0],[ 27,-7],[ 24,-5
],[25,-7],[ 26,-6],[ 25,-5],[ 6,8],[ 11,-2],[ 20,-5],[ 29,-10],[6,3],[ 28,-7
],[8,0],[ 30,-6],[ 29,-8],[ 20,-10],[6,7],[ 6,4],[ 6,1],[ 14,-4],[ 21,-6
],[26,-10],[7,-1],[7,7],[ 8,-1],[21,-9],[ 6,2],[ 20,-7],[ 30,-10],[14,-3
],[20,-8],[ 13,-2],[ 7,3],[ 28,-8],[ 29,-9],[ 15,-3],[ 22,-5],[ 26,-8],[ 25,-8
],[25,-6],[ 15,-4],[ 9,-2],[15,-2],[ 12,-2],[ 28,-9],[ 12,-3],[ 24,-6],[ 23,-7
],[25,-10],[7,8],[ 11,-3],[ 26,-7],[ 7,1],[ 23,-9],[ 6,0],[ 22,-10],[27,-6
],[8,1],[ 22,-8],[ 13,-4],[ 7,6],[ 28,-6],[ 11,-4],[ 12,-4],[ 26,-9],[ 7,4
],[24,-10],[23,-8],[ 30,-8],[ 7,0],[ 9,-1],[10,-1],[ 26,-5],[ 22,-9],[ 6,5
],[7,5],[ 23,-6],[ 28,-10],[10,-2],[ 11,-1],[ 20,-9],[ 14,-2],[ 29,-7],[ 13,-3
],[23,-5],[ 24,-8],[ 27,-9],[ 30,-7],[ 28,-5],[ 21,-10],[7,9],[ 6,6],[ 21,-5
],[27,-10],[7,2],[ 30,-9],[ 21,-8],[ 22,-7],[ 24,-9],[ 20,-6],[ 6,9],[ 29,-5
],[8,-2],[27,-8],[ 30,-5],[ 24,-7]]

var X = [];
var Y = [];
rl.on('line', (line) => {
  let v = line.substr("target area: ".length).split(', ');
  console.log(v);
  X = v[0].substr(2).split('..').map(Number);
  Y = v[1].substr(2).split('..').map(Number);
});

var sum2 = 0;
rl.on('close', (input) => {
  const sum1 = searchMaxY();
  console.log(`Sum1: ${sum1}`);  
  console.log(`Sum2: ${sum2}`);
});

function searchMaxY() {
  let maxY = 0;
  for(let dx = 0; dx < 1000; ++dx) {
    for(let dy = -1000; dy < 1000; ++dy) {
      let s = interpolate(dx, dy);
      if (s >= 0) {
        ++sum2;
      }
      maxY = Math.max(maxY, s);
    } 
  }
  return maxY;
}

function interpolate(dx,dy) {
  let x = 0, y = 0, maxY = 0;
  while (x < X[1] && y > Y[0]) {
    x += dx;
    y += dy;
    maxY = Math.max(maxY, y);
    if (x >= X[0] && x <= X[1] && y >= Y[0] && y <= Y[1]) {
      break;
    }
    --dy
    dx = Math.max(--dx, 0);
    if (dx == 0 && x < X[0]) {
      break;
    }
  }
  //console.log('<x<y', x, y, dx, dy)
  if (x >= X[0] && x <= X[1] && y >= Y[0] && y <= Y[1]) {
    return maxY;
  }
  return -1;
}