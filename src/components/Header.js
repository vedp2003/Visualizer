import React from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import for routing
import "../styles/Header.css"; // Import styles for the header
import logo from "../logo.png";

function Header() {
  const location = useLocation(); // Get the current location
  const navigate = useNavigate(); // Hook to navigate between routes

  const isHome = location.pathname === "/"; // Check if the current page is Home

  return (
    <header className="header">
      <div className={`header-content ${isHome ? "center" : ""}`}>
        <div className="logo">
          <img src={logo} alt="Logo" className="logo-image" />
        </div>
        <div className="title-container">
          <h1 className="title">THE VISUALIZER - Learn The Right Way</h1>
          <span className="created-by">Created by Ved</span>
        </div>
        {!isHome && ( // Conditionally render the back button only on non-home pages
          <button className="back-button" onClick={() => navigate("/")}>
            Back to Home
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
