const fs = require('fs');
const lines = fs.readFileSync('input.txt').toString()
	.split("\n")
	.filter(line => line.length != 0);
const order = lines[0].split(",").map(number => parseInt(number));
const boardDimension = 5;
let boards = lines.slice(1)
	.map(line => line.split(" ")
			.filter(element => element.length != 0)
			.map(element => parseInt(element)))
			.reduce((resultArray, item, index) => {
	  			const chunkIndex = Math.floor(index/boardDimension)
	  			if(!resultArray[chunkIndex]) {
	    				resultArray[chunkIndex] = [] 
	  			}
	 			resultArray[chunkIndex].push(item)
	  			return resultArray
			}, []); //split to 5
const isBoardWin = (board,numbers) => board.findIndex(dimension => dimension.every(num => numbers.has(num))) !== -1;
let lastCalledNumIndex, lastBoardWon;
for (let [orderIndex, callNumber] of order.entries()) {
	const numbers = new Set(order.slice(0, orderIndex + 1));
	lastCalledNum = callNumber;
	for (let i = boards.length - 1; i >= 0; i--) {
		let board = boards[i];
		let transposedColumns = board[0].map((col, i) => board.map(row => row[i]));
		if(isBoardWin(board,numbers) || isBoardWin(transposedColumns,numbers)) {
			lastBoardWon = board;
			lastCalledNumIndex = orderIndex;
			boards.splice(i,1);
		}
	}       
}
const numbers = new Set(order.slice(0, lastCalledNumIndex + 1));
const sumOfUnmarked = [].concat(...lastBoardWon)
	.filter(num => !numbers.has(num))
	.reduce((a,b) => a + b, 0);
console.log(sumOfUnmarked * order[lastCalledNumIndex]); 
