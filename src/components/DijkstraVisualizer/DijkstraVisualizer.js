import React from "react";
import DijkstraGrid from "./DijkstraGrid";
import "../../styles/DijkstraVisualizer.css";

export default function DijkstraVisualizer() {
  return (
    <div className="dijkstra-visualizer">
      <DijkstraGrid />
    </div>
  );
}
