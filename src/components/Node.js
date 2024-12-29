import React from "react";
import "../styles/Node.css";
import { motion } from "framer-motion";

export default function Node({ value, prev, next, color }) {
  return (
    <motion.div
      className="singly-node"
      style={{ background: color }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
    >
      <p>{`Value: ${value}`}</p>
      <p>{`Next: ${next?.value || "null"}`}</p>
    </motion.div>
  );
}
