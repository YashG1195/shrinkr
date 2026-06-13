const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { MongoMemoryServer } = require('mongodb-memory-server');

dotenv.config();

const connectDB = async () => {
  try {
    let mongoURI = process.env.MONGO_URI;

    // Use memory server if local MongoDB is requested but we want to make it easy to run
    if (mongoURI.includes('127.0.0.1') || mongoURI.includes('localhost')) {
      const mongoServer = await MongoMemoryServer.create();
      mongoURI = mongoServer.getUri();
      console.log('Using in-memory MongoDB Server for easy testing.');
    }

    await mongoose.connect(mongoURI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
