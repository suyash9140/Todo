import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./App.css"

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          console.log("Sending request:", { username, password });
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { username, password });
            console.log("Login successful:", res.data);
            localStorage.setItem("token", res.data.token); // Store token
            window.location.href = "/"; // Redirect to home
        } catch (error) {
          console.error("Login error:", error.response ? error.response.data : error.message);
          alert("Invalid credentials: " + (error.response?.data?.message || "Unknown error"));
        }
    };

    return (
      <div>
      <h2>Login</h2>
        <form onSubmit={handleLogin}>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Login</button>
        </form>
         
      <p>
      <a href="/forgot-password">Forgot Password?</a>
    </p>
  </div>
    );
}

export default Login;
