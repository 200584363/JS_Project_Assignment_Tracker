const mongoose = require('mongoose');

// function to sets up the database connection
module.exports = function() {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, // Use the new MongoDB connection string parser
    useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine
  }).then(() => console.log('MongoDB connected')) // If success , log a message to the console
    .catch(err => console.error('MongoDB connection error:', err)); // If error, log the error to the console
};
