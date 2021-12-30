const fs = require('fs');
const lines = fs.readFileSync('input.txt').toString()
	.trim()
	.split('\n')
const openingToClosing = {'[':']', '(':')', '{':'}', '<':'>'};
const scoreMapping = {')':3, ']':57, '}':1197, '>':25137};
const isOpening = ch => opening.has(ch);
const findInvalidChar = (line) => {
	const stack = [];
	for (const ch of [...line]) {
		if(ch in openingToClosing) {
			stack.push(ch);
		}
		else if(openingToClosing[stack.pop()] !== ch) {
			return ch;
		}
	}
	return -1;
}
const score = lines.map(line => findInvalidChar(line))
	.filter(invalidChar => invalidChar !== -1)
	.reduce((accumulator,invalidChar) => scoreMapping[invalidChar] + accumulator, 0)
console.log(score)

