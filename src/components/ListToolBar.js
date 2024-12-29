import React from "react";
import "../styles/ListToolBar.css";

export default function ListToolBar({
  method,
  setMethod,
  color,
  setColor,
  value,
  setValue,
  index,
  setIndex,
  handleRun,
}) {
  const colors = [
    { name: "Pink", value: "linear-gradient(212.42deg, #FFB6C1 14.47%, #FF69B4 85.83%)" }, 
    { name: "Light Blue", value: "linear-gradient(212.42deg, #ADD8E6 14.47%, #4682B4 85.83%)" },
    { name: "Yellow", value: "linear-gradient(212.42deg, #FFD700 14.47%, #FFA500 85.83%)" },
    { name: "Green", value: "linear-gradient(212.42deg, #7EF3B4 14.47%, #56A078 85.83%)" },
    { name: "Orange", value: "linear-gradient(212.25deg, #F08E37 14.04%, #AB6628 85.8%)" },
  ];

  return (
    <div className="toolbar">
      <div className="toolbar-item">
        <label htmlFor="method">Method</label>
        <select
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          <option value="push">Push</option>
          <option value="pop">Pop</option>
          <option value="shift">Shift</option>
          <option value="unshift">Unshift</option>
          <option value="set">Set</option>
          <option value="insert">Insert</option>
          <option value="remove">Remove</option>
          <option value="reverse">Reverse</option>
        </select>
      </div>

      {(method === "push" || method === "unshift" || method === "set" || method === "insert") && (
        <div className="toolbar-item">
          <label htmlFor="color">Color</label>
          <div className="color-dropdown">
            <select
              id="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            >
              {colors.map((c) => (
                <option key={c.name} value={c.value}>
                  {c.name}
                </option>
              ))}
            </select>
            <div
              className="color-preview"
              style={{ background: color }}
            ></div>
          </div>
        </div>
      )}

      {(method === "push" || method === "unshift" || method === "set" || method === "insert") && (
        <div className="toolbar-item">
          <label htmlFor="value">Value</label>
          <input
            id="value"
            type="text"
            placeholder="Value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      )}

      {(method === "set" || method === "insert" || method === "remove") && (
        <div className="toolbar-item">
          <label htmlFor="index">Index #</label>
          <input
            id="index"
            type="number"
            placeholder="Index #"
            value={index}
            onChange={(e) => setIndex(e.target.value)}
          />
        </div>
      )}

      <div className="toolbar-item">
        <button onClick={handleRun}>Run</button>
      </div>
    </div>
  );
}
