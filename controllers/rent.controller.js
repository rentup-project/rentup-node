const Rent = require('../models/Rent.model');
const Property = require("../models/Property.model");

module.exports.createProperty = (req, res, next) => {
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
        Property.findByIdAndUpdate(property, { rented: true }, { new: true })
        .then((updated) => {
            res.status(201).json(updated)
        })
        .catch(next);
    })
    .catch(next);
}