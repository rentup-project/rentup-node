const Property = require("../models/Property.model");
const User = require("../models/User.model");
const mongoose = require("mongoose");

module.exports.createProperty = (req, res, next) => {
  const { data } = req.body;
  data.owner = mongoose.Types.ObjectId(data.owner);

  Property.create(data)
    .then((prop) => {
      res.status(200).json(prop);      
      const filter = { _id : prop.owner };
      const update = { type : "tenant&owner" };
      return User.findOneAndUpdate(filter, update)
    })
    .then(userUpdated => {
      res.status(200)
    })
    .catch(next);
};

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
    bedrooms,
    bathrooms,
    furnitures,
    orientationType,
    petAllowedInfo,
    heatingType,
    propertyTypeInfo,
    floorInfo,
    availabilityDateInfo,
  } = req.query;

  function diacriticSensitiveRegex(string = "") {
    return string
      .replace(/a/g, "[a,á,à,ä,â]")
      .replace(/e/g, "[e,é,ë,è]")
      .replace(/i/g, "[i,í,ï,ì]")
      .replace(/o/g, "[o,ó,ö,ò]")
      .replace(/u/g, "[u,ü,ú,ù]");
  }

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

  const bedroom = {};
  if (bedrooms === "Studio" || bedrooms === "Select") {
    bedroom.$gte = 0
  } else if (bedrooms === "1 or more") {
    bedroom.$gte = 1
  } else if (bedrooms === "2 or more") {
    bedroom.$gte = 2
  } else if (bedrooms === "3 or more") {
    bedroom.$gte = 3
  } else if (bedrooms === "More than 4") {
    bedroom.$gte = 4
  }
 
  const bathroom = {};
  if (bathrooms === "1 or more" || bathrooms === "Select") {
    bathroom.$gte = 1;
  } else if (bathrooms === "2 or more") {
    bathroom.$gte = 2;
  } else if (bathrooms === "3 or more") {
    bathroom.$gte = 3;
  } else if (bathrooms === "More than 4") {
    bathroom.$gte = 4;
  }

  const availabilityDate = {};
  if (availabilityDateInfo === 'Available now') {
    availabilityDate.$lte = Date.now();
  } else if (availabilityDateInfo === 'Available soon') {
    availabilityDate.$gt = Date.now();
  }

  const criteria = {
    address: { $regex: diacriticSensitiveRegex(city), $options: "i" },
    ...(Object.keys(monthlyRent).length && { monthlyRent }),
    ...(Object.keys(squaredMeters).length && { squaredMeters }),
    ...(Object.keys(bedroom).length && { bedroom }),
    ...(Object.keys(bathroom).length && { bathroom }),
    ...(Object.keys(availabilityDate).length && { availabilityDate })
  };

  const furniture = {};
  if (furnitures && furnitures !== "Select") {
    criteria.furniture = furnitures;
  }

  const orientation = {};
  if (orientationType  && orientationType !== "Select") {
    criteria.orientation = orientationType;
  }

  const petAllowed = {};
  if (petAllowedInfo === "Allow pets" || petAllowedInfo === "Select") {
    criteria.petAllowed = true;
  } else if (petAllowedInfo === "Doesn't allow pets" && petAllowedInfo !== "Select") {
    criteria.petAllowed = false;
  }

  const heating = {};
  if (heatingType && heatingType !== "Select") {
    criteria.heating = heatingType;
  }

  const propertyType = {};
  if (propertyTypeInfo && propertyTypeInfo !== "Select") {
    criteria.propertyType = propertyTypeInfo;
  }

  const floor = {};
  if (floorInfo === "First") {
    criteria.floor = floorInfo;
  } else if (floorInfo === "In between") {
    criteria.floor = floorInfo;
  } else if (floorInfo === "Last") {
    criteria.floor = floorInfo;
  } else if (floorInfo === "Select") {
    criteria.floorInfo = null
  }

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