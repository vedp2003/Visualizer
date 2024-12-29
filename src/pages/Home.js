import React from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import "../styles/Home.css";

export default function Home() {
  return (
    <div className="home">
      <Header /> {/* Add Header */}
      <header>
        <h1>Algorithm and Data Structure Visualizer</h1>
        <p>Explore, learn, and visualize data structures and algorithms!</p>
      </header>
      <section className="categories">
        <div className="category">
          <h2>Data Structures</h2>
          <div className="buttons">
            <Link to="/singly-linked-list">
              <button>Singly Linked List</button>
            </Link>
            <Link to="/doubly-linked-list">
              <button>Doubly Linked List</button>
            </Link>
            <Link to="/stack-visualizer">
              <button>Stacks</button>
            </Link>
            <Link to="/queue-visualizer">
              <button>Queues</button>
            </Link>
          </div>
        </div>
        <div className="category">
          <h2>Algorithms</h2>
          <div className="buttons">
          <Link to="/dijkstra-visualizer">
              <button>Dijkstra Algorithm</button>
            </Link>
            {/* Add buttons for algorithm visualizers in the future */}
          </div>
        </div>
      </section>
      <footer>
        <p>&copy; 2024 The Visualizer. All rights reserved.</p>
      </footer>
    </div>
  );
}
