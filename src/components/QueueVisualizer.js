import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "../components/Header";
import QueueToolBar from "./QueueToolBar";
import QueueModel from "../models/QueueModel";
import "../styles/QueueVisualizer.css";

const initQueue = new QueueModel();

export default function QueueVisualizer() {
  const [queue, setQueue] = useState([]);
  const [value, setValue] = useState("");
  const [color, setColor] = useState("#7EF3B4");
  const [message, setMessage] = useState("Queue is empty.");
  const [frontValue, setFrontValue] = useState("Empty");
  const [lastEnqueued, setLastEnqueued] = useState("None");
  const [lastDequeued, setLastDequeued] = useState("None");
  const [size, setSize] = useState(0);

  useEffect(() => {
    updateQueue();
  }, []);

  const updateQueue = () => {
    const nodes = [];
    let current = initQueue.front;
    while (current) {
      nodes.push(current);
      current = current.next;
    }
    setQueue(nodes);
    setFrontValue(initQueue.front ? initQueue.front.value : "Empty");
    setSize(initQueue.length);
  };

  const handleRun = (method) => {
    switch (method) {
      case "enqueue":
        if (!value) {
          setMessage("Please enter a value before enqueuing.");
          return;
        }
        const enqueuedNode = initQueue.enqueue(value, color);
        setLastEnqueued(enqueuedNode.value);
        setMessage(`Item ${enqueuedNode.value} is enqueued.`);
        setValue("");
        break;

      case "dequeue":
        if (initQueue.isEmpty()) {
          setMessage("Cannot dequeue from an empty queue.");
          return;
        }
        const dequeuedNode = initQueue.dequeue();
        setLastDequeued(dequeuedNode.value);
        setMessage(`Item ${dequeuedNode.value} is dequeued.`);
        break;

      case "clear":
        initQueue.clear();
        setLastDequeued("None");
        setLastEnqueued("None");
        setMessage("Queue is cleared.");
        break;

      default:
        setMessage("Unknown operation.");
        return;
    }
    updateQueue();
  };

  return (
    <div className="QueueVisualizer">
      <Header />
      <h2 className="main-heading">Queue (FIFO - First In, First Out)</h2> {/* Main heading */}
      <QueueToolBar
        value={value}
        setValue={setValue}
        color={color}
        setColor={setColor}
        handleRun={handleRun}
      />
      <div className="queue-visualizer-layout">
        <div className="queue-container">
          <AnimatePresence>
            {queue.map((node, index) => (
              <motion.div
                key={index}
                className="queue-node"
                style={{ background: node.color }}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                {node.value}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="queue-status">
          <div>Front of the Queue: {frontValue}</div>
          <div>Last Enqueued Item: {lastEnqueued}</div>
          <div>Last Dequeued Item: {lastDequeued}</div>
          <div>Size of the Queue: {size}</div>
          <div className="queue-message-box">{message}</div>
        </div>
      </div>
    </div>
  );
}
