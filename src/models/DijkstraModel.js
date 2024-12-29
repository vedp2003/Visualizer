export const dijkstra = (grid, startNode, finishNode) => {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);
  
    while (!!unvisitedNodes.length) {
      sortNodesByDistance(unvisitedNodes);
      const closestNode = unvisitedNodes.shift();
  
      if (closestNode.isWall) continue; // Skip walls
      if (closestNode.distance === Infinity) return visitedNodesInOrder;
  
      closestNode.isVisited = true;
      visitedNodesInOrder.push(closestNode);
  
      if (closestNode === finishNode) return visitedNodesInOrder;
  
      updateUnvisitedNeighbors(closestNode, grid);
    }
  };
  
  const sortNodesByDistance = (unvisitedNodes) => {
    unvisitedNodes.sort((a, b) => a.distance - b.distance);
  };
  
  const updateUnvisitedNeighbors = (node, grid) => {
    const neighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of neighbors) {
      neighbor.distance = node.distance + neighbor.weight; // Incorporate weight
      neighbor.previousNode = node;
    }
  };
  
  const getUnvisitedNeighbors = (node, grid) => {
    const neighbors = [];
    const { row, col } = node;
  
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  
    return neighbors.filter((neighbor) => !neighbor.isVisited);
  };
  
  const getAllNodes = (grid) => {
    const nodes = [];
    for (const row of grid) {
      for (const node of row) {
        nodes.push(node);
      }
    }
    return nodes;
  };
  
  export const getNodesInShortestPathOrder = (finishNode) => {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
  
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
  
    return nodesInShortestPathOrder;
  };
  