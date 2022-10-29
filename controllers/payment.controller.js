const Property = require("../models/Property.model");
const StripePackage = require('stripe');
const stripe = StripePackage(process.env.STRIPE_API_KEY);


module.exports.loadPaymentScreen = (req, res) => {
    const { id } = req.body;

    Property.findOne({ id })
    .then((property) => {
        stripe.paymentIntents.create({
        amount: property.reservationPrice,
        currency: "eur",
        automatic_payment_methods: {
            enabled: false,
        }
        })
        .then((paymentIntent) => {
            res.send({
            clientSecret: paymentIntent.client_secret,
            reservationPrice: property.reservationPrice
            });
        })
        .catch(err => console.log(err))
    
    })
}