const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (mongoUri === undefined || mongoUri === null || typeof mongoUri !== 'string' || mongoUri.trim() === '') {
    console.warn('Warning: MONGO_URI is undefined or empty. Set it in .env (local) or in the Render dashboard (production).');
    console.error('Error: Cannot connect to MongoDB without MONGO_URI. Exiting.');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(mongoUri, {
      maxPoolSize: 10,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
