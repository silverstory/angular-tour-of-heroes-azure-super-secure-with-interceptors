const passport = require('passport');
const session = require('express-session');
const csrf = require('csurf');
const helmet = require('helmet');
const config = require('../config/config');

require('./passport');

// 'I should probably create another secret for this one dedicated just for session'
// Secret: 'I dont give a sh*t! Who gives a damn! A**hole!'

module.exports = () => {
  const middleware = [
    helmet(),
    session({
      secret: config.JWT_SECRET,
      resave: true,
      saveUninitialized: true
    }),
    passport.initialize(),
    passport.session(),
    csrf(),
    async (req, res, next) => {
      res.cookie('XSRF-TOKEN', req.csrfToken());
      return next();
    }
  ];
  return middleware;
};