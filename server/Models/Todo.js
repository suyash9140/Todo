const mongoose = require("mongoose");

// Add description field to Todo schema
const TodoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  description: { 
    type: String,
  },
  deadline: {
    type: Date,
    default: Date.now,
    required: true,
  },
  status: {
    type: String,
    enum: ["ACTIVE", "IN_PROGRESS", "COMPLETE", "EXPIRED"],
    default: "ACTIVE",
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});






const TodoModel = mongoose.model("todos", TodoSchema);

async function updateExpiredTasks() {
  try {
    // Current time in UTC
    const nowUtc = new Date();

    // Convert to IST (UTC + 5:30 hours)
    const indiaOffset = 5.5 * 60 * 60 * 1000;  // IST is UTC + 5.5 hours
    const nowIst = new Date(nowUtc.getTime() + indiaOffset);

    

    // Update tasks where deadline is before the current IST time
    const result = await TodoModel.updateMany(
      {
        deadline: { $lt: nowIst }, // Compare deadline in IST
        status: { $nin: ["COMPLETE", "EXPIRED"] }, // Exclude completed or expired tasks
      },
      { $set: { status: "EXPIRED" } }
    );

    
  } catch (error) {
    console.error("Error updating expired tasks:", error);
  }
}

module.exports = { TodoModel, updateExpiredTasks };
