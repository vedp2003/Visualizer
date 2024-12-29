import React from "react";
import "../styles/QueueToolBar.css";

export default function QueueToolBar({ value, setValue, color, setColor, handleRun }) {
  return (
    <div className="queue-toolbar">
      <div className="queue-toolbar-row">
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
      <div className="queue-toolbar-buttons">
        <button onClick={() => handleRun("enqueue")}>Enqueue</button>
        <button onClick={() => handleRun("dequeue")}>Dequeue</button>
        <button onClick={() => handleRun("clear")}>Clear</button>
      </div>
    </div>
  );
}
