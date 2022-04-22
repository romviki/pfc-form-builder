//////////////////////////////////////////////////////////////////////////////////////////
// THIRD PARTY MODULES
//////////////////////////////////////////////////////////////////////////////////////////
import express from 'express';
import logger from 'morgan';
import mongoose from 'mongoose';
import mongoSanitize from 'express-mongo-sanitize';
import dotenv from 'dotenv';
import cors from 'cors';
import formRoutes from './routes/form';

// Load Env
dotenv.config();

// Initialize app with express
const app = express();
const PORT = process.env.PORT || 5000;

//////////////////////////////////////////////////////////////////////////////////////////
// CONFIGURATIONS
//////////////////////////////////////////////////////////////////////////////////////////

// MongoDB Config
const DB_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/PFC';
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});
const mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error: '));
mongoDB.once('open', () => {
  console.log('Successfully connected to MongoDB...');
});

// Apply CORS
app.use(cors());

//////////////////////////////////////////////////////////////////////////////////////////
// MIDDLEWARE
//////////////////////////////////////////////////////////////////////////////////////////

// Body parser
app.use(logger('dev'));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: false }));

// Mongo sanitizer
app.use(mongoSanitize()); // TO PREVENT MONGO INJECTION ATTACK

// Routes
app.use('/api/forms', formRoutes);

// Start server
app.listen(PORT, () => {
  console.log('Server running on port: ' + PORT);
});
