import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SingleLinkList from "./components/SingleLinkList";
import "./App.css";
import DoubleLinkList from "./components/DoubleLinkList";
import StackVisualizer from "./components/StackVisualizer";
import QueueVisualizer from "./components/QueueVisualizer";
import DijkstraVisualizer from "./components/DijkstraVisualizer/DijkstraGrid";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/singly-linked-list" element={<SingleLinkList />} />
          <Route path="/doubly-linked-list" element={<DoubleLinkList />} />
          <Route path="/stack-visualizer" element={<StackVisualizer />} /> 
          <Route path="/queue-visualizer" element={<QueueVisualizer />} />
          <Route path="/dijkstra-visualizer" element={<DijkstraVisualizer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
