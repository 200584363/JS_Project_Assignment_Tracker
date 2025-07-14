const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = function(passport) {

  // Save user ID to session cookie
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Retrieve user from ID stored in session
  passport.deserializeUser((id, done) => {
    User.findById(id).then(user => done(null, user)).catch(done);
  });

 // Login for username/password login
  passport.use(new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {

    // Find 'user' by username
    User.findOne({ username }).then(user => {

      // No user found
      if (!user) return done(null, false, { message: 'Incorrect username.' });

      // Compare hashed password
      bcrypt.compare(password, user.password, (err, res) => {

        // Passwords match
        if (res) return done(null, user);

        // Passwords don't match
        else return done(null, false, { message: 'Incorrect password.' });
      });
    }).catch(err => done(err));
  }));

  // GitHub OAuth for social login
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID, // GitHub OAuth client ID
    clientSecret: process.env.GITHUB_CLIENT_SECRET, // GitHub OAuth client secret
    callbackURL: process.env.GITHUB_CALLBACK_URL // GitHub OAuth callback URL
  }, (accessToken, refreshToken, profile, done) => {
    
    // Find user by GitHub ID
    User.findOne({ githubId: profile.id }).then(user => {
      
      // User exists, log them in
      if (user) return done(null, user);
      else {
        // Create new user from GitHub profile
        const newUser = new User({
          githubId: profile.id,
          username: profile.username || profile.displayName,
          password: null
        });

        // Save new user to DB
        newUser.save().then(user => done(null, user)).catch(done);
      }
    }).catch(done);
  }));

};
