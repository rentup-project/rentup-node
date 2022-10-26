const router = require("express").Router();
const passport = require("passport");
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");
const propertyController = require("../controllers/property.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const accountController = require('../controllers/account.controller');
const messagesController = require('../controllers/messages.controller');
const StripePackage = require('stripe');
const stripe = StripePackage(process.env.SERVER_API_KEY);


const SCOPES = ["profile", "email"];

//HOME
router.get("/", (req, res, next) => res.json({ ok: true }));

//AUTH
router.post("/register", authController.register);
router.get("/activate/:token", authController.activateAccount);
router.post("/login", authController.login);
router.get("/login/google", passport.authenticate("google-auth", { scope: SCOPES }));
router.get("/auth/google/callback", authController.loginGoogle);

//USER
router.get("/users/me", authMiddleware.isAuthenticated, userController.getCurrentUser);
router.get("/users/:id", authMiddleware.isAuthenticated, userController.getUser);

//USER
router.get("/messages/:currentUser/:owner", authMiddleware.isAuthenticated, messagesController.getMessages);

//PROPERTIES
router.get("/property/:id", propertyController.getOneProperty);
router.post("/properties/create", propertyController.createProperty);
router.get("/properties/:city", propertyController.getAllProperties);

//ACCOUNT
router.get("/account/favs/:user", accountController.getAllFavs);
router.get("/account/fav/:property/:user", accountController.getOneFav);
router.post("/account/favs", accountController.updateFav);

//PAYMENT
// router.post("/create-payment-intent", async (req, res) => {
//     console.log('entra')
//     const { items } = req.body;

//     const calculateOrderAmount = (items) => {
//         // Replace this constant with a calculation of the order's amount
//         // Calculate the order total on the server to prevent
//         // people from directly manipulating the amount on the client
//         return 1400;
//       };
  
//     // Create a PaymentIntent with the order amount and currency
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: calculateOrderAmount(items),
//       currency: "usd",
//       automatic_payment_methods: {
//         enabled: true,
//       },
//     });
  
//     res.send({
//       clientSecret: paymentIntent.client_secret,
//     });
//   });

module.exports = router;