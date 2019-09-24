// main starting point of the application
// script node index.js to start server

const express = require('express');
const http = require('http'); // native node library for using http
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const router = require('./router');
const mongoose = require('mongoose');

// data base setup
mongoose.connect('mongodb://localhost/auth2'); // auth here is a name of our local data base
// installed Robomongo
// App setup

// each requests will be passed into morgan and bodyParser - they are middlewares 
app.use(morgan('combined')); // logger (for debugging in general)
app.use(bodyParser.json({type: '*/*'})); // parses incoming request
router(app);

// server setup
const port = process.env.PORT || 8080;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on: ', port);

// json web token explanation