import Node from "./Node";
import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import ListToolBar from "./ListToolBar";
import List from "../models/ListModel";
import "../styles/SingleLinkList.css";

const initList = new List();
initList.push("Node 1", "linear-gradient(212.42deg, #FFB6C1 14.47%, #FF69B4 85.83%)");
initList.push("Node 2", "linear-gradient(212.42deg, #ADD8E6 14.47%, #4682B4 85.83%)"); 
initList.push("Node 3", "linear-gradient(212.42deg, #FFD700 14.47%, #FFA500 85.83%)");

export default function SingleLinkList() {
  const [list, setList] = useState([]); 
  const [method, setMethod] = useState("push"); 
  const [value, setValue] = useState("");
  const [color, setColor] = useState("linear-gradient(212.42deg, #7EF3B4 14.47%, #56A078 85.83%)"); 
  const [index, setIndex] = useState(""); 

  useEffect(() => {
    updateList();
  }, []);

  // Updates the displayed list by converting linked list to an array
  const updateList = () => {
    const nodes = [];
    let current = initList.head;
    while (current) {
      nodes.push(current);
      current = current.next;
    }
    setList(nodes);
  };

  // Handles operations based on the selected method
  const handleRun = () => {
    // Common edge case checks
    if ((method === "push" || method === "unshift" || method === "set" || method === "insert") && !value) {
      alert("Please enter a value before running the operation.");
      return;
    }

    if ((method === "set" || method === "insert" || method === "remove") && (!index || isNaN(parseInt(index, 10)))) {
      alert("Please enter a valid index before running the operation.");
      return;
    }

    // Specific checks for methods
    switch (method) {
      case "push":
        initList.push(value, color);
        break;

      case "unshift":
        initList.unshift(value, color);
        break;

      case "pop":
        if (initList.length === 0) {
          alert("Cannot pop from an empty list.");
          return;
        }
        initList.pop();
        break;

      case "shift":
        if (initList.length === 0) {
          alert("Cannot shift from an empty list.");
          return;
        }
        initList.shift();
        break;

      case "set":
        if (initList.length === 0) {
            alert("Cannot set a value in an empty list.");
            return;
        }
        if (index < 0 || index >= initList.length) {
          alert("Index out of bounds. Please enter a valid index.");
          return;
        }
        initList.set(value, color, parseInt(index, 10));
        break;

      case "insert":
        if (initList.length === 0 && index !== "0") {
            alert("Cannot insert into an empty list except at index 0.");
            return;
        }
        if (index < 0 || index > initList.length) {
          alert("Index out of bounds. Please enter a valid index.");
          return;
        }
        initList.insert(value, color, parseInt(index, 10));
        break;

      case "remove":
        if (initList.length === 0) {
          alert("Cannot remove from an empty list.");
          return;
        }
        if (index < 0 || index >= initList.length) {
          alert("Index out of bounds. Please enter a valid index.");
          return;
        }
        initList.remove(parseInt(index, 10));
        break;

      case "reverse":
        if (initList.length === 0) {
          alert("Cannot reverse an empty list.");
          return;
        }
        initList.reverse();
        break;

      default:
        alert("Error! Unknown operation. Please select a valid method.");
        return;
    }

    updateList();
  };

  return (
    <div className="SingleLinkList">
      <Header /> {/* Add Header Component */}
      <ListToolBar
        method={method}
        setMethod={setMethod}
        color={color}
        setColor={setColor}
        value={value}
        setValue={setValue}
        index={index}
        setIndex={setIndex}
        handleRun={handleRun}
      />
      <h2 className="SingleLinkList-header">Singly Linked List</h2>
      <div className="visualizer">
        <AnimatePresence>
          {list.map((node, index) => (
            <Node
              key={index}
              value={node.value}
              next={node.next}
              color={node.color}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
