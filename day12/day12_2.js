const fs = require('fs');
const edges = fs.readFileSync('input.txt').toString()
	.split('\n')
	.filter(line => line !== '')
console.log(edges);
const weight = {'start':-1, 'end':1} //start should always be first in an edge, end should be always last
const normalizedEdges =	edges.map(edge => edge.split('-').sort((a,b) => (weight[a] || 0) - (weight[b] || 0)));
const graph = {};
const isLowerCase = (str) => str === str.toLowerCase();
const isTerminal = (str) => str === 'end' || str === 'start';
const countSmallCaves = (nodes) => nodes.filter(node => isLowerCase(node) && !isTerminal(node)).reduce((acc,curr) => (acc[curr] = (acc[curr] || 0) + 1, acc), {});
const isAllowedToAdd = (smallCavesCount, toAdd) => (smallCavesCount[toAdd] || 0) == 0 || (smallCavesCount[toAdd] === 1 && Object.keys(smallCavesCount).filter(node => node !== toAdd).every(node => smallCavesCount[node] < 2));
const addEdge = (graph,edge) => {
	graph[edge[0]] ? graph[edge[0]].push(edge[1]) : graph[edge[0]] = [edge[1]];	
	if(edge[1] !== 'end' && edge[0] !== 'start') {
		graph[edge[1]] ? graph[edge[1]].push(edge[0]) : graph[edge[1]] = [edge[0]];
	}
}
const isPathValid = (path) => {
	const pathExcludingStartAndEnd = path.filter(vertex => vertex !== 'start' && vertex !== 'end');
	return path[path.length - 1] === 'end';
}
normalizedEdges.forEach(edge => {
	addEdge(graph,edge);
})
console.log(graph);
const nodes = ['start'];
const findPaths = (nodes, validPaths) => {
	if(isPathValid(nodes)) {
		validPaths.push([nodes.join(',')]);
		return;
	}
	const lastNode = nodes[nodes.length-1];
	const availableAdjacentNodes = (graph[lastNode] || []).filter(adjacent => adjacent !== undefined);
	availableAdjacentNodes
		.filter((node) => !isLowerCase(node) || isAllowedToAdd(countSmallCaves(nodes), node))
		.forEach(node => findPaths([...nodes].concat(node), validPaths));
	return;
}
const validPaths = []
findPaths(nodes, validPaths);
console.log(validPaths.sort());
console.log(validPaths.length);
