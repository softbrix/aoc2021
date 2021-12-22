const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin
});


var plrs = [4,3];
rl.on('line', (line) => {
  plrs.push(line.substr('Player 1 starting position: '.length))
});


var rolls = 0;
const s = [0,0]
const p = [4,3]
rl.on('close', (input) => {
  let d = 0;
  let a = 0;
  while(s[0] < 1000 && s[1] < 1000) {
    for (let r = 0; r < 3; ++r) {  
      if (++d > 100) {
        d = 1;
      }
      ++rolls;
      p[a] += d;
    }
    while (p[a] > 10) {
      p[a] -= 10;
    }
    s[a] += p[a];
    a = (a+1)%2
    //if (rolls < 30) {
      console.log(s, p, d)
    //}
  }
  console.log(s, rolls)
  let sum1 = Math.min(...s) * rolls;
  console.log(`Sum1: ${sum1}`);  
  //console.log(`Sum2: ${sum}`);
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