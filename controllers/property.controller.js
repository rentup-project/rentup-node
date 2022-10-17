const Property = require('../models/Property.model');

module.exports.getOneProperty = (req, res, next) => {
    const { id } = req.params;

    Property.findById(id)
      .then((prop) => {
        res.status(201).json(prop);
      })
      .catch(next);
};

module.exports.getAllProperties = (req, res, next) => {
    const { city } = req.params;

    Property.find({ address: { $regex: city } })
      .then((props) => {
        res.status(201).json(props);
      })
      .catch(next);
};

