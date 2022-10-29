const Prequalification = require('../models/Prequalification.model');
const mongoose = require("mongoose");

module.exports.completePrequalifications = (req, res, next) => {
  req.body.tenant = mongoose.Types.ObjectId(req.body.tenant);

  Prequalification.create(req.body)
    .then((formCompleted) => {
      res.status(201).json(formCompleted);
    })
    .catch(next);
};

/* module.exports.editPrequalifications = (req, res, next) => {
  req.body.tenant = mongoose.Types.ObjectId(req.body.tenant);

  Prequalification.findOneAndUpdate(req.body)
    .then((formCompleted) => {
      res.status(201).json(formCompleted);
    })
    .catch(next);
}; */