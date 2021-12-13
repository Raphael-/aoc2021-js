const fs = require('fs');
let previousTriadValue = NaN;
let increaseCount = 0;
const array = fs.readFileSync('input.txt').toString()
	.split("\n")
	.map(line => parseInt(line))
	.forEach((line,index,array) => {
		if(index + 3 > array.length) {
			return;
		}
		let currentTriadSum = array.slice(index, index + 3).reduce((a,b) => a +b , 0)
		if(currentTriadSum > previousTriadValue) {
			increaseCount++ 
		}
		previousTriadValue = currentTriadSum;
	})
console.log(increaseCount);

