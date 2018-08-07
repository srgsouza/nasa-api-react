const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const passport = require('passport');
const request = require('request');

const User  = require('../models/users');

// display the index page - show all users
router.get('/', async (req, res) => {
  let username = null;
  if (req.user !== undefined) {
    username = req.user.username;
  }
  // console.log(session);

  try {
    // const data = await User.find({}).populate('trails').populate('bikes');
    const data = await User.find({});

    res.render('users/index.ejs', {
      "usersList": data,
      username: username
    });
  } catch (error) {
    console.log(error);
  }
});

// create new - Shows the Form
router.get('/new', (req, res) => {
  res.render('users/new.ejs');
});

// Render the login page
router.get('/login', function (req, res) {
  res.json({
    status: 200,
    data: 'login successful'
  });
  // res.render('users/login.ejs');
});

// logout
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/logged', (req, res) => {
  if (!req.user) {
    res.redirect('/users')
  }
  res.send(`Logged in user is ${req.user.username}`);
})

// render the edit page (pre-filled with existing data)
router.get('/:id/edit', async (req, res) => {
  try {
    const data = await User.findById(req.params.id);
    res.render('users/edit.ejs', {
      user: data,
      id: req.params.id
    })
  } catch (error) {
    console.log(error);
  }
});

// Render user profile TODO
router.get('/:id/profile', async (req, res) => {
  let username = null;
  if (req.user !== undefined) {
    username = req.user.username;
  }
  // console.log(session);
  try {
    // const data = await User.findById(req.params.id).populate('trails').populate('bikes');
    const data = await User.findById(req.params.id);
    console.log(data);

    res.render('users/profile.ejs', {
      "usersList": data,
      username: username
    });
  } catch (error) {
    console.log(error);
  }
});

// find user by ID and render the show.ejs page
router.get('/:id', async (req, res) => {
  try {
    const data = await User.findById(req.params.id);
    res.render('users/show.ejs', {
      user: data,
      index: req.params.id
    })
  } catch (error) {
    console.log(error);
  }
});


// // Login user - using Passport JS
// router.post('/login', (req, res, next) => {
//   // passport.authenticate returns a callback function
//   // appended: '(res, req, next)' to the function listed on the Passport Docs
//   console.log('/users/login route was called');
  
//   passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/users/login'
//   }) (req, res, next);
// })

router.post('/login', (req, res, next) => {
  passport.authenticate('local', function (err, user, info) {
    if (err) { 
      // return next(err); 
      return res.status(500).json({ success: false, message: 'Internal server error: ' + err.message });
    }
    if (!user) { 
      return res.redirect('/login'); 
    }
    req.logIn(user, function (err) {
      if (err) { 
        return next(err); 
      }
      // return res.redirect('/users/' + user.username);
      // return res.status(200).json({ success: true, data: 'authentication succeeded' });
      return res.json({
        status: 200,
        data: 'login successful'
      });
    });
  })(req, res, next);
})

// Register new user - Insert new item in the DB
router.post('/register', async (req, res) => {
  try {
    await User.create(req.body);
    res.redirect('/users');
  } catch (error) {
    console.log(error);
  }
})

// update an item and render the index page (with edited information)
router.put('/:id', async (req, res) => {
  // req.body is the updated form info
  try {
    await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.redirect('/users');
  } catch (error) {
    console.log(error);
  }
});

// Delete an item.  Takes an id , as an argument, from a delete form/button, such as the one on the index.ejs page
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    res.redirect('/users');
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
