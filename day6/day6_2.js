const fs = require('fs');
const line = fs.readFileSync('input.txt').toString().trim();
let fishes = line.split(",").map(Number);
const days = 256;
const daysRange = Array.from({length: days}, (x, i) => i + 1);
const ages = Array.from({length: 9}, (x,i) => fishes.filter(fishTimer => i === fishTimer).length)
for (const day of daysRange) {
	const fishesWithZeroTime = ages.shift();
	ages.push(fishesWithZeroTime);
	ages[6] += fishesWithZeroTime;
}
console.log(ages.reduce((a,b) => a + b,0));
