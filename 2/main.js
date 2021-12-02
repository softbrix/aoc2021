const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin
});

var x = 0, y = 0;
var y2 = 0;;
var aim = 0;
rl.on('line', (line) => {
  n = Number(line.split(' ')[1]);
  if (line.startsWith('forward')) {
    x += n;
    y2 += aim * n;
  } else if (line.startsWith('up')) {
    y -= n;
    aim -= n;
  } else if (line.startsWith('down')) {
    y += n;
    aim += n;
  }
});

rl.on('close', (input) => {
  let sum1 = x * y;
  let sum2 = x * y2;
  console.log(`Sum1: ${sum1}`);
  console.log(`Sum1: ${sum2}`);
});