import React from "react";
import "../../styles/DijkstraNode.css";

export default function DijkstraNode({
  row,
  col,
  isStart,
  isFinish,
  isWall,
  weight,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
  onClick, 
  onTouchStart, 
  activeNode,
}) {
  const extraClassName = isStart
    ? `node-start ${activeNode === "start" ? "node-active" : ""}` // Highlight active start node
    : isFinish
    ? `node-finish ${activeNode === "finish" ? "node-active" : ""}` // Highlight active finish node
    : isWall
    ? "node-wall"
    : weight > 1
    ? "node-weighted"
    : "";

  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
      onClick={() => onClick(row, col)} // Added for mobile tap
      onTouchStart={() => onTouchStart(row, col)} // Added for mobile touch support
    >
      {weight > 1 && <span className="weight-label">{weight}</span>}
    </div>
  );
}
