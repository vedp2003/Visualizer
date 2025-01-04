import React, { useState, useEffect,useCallback  } from "react";
import Header from "../Header";
import DijkstraNode from "./DijkstraNode";
import DijkstraToolbar from "./DijkstraToolbar";
import DijkstraLegend from "./DijkstraLegend";
import { dijkstra, getNodesInShortestPathOrder } from "../../models/DijkstraModel";
import "../../styles/DijkstraVisualizer.css";

let START_NODE_ROW = Math.floor(20 * 0.5); 
let START_NODE_COL = Math.floor(50 * 0.1); 
let FINISH_NODE_ROW = Math.floor(20 * 0.5); 
let FINISH_NODE_COL = Math.floor(50 * 0.7); 


export default function DijkstraGrid() {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [draggingNode, setDraggingNode] = useState(null);
  const [algorithmRunning, setAlgorithmRunning] = useState(false);
  const [weightMode, setWeightMode] = useState(false);
  const [weightValue, setWeightValue] = useState(1);
  const [gridSize, setGridSize] = useState({ rows: 20, cols: 50 });
  const [canVisualize, setCanVisualize] = useState(true);
  const [activeNode, setActiveNode] = useState(null); 

  const calculateGridSize = () => {
    const nodeSize = 32; 
    const padding = 100; 
    const rows = Math.max(Math.floor((window.innerHeight - padding) / nodeSize), 5);
    const cols = Math.max(Math.floor(window.innerWidth / nodeSize), 5);
    return { rows, cols };
  };

  const initializeGrid = useCallback(() => {
    const { rows, cols } = calculateGridSize();
  
    START_NODE_ROW = Math.min(Math.floor(rows * 0.5), rows - 1);
    START_NODE_COL = Math.min(Math.floor(cols * 0.1), cols - 1);
    FINISH_NODE_ROW = Math.min(Math.floor(rows * 0.5), rows - 1);
    FINISH_NODE_COL = Math.min(Math.floor(cols * 0.7), cols - 1);
  
    const initialGrid = createInitialGrid(rows, cols);
    setGridSize({ rows, cols });
    setGrid(initialGrid);
  }, []);

  useEffect(() => {
    initializeGrid(); 
    const handleResize = () => {
      initializeGrid(); 
    };
    window.addEventListener("resize", handleResize); 

    return () => {
      window.removeEventListener("resize", handleResize); 
    };
  }, [initializeGrid]);


  const handleMouseDown = (row, col) => {
    if (algorithmRunning) return;

    if (row === START_NODE_ROW && col === START_NODE_COL) {
      setDraggingNode("start");
      setActiveNode("start"); 
    } else if (row === FINISH_NODE_ROW && col === FINISH_NODE_COL) {
      setDraggingNode("finish");
      setActiveNode("finish");
    } else {
      if (weightMode) {
        const newGrid = toggleWeight(grid, row, col, weightValue);
        setGrid(newGrid);
      } else {
        const newGrid = toggleWall(grid, row, col);
        setGrid(newGrid);
      }
    }
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed || algorithmRunning) return;

    if (draggingNode === "start") {
      if (
        (row === FINISH_NODE_ROW && col === FINISH_NODE_COL) ||
        grid[row]?.[col]?.isWall ||
        grid[row]?.[col]?.weight > 1
      )
        return;

      START_NODE_ROW = row;
      START_NODE_COL = col;
      const newGrid = updateNode(grid, row, col, "start");
      setGrid(newGrid);
    } else if (draggingNode === "finish") {
      if (
        (row === START_NODE_ROW && col === START_NODE_COL) ||
        grid[row]?.[col]?.isWall ||
        grid[row]?.[col]?.weight > 1
      )
        return;

      FINISH_NODE_ROW = row;
      FINISH_NODE_COL = col;
      const newGrid = updateNode(grid, row, col, "finish");
      setGrid(newGrid);
    } else {
      if (weightMode) {
        const newGrid = toggleWeight(grid, row, col, weightValue);
        setGrid(newGrid);
      } else {
        const newGrid = toggleWall(grid, row, col);
        setGrid(newGrid);
      }
    }
  };

  const handleTapMove = (row, col) => {
    if (!activeNode || algorithmRunning) return; 
  
    if (activeNode === "start") {
      if (
        (row === FINISH_NODE_ROW && col === FINISH_NODE_COL) ||
        grid[row]?.[col]?.isWall ||
        grid[row]?.[col]?.weight > 1
      )
        return;
  
      START_NODE_ROW = row;
      START_NODE_COL = col;
      const newGrid = updateNode(grid, row, col, "start");
      setGrid(newGrid);
    } else if (activeNode === "finish") {
      if (
        (row === START_NODE_ROW && col === START_NODE_COL) ||
        grid[row]?.[col]?.isWall ||
        grid[row]?.[col]?.weight > 1
      )
        return;
  
      FINISH_NODE_ROW = row;
      FINISH_NODE_COL = col;
      const newGrid = updateNode(grid, row, col, "finish");
      setGrid(newGrid);
    }
  
    setActiveNode(null);
  };
  
  const handleMouseUp = () => {
    setMouseIsPressed(false);
    setDraggingNode(null);
  };

  const visualizeDijkstra = () => {
    if (!canVisualize) return;

    setAlgorithmRunning(true);
    setCanVisualize(false);

    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const { visitedNodesInOrder, pathFound } = dijkstra(grid, startNode, finishNode);

    if (!pathFound) {
      alert("No path found!");
      setAlgorithmRunning(false);
      setCanVisualize(true);
      return;
    }

    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    const startNodeRow = START_NODE_ROW;
    const startNodeCol = START_NODE_COL;
    const finishNodeRow = FINISH_NODE_ROW;
    const finishNodeCol = FINISH_NODE_COL;

    const startElement = document.getElementById(`node-${startNodeRow}-${startNodeCol}`);
    const finishElement = document.getElementById(`node-${finishNodeRow}-${finishNodeCol}`);

    if (startElement) startElement.classList.add("node-start-visualizing");
    if (finishElement) finishElement.classList.add("node-finish-visualizing");

    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);

          if (startElement) startElement.classList.remove("node-start-visualizing");
          if (finishElement) finishElement.classList.remove("node-finish-visualizing");

          setAlgorithmRunning(false);
        }, 10 * i);
        return;
      }

      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        if (
          (node.row === startNodeRow && node.col === startNodeCol) ||
          (node.row === finishNodeRow && node.col === finishNodeCol)
        ) {
          return;
        }
        document.getElementById(`node-${node.row}-${node.col}`).className = "node node-visited";
      }, 10 * i);
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        const element = document.getElementById(`node-${node.row}-${node.col}`);

        if (i === 0) {
          element.className = "node node-shortest-path start-marker";
        } else if (i === nodesInShortestPathOrder.length - 1) {
          element.className = "node node-shortest-path end-marker";
        } else {
          element.className = "node node-shortest-path";
        }
      }, 50 * i);
    }
  };

  const clearBoard = () => {
    
    const initialGrid = createInitialGrid(gridSize.rows, gridSize.cols);
    START_NODE_ROW = Math.min(gridSize.rows - 1, START_NODE_ROW);
  START_NODE_COL = Math.min(gridSize.cols - 1, START_NODE_COL);
  FINISH_NODE_ROW = Math.min(gridSize.rows - 1, FINISH_NODE_ROW);
  FINISH_NODE_COL = Math.min(gridSize.cols - 1, FINISH_NODE_COL);

    setGrid(initialGrid);

    setAlgorithmRunning(false);
    setCanVisualize(true);

    document.querySelectorAll(".node").forEach((node) => {
      node.className = "node";
    });

    const startElement = document.getElementById(`node-${START_NODE_ROW}-${START_NODE_COL}`);
    const finishElement = document.getElementById(`node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}`);
    if (startElement) startElement.classList.add("node-start");
    if (finishElement) finishElement.classList.add("node-finish");
  };

  const clearWalls = () => {
    if (algorithmRunning) return;
    const newGrid = grid.map((row) =>
      row.map((node) => ({ ...node, isWall: false }))
    );
    setGrid(newGrid);
  };

  const clearWeights = () => {
    if (algorithmRunning) return;
    const newGrid = grid.map((row) =>
      row.map((node) => ({ ...node, weight: 1 }))
    );
    setGrid(newGrid);
  };

  return (
    <div className="dijkstra-grid-container">
      <Header />
      <DijkstraToolbar
        visualizeDijkstra={visualizeDijkstra}
        clearBoard={clearBoard}
        clearWalls={clearWalls}
        weightMode={weightMode}
        setWeightMode={setWeightMode}
        setWeightValue={setWeightValue}
        clearWeights={clearWeights}
        algorithmRunning={algorithmRunning}
        canVisualize={canVisualize}
      />
      <DijkstraLegend />
      <div className="grid">
        {grid.map((row, rowIdx) => (
          <div key={rowIdx} className="row">
            {row.map((node, nodeIdx) => {
              const { row, col, isStart, isFinish, isWall, weight } = node;
              return (
                <DijkstraNode
                  key={nodeIdx}
                  row={row}
                  col={col}
                  isStart={isStart}
                  isFinish={isFinish}
                  isWall={isWall}
                  weight={weight}
                  onMouseDown={handleMouseDown}
                  onMouseEnter={handleMouseEnter}
                  onMouseUp={handleMouseUp}
                  onClick={handleTapMove} 
                  onTouchStart={handleTapMove} 
                  activeNode={activeNode} 
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

const createInitialGrid = (rows, cols) => {
  const grid = [];
  for (let row = 0; row < rows; row++) {
    const currentRow = [];
    for (let col = 0; col < cols; col++) {
      currentRow.push(createNode(row, col));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (row, col) => ({
  row,
  col,
  isStart: row === START_NODE_ROW && col === START_NODE_COL,
  isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
  distance: Infinity,
  isVisited: false,
  isWall: false,
  weight: 1,
  previousNode: null,
});

const toggleWall = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = { ...node, isWall: !node.isWall, weight: 1 };
  newGrid[row][col] = newNode;
  return newGrid;
};

const toggleWeight = (grid, row, col, weightValue) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = { ...node, weight: weightValue, isWall: false };
  newGrid[row][col] = newNode;
  return newGrid;
};

const updateNode = (grid, row, col, type) => {
  const newGrid = grid.map((row) =>
    row.map((node) => ({
      ...node,
      isStart: node.row === START_NODE_ROW && node.col === START_NODE_COL,
      isFinish: node.row === FINISH_NODE_ROW && node.col === FINISH_NODE_COL,
    }))
  );
  if (type === "start") newGrid[row][col].isStart = true;
  if (type === "finish") newGrid[row][col].isFinish = true;
  return newGrid;
};
