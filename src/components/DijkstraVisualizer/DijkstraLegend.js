import React from "react";
import "../../styles/DijkstraLegend.css";

export default function DijkstraLegend() {
  return (
    <div className="legend-container">
      <div className="legend-item">
        <div className="legend-icon unvisited-node"></div>
        <span>Unvisited Node</span>
      </div>
      <div className="legend-item">
        <div className="legend-icon visited-node"></div>
        <span>Visited Node</span>
      </div>
      <div className="legend-item">
        <div className="legend-icon wall-node"></div>
        <span>Wall Node</span>
      </div>
      <div className="legend-item">
        <div className="legend-icon shortest-path-node"></div>
        <span>Shortest Path</span>
      </div>
      <div className="legend-item">
        <div className="legend-icon start-node"></div>
        <span>Start Node</span>
      </div>
      <div className="legend-item">
        <div className="legend-icon finish-node"></div>
        <span>Finish Node</span>
      </div>
      <div className="legend-item">
        <div className="legend-icon weight-node"></div>
        <span>Weighted Node</span>
      </div>
    </div>
  );
}
