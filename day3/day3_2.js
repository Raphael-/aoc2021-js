const fs = require('fs');
const binaryArray = fs.readFileSync('input.txt').toString()
	.split("\n")
	.filter(line => line.length != 0)
	.map(line => [...line].map(character => parseInt(character)))
const is1Majority = (sum, totalElements) => sum >= totalElements / 2 ;
const getMajority = (sum, totalElements) => sum >= totalElements / 2 ? 1 : 0;
const getMinority = (sum, totalElements) => sum >= totalElements / 2 ? 0 : 1;
const filter = (array, totalColumns, filterFunction) => {
	for(let i = 0; i < totalColumns; i++) {
		let columnSlice = array.map(array => array[i]);
		let totalOnes = columnSlice.reduce((a, b) => a + b, 0);
		array = array.filter(array => array[i] == filterFunction(totalOnes, columnSlice.length)); 
		if(array.length == 1) {
			break;
		}
	}
	return array;
}
const toDecimal = (bitArray) => parseInt(bitArray.join(''), 2);
const oxygenRating = filter(binaryArray, binaryArray[0].length, getMajority)
const co2Scrubber = filter(binaryArray, binaryArray[0].length, getMinority)
console.log(toDecimal(oxygenRating[0]), toDecimal(co2Scrubber[0]), toDecimal(oxygenRating[0]) * toDecimal(co2Scrubber[0]));
