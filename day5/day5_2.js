const fs = require('fs');
const lines = fs.readFileSync('input.txt').toString()
	.trim()
	.split("\n");
const coordinatesArray = lines
	.map(line => line.split(" -> ").map(part => part.split(",").map(coordinate => parseInt(coordinate))))
	.map(coordinates => {
		const diffX = coordinates[0][0] - coordinates[1][0];
		const diffY = coordinates[0][1] - coordinates[1][1];
		const slopeX = diffX > 0 ? 1 : diffX < 0 ? -1 : 0;
		const slopeY = diffY > 0 ? 1 : diffY < 0 ? -1 : 0;
		const coords = Array.from({length: 1 + Math.max(Math.abs(diffX), Math.abs(diffY))}, (_,i) => [coordinates[0][0] - i*slopeX, coordinates[0][1] - i*slopeY]); 
		return coords;
	})
	.reduce((acc, coordinates) => acc.concat(coordinates), []); //flatten
const pointsByCountMap = coordinatesArray.reduce((map, coordinate) => (map[coordinate] = (map[coordinate] || 0) + 1, map), {});
const totalPointsMoreThanTwo = Object.keys(pointsByCountMap).reduce((total, point) => pointsByCountMap[point] >= 2 ? total + 1: total, 0)
console.log(totalPointsMoreThanTwo);

