const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin
});

var nmbrs = undefined;
var bid = -1;
var rowId = 0;
var boards = [];
rl.on('line', (line) => {
  if (!nmbrs) {
    nmbrs = line.split(',').map(x => Number(x));
  } else if (line.length === 0) {
    bid++;
    rowId = 0;
    boards[bid] = [];
    return;
  } else {
    boards[bid][rowId++] = line.trim().split(' ').filter(x => x.trim().length).map(x => Number(x));
  }
});

rl.on('close', (input) => {
  let sum1 = solve1(nmbrs, boards);
  let sum2 = solve2(nmbrs, boards);
  console.log(`Sum1: ${sum1}`);
  console.log(`Sum2: ${sum2}`);
});

function solve1(nmbrs, boards) {
  for (let i in nmbrs) {
    markBoards(nmbrs[i], boards);
    let bid = checkBingo(boards);
    if (bid >= 0) {
      console.log('BINGO!', bid, nmbrs[i])
      return boardSum(boards[bid]) * nmbrs[i]
    }
  }
  throw new Error('No bingo...');
}

function solve2(nmbrs, boards) {
  let bingos = 0;
  for (let i in nmbrs) {
    markBoards(nmbrs[i], boards);
    var bid = -1;
    do {
      bid = checkBingo(boards);
      if (bid >= 0) {
        if (++bingos == boards.length) {
          return boardSum(boards[bid]) * nmbrs[i]
        }
        delete boards[bid];
      }
    } while (bid >= 0);
    if (boards.length == 0) {
      throw new Error('No boards left');
    }
  }
  throw new Error('No bingo...');
}

function markBoards(nmbr, boards) {
  for(let bid in boards) {
    for (let x in boards[bid]) {
      for (let y in boards[bid][x]) {
        if (boards[bid][x][y] === nmbr) {
          boards[bid][x][y] = -nmbr - 1;
        }
      }
    }
  }
}

function checkBingo(boards) {
  for(let bid in boards) {
    for (let x = 0; x < 5; ++x) {
      let bx = 0, by = 0;
      for (let c = 0; c < 5; ++c) {
        if (boards[bid][x][c] < 0) {
          bx++;
        } 
        if (boards[bid][c][x] < 0) {
          by++;
        }
        if (by < c && bx < c) {
          break;
        }
      }
      if (bx === 5 || by === 5) {
        return bid;
      }
    }
  }
  return -1;
}

function boardSum(board) {
  let sum = 0;
  for (let x = 0; x < 5; ++x) {
    for (let y = 0; y < 5; ++y) {
      let v = board[x][y];
      if (v > 0) {
        sum += v;
      }
    }
  }
  return sum;
}