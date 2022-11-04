const Rent = require('../models/Rent.model');
const Bill = require("../models/Bill.model");

module.exports.createBill = (req, res, next) => {
    const { rent, type, amount, paymentStatus, dueDate } = req.body;
    let file;

    if(req.file) {
        file = req.file.path
    }

    console.log(rent, type, amount, paymentStatus, dueDate)

    Bill.create({ rent, type, amount, paymentStatus, dueDate, file })
        .then(created => res.status(201).json(created))
        .catch(next);
}

module.exports.getBills = (req, res, next) => {
    const { id } = req.params

   Bill.find({ rent: id })
    .then(bills => res.status(201).json(bills))
    .catch(next);
}