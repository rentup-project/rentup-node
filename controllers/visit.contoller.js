const Visit = require('../models/Visit.model');

module.exports.getVisits = (req, res, next) => {
    const { id } = req.params

    console.log('entra', id)
    
    Visit.find({ property: id})
    .then((visits) => {
        res.status(201).json(visits)
    })
    .catch(next)
}