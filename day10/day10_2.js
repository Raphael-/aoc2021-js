const fs = require('fs');
const lines = fs.readFileSync('input.txt').toString()
	.trim()
	.split('\n')
const openingToClosing = {'[':']', '(':')', '{':'}', '<':'>'};
const scoreMapping = {')':1, ']':2, '}':3, '>':4};
const isOpening = ch => opening.has(ch);
const findMissingPart = (line) => {
	const stack = [];
	for (const ch of [...line]) {
		if(ch in openingToClosing) {
			stack.push(ch);
		}
		else if(openingToClosing[stack.pop()] !== ch) { 
			return '';
		}
	}
	return stack.reverse().map(ch => openingToClosing[ch]);
}
const score = lines.map(line => findMissingPart(line))
	.filter(missingPart => missingPart.length !== 0)
	.map(missingPart => missingPart.reduce((accumulator, current) => 5*accumulator + scoreMapping[current], 0))
	.sort((scoreA,scoreB) => scoreB - scoreA);
console.log(score[(score.length - 1)/2]);

