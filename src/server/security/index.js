const passport = require('passport');
const session = require('express-session');
const csrf = require('csurf');
const helmet = require('helmet');

require('./passport');

// secrets should be in an ./ENV variable

module.exports = () => {
  const middleware = [
    helmet(),
    session({
      secret: 'I dont give a sh*t! Who gives a damn! A**hole!',
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