const readline = require('readline');
const { callbackify } = require('util');
const rl = readline.createInterface({
  input: process.stdin
});



var table = undefined;
var grid = [];
var pxls = {};
let y = 0;
rl.on('line', (line) => {
  if (!table) {
    table = line.split('').map(t => t === '#' ? 1 : 0);
  } else {
    let row = line.split('').map(t => t === '#' ? 1 : 0)
    grid.push(row);
    row.forEach((t,x) => { pxls[id(x,y)] = t }); 
    ++y;
  }
});



rl.on('close', (input) => {
  //console.log(table)
  let sum, sum1 = 0;
  for (let i = 0; i < 50; ++i) {
    enhance(i)
    sum = Object.values(pxls).filter(t => t > 0).length
    console.log(i, sum)
    if (i == 1) {
      sum1 = sum;
    } 
  }
  console.log(`Sum1: ${sum1}`);  
  console.log(`Sum2: ${sum}`);
});

function enhance(iteration) {
  let newPixels = {};
  function calc(x,y,v) {
    const i = id(x,y);
    if (newPixels[i] != undefined) {
      return;
    }
    let bits = [];
    for(let dy = -1; dy <= 1; ++dy) {
      for(let dx = -1; dx <= 1; ++dx) {
        let p2 = pxls[id(x+dx, y+dy)];
        let lit = 0;
        if (p2 != undefined) {
          lit = p2;
        } else {
          lit = iteration % 2 ? table[0] : 0;
        }
        bits.push(lit);
      }
    }
    newPixels[i] = table[toDecimal(bits)]
  }
  Object.entries(pxls).forEach(e => {
    for(let dy = -1; dy <= 1; ++dy) {
      for(let dx = -1; dx <= 1; ++dx) {
        const p = kid(e[0])
        calc(p.x + dx, p.y + dy, e[1]);
      }
    }
  })
  pxls = newPixels;
}

function id(x,y) {
  return '' + x +','+y;
}

function kid(s) {
  const r = s.split(',').map(Number);
  return {x:r[0], y:r[1]}
}

function toDecimal(t) {
  return t.reverse().reduce((p,c,i) => p + (c=='1'?Math.pow(2,i):0), 0)
}