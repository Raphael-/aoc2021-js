const fs = require('fs');
const lines = fs.readFileSync('input.txt').toString().trim();
const uniqueSignalsLetterCount = new Set([2,4,3,7]);
const count = lines.split('\n').map(line => line.split(' | ')[1]).reduce((acc,element) => acc + element.split(' ').filter(signal => uniqueSignalsLetterCount.has(signal.length)).length, 0);
console.log(count);
