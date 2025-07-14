// app.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const db = require('./config/db');
const initPassport = require('./config/passport');
const hbs = require('hbs');

const app = express();

// Connect to MongoDB
db();

// View engine setup
app.set('views', path.join(__dirname, 'views')); // Views folder path
app.set('view engine', 'hbs'); // Use Handlebars engine
hbs.registerPartials(path.join(__dirname, 'views/partials')); // Register partial templates

// Middleware
app.use(express.urlencoded({ extended: false }));

// Middleware to support HTTP verbs like PUT and DELETE via query parameter (_method)
app.use(methodOverride('_method'));

// Session middleware to manage user sessions
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Initialize Passport for authentication
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Set local variables for templates
app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

// Serve static files (CSS, JS, images) from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve uploaded files statically under /uploads URL
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
initPassport(passport);

app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/assignments', require('./routes/assignments'));

module.exports = app;
