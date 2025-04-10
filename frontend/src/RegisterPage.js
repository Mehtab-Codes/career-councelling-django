import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios to handle HTTP responses
import "bootstrap/dist/css/bootstrap.min.css";
import "./Auth.css";

const RegisterPage = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    education: "",
    skills: "",
    interests: "",
    careerGoals: "",
    userType: "",
    password: "",
    confirmPassword: "", // State for confirm password
  });

  const [error, setError] = useState(""); // State to store error messages
  const navigate = useNavigate(); // Hook for navigation

  // Handle input changes and update state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); // Reset any previous error message

    // Password validation check
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      // Sending registration request to the backend
      const response = await axios.post("http://127.0.0.1:8000/auth/register/", formData);
      if (response.status === 201) {
        navigate("/login"); // Redirect to login on success
      }
    } catch (err) {
      setError("Registration failed. Try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Register</h2>
        {error && <p className="error-message">{error}</p>} {/* Display error message */}

        {/* Registration form */}
        <form onSubmit={handleRegister}>
          <div className="form-row">
            {/* First Column */}
            <div className="form-group flex-item">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            {/* Second Column */}
            <div className="form-group flex-item">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            {/* First Column */}
            <div className="form-group flex-item">
              <label>Educational Background</label>
              <input
                type="text"
                className="form-control"
                name="education"
                value={formData.education}
                onChange={handleChange}
                required
              />
            </div>
            {/* Second Column */}
            <div className="form-group flex-item">
              <label>Skills</label>
              <input
                type="text"
                className="form-control"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            {/* First Column */}
            <div className="form-group flex-item">
              <label>Interests</label>
              <input
                type="text"
                className="form-control"
                name="interests"
                value={formData.interests}
                onChange={handleChange}
                required
              />
            </div>
            {/* Second Column */}
            <div className="form-group flex-item">
              <label>Career Goals</label>
              <input
                type="text"
                className="form-control"
                name="careerGoals"
                value={formData.careerGoals}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group">

          <label>User Type</label>
          <select
            className="form-control" name="userType" value={formData.userType} onChange={handleChange}
            required
          >
            <option value="">Select User Type</option>
            <option value="student">Student</option>
            <option value="professional">Professional</option>
            <option value="counselor">Counselor</option>
          </select>
        </div>

        <div className="row">
  <div className="col-md-6">
    <label>Password</label>
    <input
      type="password"
      className="form-control password-input"
      name="password"
      value={formData.password}
      onChange={handleChange}
      required
    />
  </div>
  <div className="col-md-6">
    <label>Confirm Password</label>
    <input
      type="password"
      className="form-control password-input"
      name="confirmPassword"
      value={formData.confirmPassword}
      onChange={handleChange}
      required
    />
  </div>
</div>
          
          <div className= "d-flex justify-content-center">
            
          <button type="submit" className="btn btn-success w-50 auth-button">
            Register
          </button>
          </div>
        </form>

        <p className="mt-3">
          Already have an account?{" "}
          <span className="link" onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
