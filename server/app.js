// app.js
const express = require('express');
const connectDB = require('./db');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const dayCardsRouter = require('./routes/dayCards');
const tripsRouter = require('./routes/trips');
const authRouter = require('./routes/auth'); 


const app = express();

connectDB();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/day-cards', dayCardsRouter);
app.use('/api/day-cards/locations', dayCardsRouter);
app.use('/api/trips', tripsRouter);
app.use('/api/auth', authRouter); 


module.exports = app;