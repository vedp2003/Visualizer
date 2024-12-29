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
}) {
  const extraClassName = isStart
    ? "node-start"
    : isFinish
    ? "node-finish"
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
    >
      {weight > 1 && <span className="weight-label">{weight}</span>}
    </div>
  );
}
