const fs = require('fs');
const originalLines = fs.readFileSync('input.txt').toString()
	.trim()
	.split('\n')
	.map(line => line.split(' | '));
const alphabeticallyOrderedSignalLines = originalLines
	.map(line => line
		.map(part => part.split(' ')
			.map(word => Array.from(word).sort().join(''))	//sort characters in a word
			.sort((a, b) => a.length - b.length).join(' ')));	//sort words in a part based on their length
const sum = alphabeticallyOrderedSignalLines.map((line, index) => {
	const signals = line[0].split(' ');

	const fiveSignalWords = signals.slice(3,6); //get all five signal words (=3,5,2), 3 is the one that has every signal of 1
	const threeWord = fiveSignalWords.find(word => [...signals[0]].every(signal => new Set(word).has(signal)));
	
	const sixSignalWords = signals.slice(6,9);

	const threeAndFourUniqueSignals = new Set(threeWord+signals[2]); //merge unique signals of 3 and four, nine should have all their signals
	const nineWord = sixSignalWords.find(word => [...word].every(signal => threeAndFourUniqueSignals.has(signal)));
	
	//6 is the signal that doesn't have all signals of one (both 0 and 9 have have all signals of 1)
	const sixWord = sixSignalWords.find(word => ![...signals[0]].every(signal => new Set(word).has(signal)));

	//remaining of six signal words is 0
	const zeroWord = sixSignalWords.find(word => word !== nineWord && word !== sixWord);

	//remove 3 from five signals. 9 has all signals of 5, 2 is missing one
	const fiveWord = fiveSignalWords.filter(word => word !== threeWord).find(word => [...word].filter(signal => !new Set(nineWord).has(signal)).length == 0);

	const twoWord = fiveSignalWords.find(word => word !== threeWord && word !== fiveWord)
	const mapping = {};
	
	mapping[zeroWord] = "0";
	mapping[signals[0]] = "1";
	mapping[twoWord] = "2";
	mapping[threeWord] = "3";
	mapping[signals[2]] = "4";
	mapping[fiveWord] = "5";
	mapping[sixWord] = "6";
	mapping[signals[1]] = "7";
	mapping[signals[9]] = "8";
	mapping[nineWord] = "9";
	const number = originalLines[index][1]	//match it to the original line (pre sort)
		.split(' ')
		.map(outputSignals => [...outputSignals].sort().join(''))
		.map(sortedSignal => mapping[sortedSignal])
		.map(decodedSignal => decodedSignal)
		.join('')	
	return parseInt(number);
}).reduce((a,b) => a +b, 0);
console.log(sum);
