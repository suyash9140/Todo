import React, { useState } from "react";
import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import "./App.css"
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword"; // Import Forgot Password Page
import ResetPassword from "./ResetPassword"; // Import Reset Password Page

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };
  

  return (
    
    <Router>
      <div className="title">
        ToDo
      </div>
      <nav>
        <Link to="/">Home</Link>
        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}
      </nav>
     <div className="container">
      <Routes>
        <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />  {/* Add Forgot Password Route */}
        <Route path="/reset-password/:token" element={<ResetPassword />} /> {/* Add Reset Password Route */}
      </Routes>
      </div>
    </Router>
  );
}


export default App;
