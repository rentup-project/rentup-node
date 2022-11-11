const Favourite = require('../models/Favourite.model');
const mongoose = require("mongoose");
const Notification = require("../models/Notification.model");

module.exports.getNotifications = (req, res, next) => {
    const { user } = req.params

    Notification.find({ user })
    .then((notifications) => {
        const sortedNotifications = notifications.sort((a , b) => b.createdAt - a.createdAt)
        res.json(sortedNotifications);
    })
    .catch(next);
};

module.exports.getAllFavs = (req, res, next) => {
    user = mongoose.Types.ObjectId(req.params.user);

    Favourite.find({ user })
    .populate('property')
    .then((favs) => {
        const filtered = favs.filter((fav) => {
            !fav.property.reserved
        })
        res.status(201).json(filtered);
    })
    .catch(next);
}

module.exports.getOneFav = (req, res, next) => {
    user = mongoose.Types.ObjectId(req.params.user);
    property = mongoose.Types.ObjectId(req.params.property);

  Favourite.findOne({ user, property})
        .then((fav) => {
            if (fav) {
                res.send('isFaved');
            } else {
                res.send("isNotFaved");
            }
        })
        .catch(next);
};

module.exports.updateFav = (req, res, next) => {    
    user = mongoose.Types.ObjectId(req.body.user);
    property = mongoose.Types.ObjectId(req.body.property);

    Favourite.findOne({ user, property })
        .then((fav) => {
            if (fav) {
            Favourite.findOneAndDelete({ user, property })
                .then((favDeleted) => {
                    res.send("deleted");
                })
                .catch((err) => next(err));
            } else {
            Favourite.create({ user, property })
                .then((favCreated) => {
                res.send("created");
                })
                .catch((err) => next(err));
            }
        })
        .catch((err) => next(err));
};

module.exports.deleteOneFav = (req, res, next) => {   
    user = mongoose.Types.ObjectId(req.params.user);
    property = mongoose.Types.ObjectId(req.params.property);
    
    Favourite.findOneAndDelete({ user, property })
      .then((favDeleted) => {
        res.send(favDeleted);
      })
      .catch((err) => next(err));
}

