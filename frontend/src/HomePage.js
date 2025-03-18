import "./HomePage.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import sampleImage from "./assets/Logo.png"; // Ensure the image path is correct
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate(); // Add this line

  return (
    <div className="home-container">
      <div className="content-box">
        <img src={sampleImage} alt="Welcome" className="welcome-image" />
        <h1>Welcome to Career Counseling AI</h1>
        <p>Your personalized guide to finding the right career path.</p>

        <div className="button-group">
          <button className="gradient-button" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="gradient-button" onClick={() => navigate("/register")}>
            Register
          </button>
        </div>

        <button className="gradient-button bottom-button">Ask AI?</button>
      </div>
    </div>
  );
};

export default HomePage;
