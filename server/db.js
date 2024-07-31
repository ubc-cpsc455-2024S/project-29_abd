const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

console.log("MONGODB_URI: ", process.env.MONGODB_URI); //for debugging

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error('Missing MONGODB_URI in environment variables');
}

mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = mongoose;
