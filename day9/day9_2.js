const fs = require('fs');
const lines = fs.readFileSync('input.txt').toString()
	.trim()
	.split('\n')
const adjacencyIndices = [[0,-1],[-1,0],[0,1],[1,0]];	//left,top,right,down
const findNeighbors = (x,y,arr) => adjacencyIndices
	.map(index => [x + index[0], y + index[1]])
	.filter(index => index[0] >= 0 && index[1] >= 0 && index[0] < arr.length && index[1] < arr[index[0]].length)
const isLow = (x,y,arr) => findNeighbors(x,y,arr)
	.every(inBoundsIndex => arr[x][y] < arr[inBoundsIndex[0]][inBoundsIndex[1]]);
const findAllDecreasingNeighbors = (x,y,arr) => findNeighbors(x,y,arr)
	.filter(neighborCoord => arr[neighborCoord[0]][neighborCoord[1]] > arr[x][y])
const twoDimensional = lines
	.map(line => line.split('').map(num => parseInt(num)))
const lowPoints = twoDimensional
	.map((line,x) => 
		line
		.map((element,y) => 
			isLow(x,y,twoDimensional) ? {x,y} : undefined
		)
		.filter(lowPoint => lowPoint)
	)
	.reduce((acc, curr) => acc.concat(...curr), [])

const getBasin = (uniqueBasinPoints,allPoints,basinPointsStack) => {
	if(basinPointsStack.length === 0) {
		return uniqueBasinPoints;
	}
	const point = basinPointsStack.pop();
	let neighbors = findNeighbors(point.x, point.y, allPoints)
		.map(neighbor => ({x:neighbor[0], y:neighbor[1]}))
		.filter(neighbor => allPoints[neighbor.x][neighbor.y] !== 9)
	neighbors.forEach(neighbor => {
		if(!uniqueBasinPoints.has(JSON.stringify(neighbor))) {
			uniqueBasinPoints.add(JSON.stringify(neighbor));
			basinPointsStack.push(neighbor);
		}
	});
	return getBasin(uniqueBasinPoints, allPoints, basinPointsStack);
}
const num = lowPoints
	.map(lowPoint => getBasin(new Set(), twoDimensional, [lowPoint]))
	.map(basinPoints => basinPoints.size)
	.sort((a,b) => b - a)
	.slice(0,3)
	.reduce((acc,curr) => acc * curr, 1)
console.log(num)
