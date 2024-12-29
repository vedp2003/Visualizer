import React from "react";
import "../styles/Node2.css";
import { motion } from "framer-motion";

export default function Node2({ value, prev, next, color }) {
  return (
    <motion.div
      className="node2"
      style={{ background: color }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
    >
      <p>{`Value: ${value}`}</p>
      <p>{`Prev: ${prev?.value || "null"}`}</p>
      <p>{`Next: ${next?.value || "null"}`}</p>
    </motion.div>
  );
}
