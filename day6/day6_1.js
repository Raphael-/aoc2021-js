const fs = require('fs');
const line = fs.readFileSync('test.txt').toString().trim();
let fishes = line.split(",").map(Number);
const days = 20;
const daysRange = Array.from({length: days}, (x, i) => i + 1);
for (const day of daysRange) {
	fishes = fishes.map(lanternfish => lanternfish -1)
		.reduce((arr, fish) => (fish < 0 ? arr.push(6,8) : arr.push(fish), arr), []);
	console.log(`Day ${day}: ${fishes}`);
}
console.log(initial.length)
