const Rent = require('../models/Rent.model');
const Bill = require("../models/Bill.model");
const Notification = require('../models/Notification.model');

module.exports.createBill = (req, res, next) => {
    const { rent, type, amount, paymentStatus, dueDate } = req.body;
    let file;

    if(req.file) {
        file = req.file.path
    }

    Bill.create({ rent, type, amount, paymentStatus, dueDate, file })
        .then(created => {
            return Rent.findById(rent)
        })
        .then(rentFound => {
            console.log(rentFound)
           return Notification.create({user: rentFound.userWhoRents , type: 'billUploaded'})
        })
       .then((created) => {
            res.status(201).json(created)
        }) 
        .catch(next);
}

module.exports.getBills = (req, res, next) => {
    const { id } = req.params

    Bill.find({ rent: id })
        .then(bills => res.status(201).json(bills))
        .catch(next);
}