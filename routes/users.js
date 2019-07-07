const express = require('express');
const router = express.Router();
const passport = require('passport')
const User = require('../models/user')

//login
router.get('/login', (req, res) => {
  res.render('login')
})

//login submit
router.post('/login', (req, res, next) => {
  console.log('req.query', req.body)
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  })(req, res, next)
  console.log('req.body', req.body.email)
})

//register
router.get('/register', (req, res) => {
  res.render('register')
})

//register submit
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body
  console.log('name', req.body.name)
  User.findOne({ email: email }).then(user => {
    if (user) {
      console.log('User already exists')
      res.render('register', {
        name,
        email,
        password,
        password2
      })
    } else {
      const newUser = new User({
        name,
        email,
        password
      })
      newUser.save().then(user => {
        res.redirect('/')
      })
        .catch(err => console.log(err))
    }
  })
})

//logout
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

module.exports = router;