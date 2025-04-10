import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Auth.css"; // Import styling

const LoginPage = () => {
    // State variables for email & password input fields
    const [email, setEmail] = useState ("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Hook for navigation

    // Function to handle login form submission
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form reload

        try {
            // Sending login request to backend
            const response = await fetch("http://127.0.0.1:8000/auth/login/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json(); // Get response data

            if (response.ok) {
                alert("Login Successful!"); // Show success message

                // Store user data in local storage
                localStorage.setItem("user", JSON.stringify(data.user));

                // Redirect to dashboard
                navigate("/dashboard");
            } else {
                alert(data.error); // Show error message
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2 className="auth-title">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 auth-button">
                        Login
                    </button>
                </form>
                <p className="mt-3">
                    Don't have an account?{" "}
                    <span className="link" onClick={() => navigate("/register")}>
                        Register
                    </span>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
