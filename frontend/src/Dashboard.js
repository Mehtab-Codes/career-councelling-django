import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";
import { FaHome, FaBook, FaBriefcase, FaComments, FaSignOutAlt, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import profilePlaceholder from "./assets/Logo.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    // Fetch user profile
    fetch("http://127.0.0.1:8000/profile/", { credentials: "include" })
      .then(response => response.json())
      .then(data => {
        setUserData(data);

        // Fetch career recommendations dynamically based on user's skills & interests
        if (data.skills && data.interests) {
          fetch("http://127.0.0.1:8000/career_assessment/recommend/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              skills: data.skills,
              interests: data.interests
            }),
          })
            .then(response => response.json())
            .then(data => setRecommendations(data.recommendations || []))
            .catch(error => console.error("Error fetching recommendations:", error));
        }
      })
      .catch(error => console.error("Error fetching profile:", error));
  }, []);

  const handleLogout = () => {
    fetch("http://127.0.0.1:8000/auth/logout/", { method: "POST", credentials: "include" })
      .then(() => {
        console.log("User logged out");
        navigate("/login");
      })
      .catch(error => console.error("Logout error:", error));
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation */}
      <div className="sidebar">
        <h2 className="sidebar-title">Dashboard</h2>
        <ul>
          <li><button className="sidebar-btn" onClick={() => navigate("/")}> <FaHome /> Home </button></li>
          <li><button className="sidebar-btn" onClick={() => navigate("/courses")}> <FaBook /> Courses </button></li>
          <li><button className="sidebar-btn" onClick={() => navigate("/jobs")}> <FaBriefcase /> Jobs </button></li>
          <li><button className="sidebar-btn" onClick={() => navigate("/forum")}> <FaComments /> Forum </button></li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Top Navigation Bar */}
        <nav className="navbar">
          <FaBars className="menu-icon" />
          <h3 className="navbar-title">Career Counseling</h3>
          <div className="profile-section">
            <img 
              src="/profile-icon.png" 
              alt="Profile" 
              className="profile-icon" 
              onError={(e) => { e.target.onerror = null; e.target.src = profilePlaceholder; }} 
            />
            <button className="logout-btn" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </nav>

        {/* Dashboard Content */}
        <div className="content">
          <h1>Welcome to Your Dashboard</h1>
          {userData && <h2>Hello, {userData.name}</h2>}
          <p>Explore career opportunities, courses, and community discussions.</p>

          {/* Career Recommendations */}
          <h3>Career Recommendations</h3>
          {recommendations.length > 0 ? (
            <ul>
              {recommendations.map((rec, index) => (
                <li key={index}>
                  {rec} {/* Assuming API returns a list of career names */}
                </li>
              ))}
            </ul>
          ) : (
            <p>No recommendations available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
