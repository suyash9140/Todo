const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/users"); // User model
require("dotenv").config();
const nodemailer = require("nodemailer");

const router = express.Router();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === "true", // Convert string to boolean
  auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
  },
});



// Register a new user
router.post("/register", async (req, res) => {
  try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
          return res.status(400).json({ message: "All fields are required" });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: "Email already exists" });
      }

      
      const newUser = new User({ username, email, password });
      await newUser.save();

      res.json({ message: "User registered successfully" });
  } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: "Error registering user", error });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
      console.log("Incoming Login Request Body:", req.body); // Debugging

      const { username, password } = req.body;

      if (!username || !password) {
          console.log("Missing fields in login");  // Debugging
          return res.status(400).json({ message: "Username and password are required" });
      }

      const user = await User.findOne({ username });
      if (!user) {
          console.log("User not found:", username);  // Debugging
          return res.status(400).json({ message: "Invalid username or password" });
      }
      console.log("Entered Password:", password);
      console.log("Stored Hashed Password:", user.password);
      console.log("Entered Password:", password, "Length:", password.length);
console.log("Stored Hashed Password:", user.password, "Length:", user.password.length);

      const isMatch = await bcrypt.compare(password.trim(), user.password);
      
      if (!isMatch) {
          console.log("Password incorrect for user:", username);  // Debugging
          return res.status(400).json({ message: "Invalid username or password" });
      }

      console.log("User authenticated:", username); // Debugging

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.json({ token });

  } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Error logging in", error });
  }
});

// Forgot Password Route
// Forgot Password Route
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  console.log("Received forgot password request for:", email); // Debugging

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found:", email); // Debugging
      return res.status(404).json({ message: "User not found" });
    }

    // Generate Reset Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });
    console.log("Generated reset token:", token); // Debugging

    // Create Reset Link
    const resetLink = `${process.env.REACT_APP_API_URL}/reset-password/${token}`;
    console.log("Reset link:", resetLink); // Debugging

    // Send Email using Global Transporter
    const mailOptions = {
      from: process.env.SMTP_USER,  // Use SMTP_USER instead of EMAIL_USER
      to: user.email,
      subject: "Reset Password",
      text: `Click on this link to reset your password: ${resetLink}`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully"); // Debugging

    res.json({ message: "Password reset link sent to your email." });
  } catch (error) {
    console.error("Error in forgot password:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
});



// Reset Password
router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const hashedPassword = await bcrypt.hash(password, 10);

      await User.findByIdAndUpdate(decoded.id, { password: hashedPassword });

      res.json({ message: "Password reset successful. You can now log in." });
  } catch (error) {
      res.status(400).json({ message: "Invalid or expired token" });
  }
});


// Protected Route Example (Test)
router.get("/protected", authenticateToken, (req, res) => {
    res.json({ message: `Welcome ${req.user.username}, this is a protected route!` });
});

// Middleware to verify token
function authenticateToken(req, res, next) {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid Token" });
    }
}

module.exports = router;
