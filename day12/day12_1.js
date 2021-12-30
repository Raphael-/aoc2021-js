const fs = require('fs');
const edges = fs.readFileSync('input.txt').toString()
	.split('\n')
	.filter(line => line !== '')
console.log(edges);
const weight = {'start':-1, 'end':1} //start should always be first in an edge, end should be always last
const normalizedEdges =	edges.map(edge => edge.split('-').sort((a,b) => (weight[a] || 0) - (weight[b] || 0)));
const graph = {};
const isLowerCase = (str) => str === str.toLowerCase();
const addEdge = (graph,edge) => {
	graph[edge[0]] ? graph[edge[0]].push(edge[1]) : graph[edge[0]] = [edge[1]];	
	if(edge[1] !== 'end' && edge[0] !== 'start') {
		graph[edge[1]] ? graph[edge[1]].push(edge[0]) : graph[edge[1]] = [edge[0]];
	}
}
normalizedEdges.forEach(edge => {
	addEdge(graph,edge);
})
const isPathValid = (path) => {
	const pathExcludingStartAndEnd = path.filter(vertex => vertex !== 'start' && vertex !== 'end');
	return path[path.length - 1] === 'end';
}
console.log(graph);
const nodes = ['start'];
const findPaths = (nodes, validPaths) => {
	if(isPathValid(nodes)) {
		validPaths.push([nodes.join(',')]);
		return;
	}
	const lastNode = nodes[nodes.length-1];
	const availableAdjacentNodes = (graph[lastNode] || []).filter(adjacent => adjacent !== undefined);
	availableAdjacentNodes.filter(node => !isLowerCase(node) || !nodes.includes(node)).forEach(node => findPaths([...nodes].concat(node), validPaths));
	return;
}
const validPaths = []
findPaths(nodes, validPaths);
console.log(validPaths.length);

