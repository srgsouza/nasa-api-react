const express = require('express');
const bodyParser = require('body-parser');  // assist in parsing of req.body
const methodOverride = require('method-override'); // override GET/POST calls. Allow use of PUT , DELETE etc
const request = require('request'); // makes http / https calls
const bcrypt = require('bcryptjs'); // encrypts passwords by hashing
const session = require('express-session'); // allow storage of individual pieces of information while in session
const passport = require('passport');
const cors = require('cors');

require('dotenv').config();
require('./db/db');   // runs the db.js file
const {store} = require('./db/mongo_session'); // mongo session config file

require('./passport/serializing');
require('./passport/local-config');


const app = express();
const port = process.env.PORT || 9000;

// middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));  // allows alt methods such as "PUT" from the html form to call a corresponding route

app.use(require('express-session')({
  secret: 'This is a secret',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  store: store,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());  // ** must be placed after session
app.use(passport.session());
app.use((req, res, next) => {
  // res.locals is available on every route. Undefined initially, then set after user logs in
  // templates (ie ejs) will understand 'user' of req.locals
  res.locals.user = req.user;
  next();
});

// CORS - Allows communication between servers - ie. React server
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

// require the controller(s)
const usersController = require('./controllers/users');

// app.use('/users', usersController);
app.use('/api/v1/users', usersController);

app.get('/', (req, res) => {
	res.render('index.ejs');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
