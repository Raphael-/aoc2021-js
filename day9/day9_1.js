const fs = require('fs');
const lines = fs.readFileSync('input.txt').toString()
	.trim()
	.split('\n')
const adjacencyIndices = [[0,-1],[-1,0],[0,1],[1,0]];	//left,top,right,down
const isLow = (x,y,arr) => adjacencyIndices
	.map(index => [x + index[0], y + index[1]])
	.filter(index => index[0] >= 0 && index[1] >= 0 && index[0] < arr.length && index[1] < arr[index[0]].length)
	.every(inBoundsIndex => arr[x][y] < arr[inBoundsIndex[0]][inBoundsIndex[1]]);
const twoDimensional = lines
	.map(line => line.split('').map(num => parseInt(num)))
const num = twoDimensional
	.map((line,x) => line.filter((element,y) => isLow(x,y,twoDimensional)))
	.reduce((acc, curr) => acc.concat(...curr), [])
	.reduce((a,b) => a + b + 1, 0)
console.log(num);
