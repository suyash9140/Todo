require("dotenv").config();

const jwt = require("jsonwebtoken");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { TodoModel, updateExpiredTasks } = require("./Models/Todo");
const authRoutes = require("./Routes/auth"); // Import authentication routes
const authMiddleware = require("./middleware/authMiddleware"); // Import authentication middleware

const app = express();
app.use(cors());
app.use(express.json());

// Check if MONGO_URI is defined
if (!process.env.MONGO_URI) {
  console.error("❌ Error: MONGO_URI is not defined in .env");
  process.exit(1);
}

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
    updateExpiredTasks(); // Check expired tasks on startup
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Exit if MongoDB fails
  });

// Run the expired task checker every 5 minutes
setInterval(updateExpiredTasks, 100000);

// Authentication Routes
app.use('/auth', authRoutes);

// Get all tasks (Protected Route)
app.get('/get', authMiddleware, (req, res) => {
  const { search } = req.query; // Search term for filtering tasks

  // If there's a search query, filter by task or description
  const searchQuery = search ? { $text: { $search: search } } : {};

  TodoModel.find({
    userId: req.user.id,
    ...searchQuery,
    status: { $ne: "COMPLETE" } // Exclude completed tasks
  })
    .sort({
      status: 1, // Order tasks by status
      deadline: 1 // Earliest deadline first
    })
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

// Update task status (Protected Route)
app.put('/update/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // New status from frontend

  TodoModel.findByIdAndUpdate(id, { status }, { new: true }) // Update and return updated task
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

// Delete task (Protected Route)
app.delete('/delete/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete(id)
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

// Add a new task (Protected Route)
app.post('/add', authMiddleware, (req, res) => {
  const { task,description, deadline } = req.body;

  TodoModel.create({
    task,
    description,
    deadline: new Date(deadline), // Store the date in UTC
    status: "ACTIVE" ,// Default status
    userId: req.user.id
  })
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

app.listen(3001, () => {
  console.log("Server is running");
});
