const fs = require('fs');
const lines = fs.readFileSync('input.txt').toString()
	.split('\n')
	.filter(line => line !== '');
const coordinates = lines.filter(line => !line.startsWith('fold')).map(line => line.split(',').map(coord => parseInt(coord)));
const instructions = lines.filter(line => line.startsWith('fold')).map(line => line.split('=').map(part => part.replace('fold along ','')));
const maxDimension = (set, dim) => Math.max(...[...set].map(coordJson => JSON.parse(coordJson)[dim])) + 1;
const foldX= (set,col) => [...set]
	.map(coordJson => JSON.parse(coordJson))
	.map(coord => coord["x"] < col ? coord : ({x:2*col - coord["x"], y: coord["y"]}))	//distance from a folded column is colToFold - (x - colToFold)
	.reduce((acc,curr) => acc.add(JSON.stringify(curr)), new Set([]))
const foldY= (set,row) => [...set]
	.map(coordJson => JSON.parse(coordJson))
	.map(coord => coord["y"] < row ? coord : ({x:coord["x"], y: 2*row - coord["y"]}))
	.reduce((acc,curr) => acc.add(JSON.stringify(curr)), new Set([]))
const print = (set, maxX, maxY) => {
	for (let i = 0; i < maxY; i ++) {
		for (let j = 0; j < maxX; j ++) {
			process.stdout.write(set.has(JSON.stringify({x:j,y:i})) ? '#':'.');
		}
		process.stdout.write("\n");
	}
}
const hashtagsCoord = coordinates.reduce((acc,curr) => acc.add(JSON.stringify({x:curr[0], y:curr[1]})), new Set([]));
let set = hashtagsCoord;
for(let instruction of instructions) {
	if(instruction[0] === 'x') {
		set = foldX(set, parseInt(instruction[1]));
	}
	else {
		set = foldY(set, parseInt(instruction[1]));
	}
	break;
}
console.log(set.size);
