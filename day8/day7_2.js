const fs = require('fs');
const line = fs.readFileSync('input.txt').toString().trim();
let crabsLocation = line.split(",").map(Number);
let minFuel = Number.MAX_SAFE_INTEGER;
const [min, max] = [crabsLocation.reduce((a,b) => a < b ? a : b), crabsLocation.reduce((a,b) => a > b ? a : b)];
const range = Array.from(new Array(max-min), (x, i) => i + min); 
for (const val of range) { 
	const fuelNeeded = crabsLocation.map(loc => Math.abs(val - loc)).reduce((a,b) => a + (b*(b+1)/2), 0);
	minFuel = minFuel > fuelNeeded ? fuelNeeded : minFuel;
}
console.log(`Min fuel needed ${minFuel}`);
