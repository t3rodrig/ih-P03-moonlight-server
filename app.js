require('dotenv').config();

const cookieParser = require('cookie-parser');
const express      = require('express');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
// const cors         = require('cors');

const session    = require("express-session");

mongoose
  .connect(process.env.URL_DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// Enable authentication using session + passport
app.use(session({
  secret: 'irongenerator',
  resave: true,
  saveUninitialized: true
}));
// USE passport.initialize() and passport.session() HERE:
require('./passport')(app);

// ADD CORS SETTINGS HERE TO ALLOW CROSS-ORIGIN INTERACTION:
// app.use(cors({
//   credentials: true,
//   origin: [process.env.URL_CLIENT] // <== this will be the URL of our React app
// }));

// ROUTES MIDDLEWARE STARTS HERE:

app.use('/api', require('./routes/auth-routes'));


module.exports = app;
