const Favourite = require('../models/Favourite.model');
const mongoose = require("mongoose");
const Notification = require("../models/Notification.model");

module.exports.getNotifications = (req, res, next) => {
    const { user } = req.params

    Notification.find({ user })
    .then((notifications) => {
        res.json(notifications)
    })
    .catch(next);
};

module.exports.getAllFavs = (req, res, next) => {
    user = mongoose.Types.ObjectId(req.params.user);

    Favourite.find({ user })
        .populate('property')
        .then((favs) => {
            res.status(201).json(favs);
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