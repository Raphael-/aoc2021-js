const fs = require('fs');
const line = fs.readFileSync('input.txt').toString().trim();
let crabsLocation = line.split(",").map(Number);
let minFuel = Number.MAX_SAFE_INTEGER;
console.log(crabsLocation);
for (const [index, val] of crabsLocation.entries()) {
	const fuelNeeded = crabsLocation.map(loc => Math.abs(val - loc)).reduce((a,b) => a + b, 0);
	//console.log(`Distance to ${val} pos ${index}: ${fuelNeeded} ${crabsLocation.map(loc => Math.abs(val - loc))}`);
	minFuel = minFuel > fuelNeeded ? fuelNeeded : minFuel;
}
console.log(minFuel);
