const mongoose = require('mongoose');

// Create a new function to connect to MongoDB
const connectDB = async function () {
  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(process.env.MONGO_URL);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error', error);
    throw error;
  }
};

// Export the function for use in other files
module.exports = connectDB;