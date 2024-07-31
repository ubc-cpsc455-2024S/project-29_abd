var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

// Import routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dayCardsRouter = require('./routes/dayCards');

// Ensure the database connection is established
require('./db');

var app = express();

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
    origin: 'http://localhost:5173', // frontend URL
}));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dayCards', dayCardsRouter);

module.exports = app;
