<<<<<<< HEAD
// app.js
const express = require('express');
const connectDB = require('./db');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const dayCardsRouter = require('./routes/dayCards');
const tripsRouter = require('./routes/trips');
=======
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
// var cors = require('cors');
//
// // Import routers
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// var dayCardsRouter = require('./routes/dayCards');
//
// // Ensure the database connection is established
// require('./db');
//
// var app = express();
//
// // Middleware
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(cors({
//     origin: 'http://localhost:5173', // frontend URL
// }));
//
// // Routes
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/dayCards', dayCardsRouter);
//
// module.exports = app;

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
>>>>>>> routing_bhag

const app = express();

<<<<<<< HEAD
connectDB();
=======
// Import routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const dayCardsRouter = require('./routes/dayCards');
const authRouter = require('./routes/auth'); // Import the auth route

const app = express();
>>>>>>> routing_bhag

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
<<<<<<< HEAD
app.use('/api/day-cards', dayCardsRouter);
app.use('/api/trips', tripsRouter);


module.exports = app; 
=======
app.use('/dayCards', dayCardsRouter);
app.use('/api/auth', authRouter); // Add the auth route

module.exports = app;

>>>>>>> routing_bhag
