const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

console.log("MONGODB_URI: ", process.env.MONGODB_URI); // for debugging

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error('Missing MONGODB_URI in environment variables');
}

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
