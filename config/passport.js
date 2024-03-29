const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
//導入 User model
const User = require("../models/user")
module.exports = passport => {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' }, (email, password, done) => {
        User.findOne({
          email: email
        }).then(user => {
          if (!user) {
            return done(null, false, { message: 'That email is not registered' })
          }
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err
            if (isMatch) {
              return done(null, user)
            } else {
              return done(null, false, { message: 'Email and Password incorrect' })
            }
          })
        })
      })
  )

  passport.use(new FacebookStrategy({
    clientID: '',
    clientSecret: '',
    callbackURL: '',
    profileFields: ['email', 'displayName']
  },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({
        email: profile._json.email,
      }).then(user => {
        if (!user) {
          var randomPassword = Math.random().toString(36).slice(-8)
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(randomPassword, salt, (err, hash) => {
              var newUser = User({
                name: profile._json.name,
                email: profile._json.email,
                password: hash
              })
              newUser.save().then(user => {
                return done(null, user)
              })
            })
          })
        } else {
          return done(null, user)
        }
      })

      //   User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      //     return done(err, user);
      //   });
    }
  ));


  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })
}
