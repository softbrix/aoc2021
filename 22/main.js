const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin
});


const q = {};
const qube = [];
for (let y = 0; y < 110; ++y) {
  qube[y] = [];
  for(let x = 0; x < 110; ++x) {
    qube[y][x] = [];
    for(let z = 0; z < 110; ++z) {
      qube[y][x][z] = 0;
    }
  }
}

rl.on('line', (line) => {
  // on x=-16..31,y=1..46,z=-4..43
  const flip = line[1] == 'f' ? 0 : 1;
  //console.log(line)
  const [xs,ys,zs] = line.split(' ')[1].split(',').map(t => t.substr(2).split('..').map(Number).map(t => t+50));
  //console.log(xs,ys,zs, flip);
  for (let y = Math.max(ys[0], 0); y <= ys[1] && y <= 100; ++y) {
    for(let x = Math.max(xs[0], 0); x <= xs[1] && x <= 100; ++x) {
      for(let z = Math.max(zs[0], 0); z <= zs[1] && z <= 100; ++z) {
        qube[y][x][z] = flip;
      }
    }
  }
});

rl.on('close', (input) => {
  let sum1 = 0;
  for (let y = 0; y <= 100; ++y) {
    for(let x = 0; x <= 100; ++x) {
      for(let z = 0; z <= 100; ++z) {
        if (qube[y][x][z] == 1) {
          ++sum1;
        }
      }
    }
  }
  console.log(`Sum1: ${sum1}`); 
});

function kid(x,y,z) {
  return '' + x +','+y+','+z;
}