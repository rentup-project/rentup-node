const Visit = require("../models/Visit.model");

module.exports.getVisits = (req, res, next) => {
  const { id } = req.params;

  Visit.find({ property: id })
    .then((visits) => {
      res.status(201).json(visits);
    })
    .catch(next);
};

module.exports.reserveVisit = (req, res, next) => {
  const { visitId, currentUserId, propertyId } = req.params;

  Visit.find({ $and: [{ _id: visitId }, { reserved: true }] })
    .then((arr) => {
      if (arr.length === 0) {
        Visit.find({ property: propertyId, userWhoVisits: currentUserId })
          .then((visit) => {
            if (visit.length === 0) {
              Visit.findByIdAndUpdate(visitId, {
                userWhoVisits: currentUserId,
                reserved: true,
              })
                .then((updated) => {
                  res.status(201).json({});
                })
                .catch(next);
            } else {
              res.status(201).json({
                message:
                  "You already have a reserved time for this property. Go to your area to see it.",
              });
            }
          })
          .catch(next);
      } else {
        res.status(201).json({ message: "This time slot is already reserved" });
      }
    })
    .catch(next);
};

module.exports.getUserVisits = (req, res, next) => {
  const { id } = req.params;

  Visit.find({ userWhoVisits: id, reserved: true })
    .populate("property")
    .then((visits) => res.status(201).json(visits))
    .catch(next);
};

module.exports.deleteVisit = async (req, res, next) => {
  const { id } = req.params;

  Visit.findByIdAndUpdate(id, { reserved: false, userWhoVisits: null }, { new: true })
    .then((updated) => {
      res.status(201).json({});
    })
    .catch(next);
};
