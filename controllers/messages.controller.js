const User = require("../models/User.model");
const Message = require("../models/Message.model");
const mongoose = require("mongoose");
const moment = require('moment');

module.exports.getMessages = (req, res, next) => {
    const { currentUser, owner } = req.params
    
    Message.find({$or: [{$and: [{sender: currentUser}, {receiver: owner}]}, {$and: [{receiver: currentUser}, {sender: owner}]}]})
    .populate('sender')
    .populate('receiver')
    .then((msgs) => {
        msgs.forEach((msg) => {
        msg.hour = moment(msg.createdAt).format('DD/MM/YY - hh:mm')
        })
        msgs.sort((a, b) => b.createdAt - a.createdAt)
        res.status(201).json(msgs)
  })
  .catch((err) => next(err));
};