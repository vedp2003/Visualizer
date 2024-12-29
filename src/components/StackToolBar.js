import React from "react";
import "../styles/StackToolBar.css";

export default function StackToolBar({
  value,
  setValue,
  color,
  setColor,
  handleRun,
}) {
  return (
    <div className="stack-toolbar">
      <div className="stack-toolbar-row">
        <label>Value:</label>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter value"
        />
        <label>Color:</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
      <div className="stack-toolbar-buttons">
        <button onClick={() => handleRun("push")}>Push</button>
        <button onClick={() => handleRun("pop")}>Pop</button>
        <button onClick={() => handleRun("clear")}>Clear</button>
      </div>
    </div>
  );
}
