//////////////////////////////////////////////////////////////////////////////////////////
// THIRD PARTY MODULES
//////////////////////////////////////////////////////////////////////////////////////////
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');
require('dotenv').config();

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
app.use(express.static(__dirname + '/'));

// Mongo sanitizer
app.use(mongoSanitize()); // TO PREVENT MONGO INJECTION ATTACK

// Routes
app.use('/form', require('./routes/form'));

// Start server
app.listen(PORT, () => {
  console.log('Server running on port: ' + PORT);
});
