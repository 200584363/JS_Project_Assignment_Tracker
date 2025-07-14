const mongoose = require('mongoose');

// Define the schema for an Assignment
const AssignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  dueDate: Date,
  uploadedFile: String,

  // Reference to the user who created the assignment (foreign key)
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

  // Automatically include `createdAt` and `updatedAt` timestamps
}, { timestamps: true });

module.exports = mongoose.model('Assignment', AssignmentSchema);
