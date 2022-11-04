const Property = require("../models/Property.model");
const Reservation = require("../models/Reservation.model");
const Notification = require("../models/Notification.model");

module.exports.createReservation = (req, res, next) => {
    const { propertyId, currentUserId } = req.body

    Reservation.create({ user: currentUserId, property: propertyId })
    .then((created) => {
        Property.findByIdAndUpdate(propertyId, { reserved: true }, { new: true })
        .populate('owner')
        .then((propUpdated) => {
            return Notification.create({ user: propUpdated.owner, type: "reservation" });
        })
        .then((notCreated) => {
            res.status(201);
        })
        .catch((err) => {
            Reservation.findOneAndDelete({ id: created.id})
            .then((deleted) => {
                next()
            })
            .catch(next);
        });
    })
    .catch(next);
}

module.exports.cancelReservation = (req, res, next) => {
    const { id } = req.params

    Reservation.findOneAndDelete({ property: id })
    .then((deleted) => {
        Property.findByIdAndUpdate(id, { reserved: false }, { new: true })
        .then((updated) => {
            res.status(201)
        })
        .catch(next);
    })
    .catch(next);
}