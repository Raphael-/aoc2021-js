const fs = require('fs');
let previousValue = NaN;
let increaseCount = 0;
const array = fs.readFileSync('input.txt').toString()
	.split("\n")
	.forEach(line => {
		if(previousValue < parseInt(line)) {
			increaseCount++ 
		}
		previousValue = parseInt(line);
	})
console.log(increaseCount);

