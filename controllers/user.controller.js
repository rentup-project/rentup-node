const createError = require('http-errors');
const User = require('../models/User.model');
  
module.exports.getCurrentUser = (req, res, next) => {
    User.findById(req.currentUser)
        .then(user => {
        if (!user) {
            next(createError(404, 'User not found'));
        } else {
            res.json(user);
        }
        })
        .catch(next)
}