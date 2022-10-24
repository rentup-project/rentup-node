const Property = require("../models/Property.model");

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
  const {
    minPrice,
    maxPrice,
    minMeters,
    maxMeters,
    bedroom,
    bathroom,
    furniture,
    orientation,
    petAllowed,
    heating,
    propertyType,
    floor,
    availabilityDate,
  } = req.query;

  function diacriticSensitiveRegex(string = "") {
    return string
      .replace(/a/g, "[a,á,à,ä,â]")
      .replace(/e/g, "[e,é,ë,è]")
      .replace(/i/g, "[i,í,ï,ì]")
      .replace(/o/g, "[o,ó,ö,ò]")
      .replace(/u/g, "[u,ü,ú,ù]");
  }

  // Meter filtro de monthlyRent

  const monthlyRent = {};
  if (maxPrice) {
    monthlyRent.$lte = maxPrice;
  }
  if (minPrice) {
    monthlyRent.$gte = minPrice;
  }

  const squaredMeters = {};
  if (maxMeters) {
    squaredMeters.$lte = maxMeters;
  }
  if (minMeters) {
    squaredMeters.$gte = minMeters;
  }

  const criteria = {
    address: { $regex: diacriticSensitiveRegex(city), $options: "i" },
    ...(Object.keys(monthlyRent).length && { monthlyRent }),
    ...(Object.keys(squaredMeters).length && { squaredMeters }),
  };

  if (Object.keys(req.query).length !== 0) {
    Property.find(criteria)
      .then((props) => {
        res.status(200).json(props);
      })
      .catch(next);
  } else {
    Property.find({
      address: { $regex: diacriticSensitiveRegex(city), $options: "i" },
    })
      .then((props) => {
        res.status(200).json(props);
      })
      .catch(next);
  }
};