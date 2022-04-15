//////////////////////////////////////////////////////////////////////////////////////////
// THIRD PARTY MODULES
//////////////////////////////////////////////////////////////////////////////////////////
import express from 'express';
import logger from 'morgan';
import mongoose from 'mongoose';
import mongoSanitize from 'express-mongo-sanitize';
import dotenv from 'dotenv';
import formRoutes from './routes/form';

// Load Env
dotenv.config();

// Initialize app with express
const app = express();
const PORT = process.env.PORT || 3000;

//////////////////////////////////////////////////////////////////////////////////////////
// CONFIGURATIONS
//////////////////////////////////////////////////////////////////////////////////////////

// MongoDB Config
const DB_URL = process.env.MONGO_URL;
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});
const mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error: '));
mongoDB.once('open', () => {
  console.log('Successfully connected to MongoDB...');
});

//////////////////////////////////////////////////////////////////////////////////////////
// MIDDLEWARE
//////////////////////////////////////////////////////////////////////////////////////////

// Body parser
app.use(logger('dev'));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(__dirname + '/'));

// Mongo sanitizer
app.use(mongoSanitize()); // TO PREVENT MONGO INJECTION ATTACK

// Routes
app.use('/forms', formRoutes);

// Start server
app.listen(PORT, () => {
  console.log('Server running on port: ' + PORT);
});
