const Property = require("../models/Property.model");
const Reservation = require("../models/Reservation.model");

module.exports.createReservation = (req, res, next) => {
    const { propertyId, currentUserId } = req.body

    Reservation.create({ user: currentUserId, property: propertyId })
    .then((created) => {
        Property.findByIdAndUpdate(propertyId, { reserved: true }, { new: true })
        .then((updated) => {
            res.status(201)
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