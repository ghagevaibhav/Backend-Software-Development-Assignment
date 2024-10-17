const mongoose = require('mongoose');

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

module.exports = connectDB;