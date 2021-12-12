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
  const sum1 = walkTheWalk('start', [], 0, -1);
  console.log(`Sum1: ${sum1}`);
  const sum2 = walkTheWalk('start', [], 0, undefined);
  console.log(`Sum2: ${sum2}`);
});

function isLower(str) {
  return str.toLowerCase() == str;
}

function walkTheWalk(node, visited, steps, memory) {
  if (visited.indexOf(node) >= 0) {
    if (node != "start" && memory === undefined) {
      memory = node;
    } else {
      return 0;
    }
  }
  if (node == "end") {
    return 1;
  }
  if (isLower(node)) {
    visited = visited.concat([node])
  }
  return edges[node]
    .map(t => walkTheWalk(t, visited,++steps, memory))
    .reduce((a, i) => a+i, 0)
}