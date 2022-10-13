const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

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
        }
      })
  }
}