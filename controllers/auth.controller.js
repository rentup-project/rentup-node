const createError = require('http-errors');
const mailer = require('../config/mailer.config');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const passport = require('passport');

module.exports.register = (req, res, next) => {
  console.log('entra en el back', req.body)
  User.create(req.body)
    .then((user) => {
      mailer.sendActivationMail(user.email, user.activationToken);
      res.status(201).json(user)    
    })
    .catch(next);
};

module.exports.activateAccount = (req, res, next) => {
  const token = req.params.token;

  User.findOneAndUpdate(
    { activationToken: token, status: false },
    { status: true }
  )
    .then((user) => {
      if (user) {
        res.send(202);
      } else {
        res.send(401);
      }
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  const LoginError = createError(401, 'Invalid credentials');

  if (!email || !password) {
    next(LoginError);
  } else {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          next(LoginError); 
        } else {
          if(user.status){
          user.checkPassword(password) 
            .then(result => {
              if (!result) {
                next(LoginError); 
              } else {
                const token = jwt.sign(
                  {
                    id: user.id,
                  },
                    process.env.JWT_SECRET,
                  {
                    expiresIn: '1d'
                  }
                )
                res.json({ accessToken: token });
              }
            })
            .catch(next)
          } else {
            next(createError(401, "You must activate your account first. Please, check your email."))            
          }
        }
      })
      .catch(next)
  }
}

module.exports.loginGoogle = (req, res, next) => {
  passport.authenticate('google', {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: `${process.env.CLIENT_URL}login`
  });
};
