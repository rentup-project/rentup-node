const Prequalification = require('../models/Prequalification.model');
const User = require('../models/User.model');
const mongoose = require("mongoose");

module.exports.getPrequalification = (req, res, next) => {
  const { tenant } = req.params;

  Prequalification.findOne({tenant: mongoose.Types.ObjectId(tenant)})
    .then((form) => {
      res.status(201).json(form);
    })
    .catch(next);
};

module.exports.completePrequalification = (req, res, next) => {
  req.body.tenant = mongoose.Types.ObjectId(req.body.tenant);

  Prequalification.create(req.body)
    .then((formCompleted) => {
      res.status(201).json(formCompleted);
    })
    .catch(next);
};

module.exports.editPrequalification = (req, res, next) => {
  const { user } = req.params;
  const filter = { tenant: user };

  const editPrequalifications = {
    ...req.body,
    tenant: user
  };

  Prequalification.findOneAndUpdate( filter, editPrequalifications )
    .then((formCompleted) => {
      res.status(201).json(formCompleted);
    })
    .catch(next);
};

module.exports.editUserData = (req, res, next) => {
  const { user } = req.params;
  const filter = { "_id": user };

  const image = req.file.path;

  const editUser = {
    ...req.body,
    image,
    _id: user,
  };

  User.findOneAndUpdate(filter, editUser)
    .then((userUpdated) => {
      res.status(201).json(userUpdated);
    })
    .catch(next);
};