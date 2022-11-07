const Rent = require('../models/Rent.model');
const Property = require("../models/Property.model");
const Notification = require('../models/Notification.model');

module.exports.createRent = (req, res, next) => {
    const { userWhoRents, property, pricePerMonth, startDate, monthsDuration } = req.body;
    let contract;

    if(req.file) {
        contract = req.file.path
    }

    Rent.create({
        userWhoRents,
        property,
        pricePerMonth,
        startDate,
        monthsDuration,
        contract
    })
    .then((created) => {
        return Notification.create({ user: userWhoRents, type: 'rent'})        
    })
    .then((notificationCreated) => {
        return Property.findByIdAndUpdate(property, { rented: true }, { new: true })
    })
    .then((propUpdated) => {
        res.status(201).json(propUpdated);
    })
    .catch(next);
}

module.exports.getOneRent = (req, res, next) => {
    const { id } = req.params;

    Rent.findOne({property: id})
    .then((rent) => res.status(201).send(rent))
    .catch(next);
}

module.exports.getUserWhoRents = (req, res, next) => {
  const { id } = req.params;

  Rent.findOne({ property: id })
    .populate("userWhoRents")
    .then((rent) => res.status(201).send(rent))
    .catch(next);
};