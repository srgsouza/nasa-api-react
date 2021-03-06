const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const passport = require('passport');
const request = require('request');

const User  = require('../models/users');

// display the index page - show all users
router.get('/', async (req, res) => {
  try {
    // const data = await User.find({}).populate('trails').populate('bikes');
    const data = await User.find({});
    res.json({
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
});

// logout
router.get('/logout', function (req, res) {
  req.logout();
  res.json({
    status: 200
  })
});

// router.get('/logged', (req, res) => {
//   if (!req.user) {
//     res.redirect('/users')
//   }
//   res.send(`Logged in user is ${req.user.username}`);
// })

// render the edit page (pre-filled with existing data)
router.get('/:id/edit', async (req, res) => {
  try {
    const data = await User.findById(req.params.id);
    res.json({
      data: data,
      id: req.params.id
    })
  } catch (error) {
    console.log(error);
  }
});

// find user by ID and render the show.ejs page
router.get('/:id', async (req, res) => {
  try {
    const data = await User.findById(req.params.id);
    res.render({
      user: data,
      id: req.params.id
    })
  } catch (error) {
    console.log(error);
  }
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', function (err, user, info) {
    if (err) { 
      // return next(err); 
      return res.status(500).json({ success: false, message: 'Internal server error: ' + err.message });
    }
    if (!user) { 
      // return res.redirect('/login'); 
    }
    req.logIn(user, function (err) {
      if (err) { 
        return next(err); 
      }
      return res.login().res.json({
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
    res.json({
      status: 200
    })
  } catch (error) {
    console.log(error);
  }
})

// update an item and render the index page (with edited information)
router.put('/:id', async (req, res) => {
  // req.body is the updated form info
  try {
    await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({
      status: 200
    });
  } catch (error) {
    console.log(error);
  }
});

// Delete an item.  Takes an id , as an argument, from a delete form/button, such as the one on the index.ejs page
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    res.json({
      status: 200
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
