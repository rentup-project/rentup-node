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

module.exports.deleteBill = (req, res, next) => {
    const { id } = req.params

   Bill.findByIdAndDelete(id)
    .then(bills => res.status(201).json({}))
    .catch(next);
}

module.exports.deleteManyBills = (req, res, next) => {
    const arrWithIds = req.body;
    const arrWithPromises = [];
    
    arrWithIds.forEach(id => {
        arrWithPromises.push(Bill.findByIdAndDelete(id))
    })

    Promise.all(arrWithPromises)
    .then((everyAnswer) => {
        res.status(201).json({})
    })
    .catch(next);

}

module.exports.updateManyBills = (req, res, next) => {
    const { arr, owner } = req.body;
    const arrWithPromises = [];

    console.log(arr, owner)
    
    arr.forEach(id => {
        arrWithPromises.push(Bill.findByIdAndUpdate(id, {paymentStatus: 'paid'}).populate('rent'))
    })

    Promise.all(arrWithPromises)
    .then((everyAnswer) => {
        return Notification.create({ user: owner , type: 'billPaid' })
    })
    .then((notCreated) => {
        res.status(201).json({})
    })
    .catch(next);
}