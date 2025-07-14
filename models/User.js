const mongoose = require('mongoose');

// Define the schema for a User
const UserSchema = new mongoose.Schema({

  // unique: true ensures no duplicates
  // sparse: true allows null or missing values without triggering uniqueness errors
  username: { type: String, unique: true, sparse: true },
  password: { type: String }, 

  // GitHub ID for OAuth login
  // unique: true ensures each GitHub account is linked to only one user
  // sparse: true allows this field to be optional (for non-GitHub users)
  githubId: { type: String, unique: true, sparse: true }
});

module.exports = mongoose.model('User', UserSchema);
