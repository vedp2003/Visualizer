import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "../components/Header";
import StackToolBar from "./StackToolBar";
import StackModel from "../models/StackModel";
import "../styles/StackVisualizer.css";

const initStack = new StackModel();

export default function StackVisualizer() {
  const [stack, setStack] = useState([]);
  const [value, setValue] = useState("");
  const [color, setColor] = useState("#7EF3B4");
  const [message, setMessage] = useState("Stack is empty.");
  const [topValue, setTopValue] = useState("Empty");
  const [lastPushed, setLastPushed] = useState("None");
  const [lastPopped, setLastPopped] = useState("None");
  const [size, setSize] = useState(0);

  useEffect(() => {
    updateStack();
  }, []);

  const updateStack = () => {
    const nodes = [];
    let current = initStack.top;
    while (current) {
      nodes.unshift(current);
      current = current.next;
    }
    setStack(nodes);
    setTopValue(initStack.top ? initStack.top.value : "Empty");
    setSize(initStack.length);
  };

  const handleRun = (method) => {
    switch (method) {
      case "push":
        if (!value) {
          setMessage("Please enter a value before pushing.");
          return;
        }
        const pushedNode = initStack.push(value, color);
        setLastPushed(pushedNode.value);
        setMessage(`Item ${pushedNode.value} is pushed.`);
        setValue("");
        break;

      case "pop":
        if (initStack.isEmpty()) {
          setMessage("Cannot pop from an empty stack.");
          return;
        }
        const poppedNode = initStack.pop();
        setLastPopped(poppedNode.value);
        setMessage(`Item ${poppedNode.value} is popped.`);
        break;

      case "clear":
        initStack.clear();
        setLastPopped("None");
        setLastPushed("None");
        setMessage("Stack is cleared.");
        break;

      default:
        setMessage("Unknown operation.");
        return;
    }
    updateStack();
  };

  return (
    <div className="StackVisualizer">
      <Header />
      <h2 className="main-heading">Stack (LIFO - Last In, First Out)</h2> {/* Main heading */}
      <StackToolBar
        value={value}
        setValue={setValue}
        color={color}
        setColor={setColor}
        handleRun={handleRun}
      />
      <div className="stack-visualizer-layout">
        <div className="stack-container">
          <AnimatePresence>
            {stack.map((node, index) => (
              <motion.div
                key={index}
                className="stack-node"
                style={{ background: node.color }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
              >
                {node.value}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="stack-status">
          <div>Top of the Stack: {topValue}</div>
          <div>Last Pushed Item: {lastPushed}</div>
          <div>Last Popped Item: {lastPopped}</div>
          <div>Size of the Stack: {size}</div>
          <div className="stack-message-box">{message}</div>
        </div>
      </div>
    </div>
  );
}
