const fs = require('fs');
let depth = horizontal = aim = 0;
const array = fs.readFileSync('input.txt').toString()
	.split("\n")
	.forEach(line => {
		let movement = line.split(" ")
		switch(movement[0]) {
			case 'forward':
				horizontal += parseInt(movement[1]);
				depth += aim * parseInt(movement[1]);
				break;
			case 'down':
				aim += parseInt(movement[1]);
				break;
			case 'up':
				aim -= parseInt(movement[1]);
				break;
		}
	})
console.log(depth * horizontal);

