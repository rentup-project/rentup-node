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

    function diacriticSensitiveRegex(string = '') {
      return string.replace(/a/g, '[a,á,à,ä,â]')
         .replace(/e/g, '[e,é,ë,è]')
         .replace(/i/g, '[i,í,ï,ì]')
         .replace(/o/g, '[o,ó,ö,ò]')
         .replace(/u/g, '[u,ü,ú,ù]');
    }

    Property.find({ address: { $regex: diacriticSensitiveRegex(city), $options: "i" } })
      .then((props) => {
        res.status(201).json(props);
      })
      .catch(next);
};

