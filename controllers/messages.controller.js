const Message = require("../models/Message.model");
const User = require("../models/User.model");
const Notification = require("../models/Notification.model");
const mailer = require("../config/mailer.config");
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

module.exports.createMessage = (req, res, next) => {
  const { sender, receiver, msg } = req.body

  Message.create({ sender, receiver, msg })
  .then((created) => {
    res.status(200).json(created)
    //Agregar acá que si es el nuevo mensaje es a la misma persona 
    //poner un margen de tiempo de 12hs para volver a crear otra notificación
    Notification.create({ user: receiver, type: 'message' })
    .then(() => {
      User.findOne({ _id: receiver })
      .then((user) => {
        mailer.sendNotificationMail(user.email);
      })
      .catch((err) => next(err));
    })
    .catch((err) => next(err));
  })
  .catch((err) => next(err));
};

module.exports.selectUser = (req, res, next) => {
  const { currentUser } = req.params
  const usersArr = [];
  
  Message.find({$or: [{ sender: currentUser }, { receiver: currentUser }]})
  .populate('receiver', {
    name: 1,
    id: 1
  })
  .populate('sender', {
    name: 1,
    id: 1
  })
  .then((messages) => {
    if(messages) {
      messages.forEach((message) => {
        usersArr.push(message.receiver);
        usersArr.push(message.sender)
      })
    };

    let listWithoutDuplicates = usersArr.filter((value, index, array) =>
      index === array.findIndex((t) => (
        t.id === value.id
      ))
    )
    
    let listWithoutSelfUser = listWithoutDuplicates.filter((user) => 
      user.id !== currentUser
    )

    res.json(listWithoutSelfUser)
  })
  .catch((err) => next(err));
  };