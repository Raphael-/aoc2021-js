const fs = require('fs');
let depth = horizontal = 0;
const array = fs.readFileSync('input.txt').toString()
	.split("\n")
	.forEach(line => {
		let movement = line.split(" ")
		switch(movement[0]) {
			case 'forward':
				horizontal += parseInt(movement[1]);
				break;
			case 'down':
				depth += parseInt(movement[1])
				break;
			case 'up':
				depth -= parseInt(movement[1])
				break;
		}
	})
console.log(depth * horizontal);

