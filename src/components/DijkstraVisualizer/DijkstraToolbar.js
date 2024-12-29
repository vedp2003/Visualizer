import React, { useState } from "react";
import "../../styles/DijkstraToolbar.css";

export default function DijkstraToolbar({
  visualizeDijkstra,
  clearBoard,
  clearWalls,
  weightMode,
  setWeightMode,
  setWeightValue,
  clearWeights,
}) {
  const [weightInput, setWeightInput] = useState(""); 

  const handleWeightChange = (e) => {
    const value = e.target.value; // Allow any input temporarily
    setWeightInput(value); // Update the spinner value for display

    const numericValue = parseInt(value, 10); // Convert to number
    if (!isNaN(numericValue) && numericValue >= 2) {
      // Update the weight value only if valid
      setWeightValue(numericValue);
    }
  };

  const handleBlur = () => {
    // Validate the input when focus leaves the input field
    const numericValue = parseInt(weightInput, 10);
    if (isNaN(numericValue) || numericValue < 2) {
      // If invalid or less than 2, reset to 2
      setWeightInput(2);
      setWeightValue(2);
    }
  };

  const toggleWeightMode = () => {
    setWeightMode((prevMode) => !prevMode);
  };

  return (
    <div className="toolbar">
      <button onClick={visualizeDijkstra}>Visualize Dijkstra</button>
      <button onClick={clearBoard}>Clear Board</button>
      <button onClick={clearWalls}>Clear Walls</button>
      <button onClick={clearWeights}>Clear Weights</button> 
      <div className="weight-input-container">
        <label htmlFor="weight-input">Weight:</label>
        <input
          id="weight-input"
          type="number"
          value={weightInput}
          onChange={handleWeightChange} // Update as user types
          onBlur={handleBlur} // Enforce minimum on blur
          placeholder="Enter weight"
        />
        <button onClick={toggleWeightMode}>
          {weightMode ? "Disable Weight Mode" : "Enable Weight Mode"}
        </button>
      </div>
    </div>
  );
}
