const Property = require("../models/Property.model");
const Bill = require("../models/Bill.model")
const StripePackage = require('stripe');
const stripe = StripePackage(process.env.STRIPE_API_KEY);


module.exports.loadReservePaymentScreen = (req, res, next) => {
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
        .catch(next);
    })
}

module.exports.loadBillsPaymentScreen = (req, res, next) => {
    const arrWithIds = req.body;
    
    let promises = arrWithIds.map(id => {
        return Bill.findById(id)
    })

    Promise.all(promises)
    .then((everyAnswer) => {
        let sum = 0;
        everyAnswer.map((bill) => {
            sum += bill.amount;
        });

        return stripe.paymentIntents.create({
            amount: sum,
            currency: "eur",
            automatic_payment_methods: {
                enabled: false,
            }
        })
    })
    .then((paymentIntent) => {
        res.send({clientSecret: paymentIntent.client_secret});
    })
    .catch(next);
}