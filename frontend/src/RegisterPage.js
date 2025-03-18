import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import "bootstrap/dist/css/bootstrap.min.css";
import "./Auth.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    education: "",
    skills: "",
    interests: "",
    careerGoals: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
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
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Educational Background</label>
            <input type="text" className="form-control" name="education" value={formData.education} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Skills</label>
            <input type="text" className="form-control" name="skills" value={formData.skills} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Interests</label>
            <input type="text" className="form-control" name="interests" value={formData.interests} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Career Goals</label>
            <input type="text" className="form-control" name="careerGoals" value={formData.careerGoals} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-success w-100 auth-button">Register</button>
        </form>
        <p className="mt-3">Already have an account? <span className="link" onClick={() => navigate("/login")}>Login</span></p>
      </div>
    </div>
  );
};

export default RegisterPage;
