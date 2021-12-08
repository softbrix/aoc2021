const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin
});

var bits = [0,0,0,0,0];
var cntr = 0;
let length = 0;
let lines = [];
rl.on('line', (line) => {
  if (length === 0) {
    length = line.length;
    for(let i = 0; i < length; ++i) { bits[i] = 0 }
  }
  let l = [];
  for(let i = 0; i < bits.length; ++i) {
    let isOne = line.charAt(i) === '1';
    if (isOne) {
      bits[i]++;
    } 
    l[i] = isOne;
  }
  lines.push(l);
  cntr++;
});

rl.on('close', (input) => {
  let sum1 = getGamma(bits, cntr) * getEpsilon(bits, cntr);
  let sum2 = getCO2(lines, 0) * getOxygen(lines, 0);
  console.log(`Sum1: ${sum1}`);
  console.log(`Sum1: ${sum2}`);
});

function getOxygen(lines, idx) {
  if (lines.length === 1) {
    console.log(lines)
    return toValue(lines[0]);
  }
  if (idx >= lines[0].length) {
    throw new Error('Index out of bounds in array');
  }
  let a = [], b = [];
  for(let x in lines) {
    if (lines[x][idx]) {
      a.push(lines[x]);
    } else {
      b.push(lines[x]);
    }
  }
  if (a.length >= b.length) {
    return getOxygen(a, ++idx)
  }
  return getOxygen(b, ++idx)
}

function getCO2(lines, idx) {
  if (lines.length === 1) {
    console.log(lines)
    return toValue(lines[0]);
  }
  if (idx >= lines[0].length) {
    throw new Error('Index out of bounds in array');
  }
  let a = [], b = [];
  for(let x in lines) {
    if (!lines[x][idx]) {
      a.push(lines[x]);
    } else {
      b.push(lines[x]);
    }
  }
  if (a.length <= b.length) {
    return getCO2(a, ++idx)
  }
  return getCO2(b, ++idx)
}

function toValue(bits) {
  let result = 0;
  for(let i = 0; i < bits.length; ++i) {
    if (bits[i]) {
      result |= 1;
    }
    if (i < bits.length -1 ) {
      result = result << 1;
    }
  }
  return result;
}

function getGamma(bits, cntr) {
  let lmt = cntr/2;
  let result = 0;
  for(let i = 0; i < bits.length; ++i) {
    if (bits[i] > lmt) {
      result |= 1;
    }
    if (i < bits.length -1 ) {
      result = result << 1;
    }
  }
  return result;
}

function getEpsilon(bits, cntr) {
  let lmt = cntr/2;
  let result = 0;
  for(let i = 0; i < bits.length; ++i) {
    if (bits[i] < lmt) {
      result |= 1;
    }
    if (i < bits.length -1 ) {
      result = result << 1;
    }
  }
  return result;
}