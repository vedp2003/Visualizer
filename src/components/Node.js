import "../styles/Node.css";
import React from "react";
import { motion } from "framer-motion";

export default function Node({ value, next, color }) {
  return (
    <motion.div
      className="node"
      style={{ background: color }}
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
    >
      <p>{`Value: ${value}`}</p>
      <p>{`Next: ${next?.value || "null"}`}</p>
    </motion.div>
  );
}
