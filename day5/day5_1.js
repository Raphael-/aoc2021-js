const fs = require('fs');
const lines = fs.readFileSync('test.txt').toString()
	.trim()
	.split("\n");
console.log('original lines', lines)
const coordinatesArray = lines
	.map(line => line.split(" -> ").map(part => part.split(",").map(coordinate => parseInt(coordinate))))
	.filter(line => line[0][0] == line[1][0] || line[0][1] == line[1][1])
	.map(coordinates => {
		const diffX = Math.abs(coordinates[0][0] - coordinates[1][0]);
		if(diffX !== 0) {
			const minX = Math.min(coordinates[0][0], coordinates[1][0]);
			const arr = Array.from({length: diffX+1}, (_, i) => i + minX).map(x => JSON.stringify([x,coordinates[0][1]]));
			console.log(coordinates, 'produced', arr)
			return arr; 
		}
		else {
			let diffY = Math.abs(coordinates[0][1] - coordinates[1][1]);
			const minY = Math.min(coordinates[0][1], coordinates[1][1]);
			const arr = Array.from({length: diffY+1}, (_, i) => i + minY).map(y => JSON.stringify([coordinates[0][0], y]));
			console.log(coordinates, 'produced', arr)
			return arr;
		}
	})
	.reduce((acc, coordinates) => acc.concat(coordinates), []); //flatten
let z = {}
console.log(z[''] || 0)
const pointsByCountMap = coordinatesArray.reduce((map, coordinate) => (map[coordinate] = (map[coordinate] || 0) + 1, map), {});
const totalPointsMoreThanTwo = Object.keys(pointsByCountMap).reduce((total, point) => pointsByCountMap[point] >= 2 ? total + 1: total, 0)
console.log('points count', pointsByCountMap);
console.log('total points', coordinatesArray.length);
console.log(totalPointsMoreThanTwo);

