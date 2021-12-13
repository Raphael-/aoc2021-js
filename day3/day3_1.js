const fs = require('fs');
const binaryArray = fs.readFileSync('input.txt').toString()
	.split("\n")
	.filter(line => line.length != 0)
	.map(line => [...line].map(character => parseInt(character)))
const sumAllArrays = binaryArray.reduce((a, b) => a.map((c, i) => c + b[i]));
const gamma = sumAllArrays.map(columnSum => columnSum > Math.floor(binaryArray.length / 2) ? 1 : 0);
const epsilon = gamma.map(gammaElement => 1 - gammaElement);
const toDecimal = (bitArray) => parseInt(bitArray.join(''), 2);
console.log(toDecimal(gamma), toDecimal(epsilon));
console.log(toDecimal(gamma) * toDecimal(epsilon));
