const fs = require('fs');
let grid = fs.readFileSync('input.txt').toString()
	.split('\n')
	.filter(line => line !== '')
	.map(row => row.split('').map(num => parseInt(num)));
const neighborsDirections = [[0,-1], [0,1], [-1,0], [1,0], [-1,-1], [-1,1], [1,-1], [1,1]];	//left,right,top,bottom,upper left, upper right, bottom left, bottom right
const findNeighbors = (x,y,grid) => neighborsDirections
	.map(directions => [x + directions[0], y + directions[1]])
	.filter(neighbor => neighbor[0] >= 0 && neighbor[1] >= 0 && neighbor[0] < grid.length && neighbor[1] < grid[0].length);
const steps = 100;
let flashes = 0;
const doLight = (grid, seenPoints) => {
	for(let i = 0; i < grid.length; i ++) {
		for(let j = 0; j < grid.length; j ++) {
			const point = JSON.stringify({x:i, y:j});
			if(!seenPoints.has(point) && grid[i][j] === 0) {
				seenPoints.add(point);
				findNeighbors(i,j,grid)
					.filter(neighbor => grid[neighbor[0]][neighbor[1]] !== 0)
					.forEach(neighbor => {
							grid[neighbor[0]][neighbor[1]] = (grid[neighbor[0]][neighbor[1]] + 1) % 10
					});
				doLight(grid,seenPoints);
			}
		}
	}
}
let lights = 0;
for(let step = 1; step <= steps; step++) {
	grid = grid.map(row => row.map(num => (num + 1) % 10));
	doLight(grid,new Set([]));
	lights += grid.map(row => row.filter(octopus => octopus === 0).length).reduce((acc,curr) => curr + acc, 0);
}
console.log(lights);
