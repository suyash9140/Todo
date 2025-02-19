import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./App.css"

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");  // Added email field
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, { 
                username, 
                email,  // Include email in the request
                password 
            });
            

            alert("Registration successful! Please log in.");
            navigate("/login");
        } catch (error) {
            console.error("Registration error:", error.response ? error.response.data : error.message);
            alert("Error registering user: " + (error.response?.data?.message || "Unknown error"));
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Register</button>
        </form>
    );
}

export default Register;
