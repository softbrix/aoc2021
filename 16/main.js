const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin
});

function hex2bin(hex){
  return (parseInt(hex, 16).toString(2)).padStart(8, '0');
}

var res = [];
rl.on('line', (line) => {
  res = line.match(/.{1,2}/g).map(hex2bin).reduce((p,c) => {
    return p.concat(c.split(''))
  }, []);
});

let sum1 = 0;
rl.on('close', (input) => {
  let c = {};
  analyse(res, res.length, c);
  console.log(`Sum1: ${sum1}`);
  const sum2 = calc(c);
  console.log(`Sum2: ${sum2}`);
});

function analyse(t, maxOf, c) {
  let of = 0;
  let V = toDecimal(t.slice(of, of+3));
  of += 3;
  let T = toDecimal(t.slice(of, of+3));
  of += 3;
  sum1 += V

  switch(T) {
    case 0: c.o = 'sum'; break;
    case 1: c.o = 'prod'; break;
    case 2: c.o = 'min'; break;
    case 3: c.o = 'max'; break;
    case 4: break;
    case 5: c.o = 'gt'; break;
    case 6: c.o = 'lt'; break;
    case 7: c.o = 'eq'; break;
    default: 
      console.log('Unknown T:', T);
      process.exit(0);
  }
  if (T === 4) {
    let l = [];
    while(of+5 <= maxOf) {
      l = l.concat(t.slice(of+1, of+5));
      of += 5;
      if (t[of-5] === '0') {
        break;
      }
    }
    c.v = toDecimal(l);
    return of;
  }
  let I = t.slice(of,of+1)[0];
  ++of;
  if (I == '1') {
    // 11 bits
    var L = toDecimal(t.slice(of, of+11));
    of += 11;
    c.ch = [];
    for (let i = 0; i < L; ++i) {
      let ch = {};
      of += analyse(t.slice(of), maxOf - of, ch);
      c.ch.push(ch);
    }
  } else {
    // 15 bits
    var L = toDecimal(t.slice(of, of+15));
    of += 15;
    const sf = of; // Start offset
    c.ch = [];
    for (; of < sf + L;) {
      let ch = {};
      of += analyse(t.slice(of), sf+L-of, ch)
      c.ch.push(ch);
    }
  }
  if (I === undefined) {
    console.log('HALT')
    process.exit(0);
  }
  return of;
}

function toDecimal(t) {
  return t.reverse().reduce((p,c,i) => p + (c=='1'?Math.pow(2,i):0), 0)
}

function calc(c) {
  if (c.v) {
    return c.v;
  }
  let cal = c.ch.map(calc);
  switch(c.o) {
    case 'sum': 
      return cal.reduce((c,b) => c+b, 0);
    case 'prod':
      return cal.reduce((c,b) => c*b, 1);
    case 'min': 
      return Math.min(...cal);
    case 'max': 
      return Math.max(...cal);
    case 4: break;
    case 'gt': return (cal[0] > cal[1])?1:0; 
    case 'lt': return (cal[0] < cal[1])?1:0;
    case 'eq': return (cal[0] == cal[1])?1:0; 
  }
}