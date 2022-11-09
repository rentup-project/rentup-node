const router = require("express").Router();
const passport = require("passport");
const fileUploader = require("./cloudinary.config");
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");
const propertyController = require("../controllers/property.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const paymentController = require("../controllers/payment.controller");
const accountController = require("../controllers/account.controller");
const messagesController = require("../controllers/messages.controller");
const myAreaController = require("../controllers/my-area.controller");
const reservationController = require("../controllers/reservation.controller");
const rentController = require("../controllers/rent.controller");
const billController = require("../controllers/bill.controller");

const SCOPES = ["profile", "email"];

//HOME
router.get("/", (req, res, next) => res.json({ ok: true }));

//AUTH
router.post("/register", authController.register);
router.get("/activate/:token", authController.activateAccount);
router.post("/login", authController.login);
router.get(
  "/login/google",
  passport.authenticate("google-auth", { scope: SCOPES })
);
router.get(
  "/auth/google/callback",
  authController.loginGoogle
);

//USER
router.get(
  "/users/me",
  authMiddleware.isAuthenticated,
  userController.getCurrentUser
);
router.get(
  "/users/:id",
  authMiddleware.isAuthenticated,
  userController.getUser
);

//MESSAGES
router.get(
  "/messages/select/:currentUser",
  authMiddleware.isAuthenticated,
  messagesController.selectUser
);
router.post(
  "/messages/create",
  authMiddleware.isAuthenticated,
  messagesController.createMessage
);
router.get(
  "/messages/:currentUser/:owner",
  authMiddleware.isAuthenticated,
  messagesController.getMessages
);

//PROPERTIES
router.get("/property/:id", propertyController.getOneProperty);
router.post(
  "/properties/create",
  fileUploader.array("images", 10),
  propertyController.createProperty
);
router.post(
  "/properties/edit/:id",
  fileUploader.array("images", 10),
  propertyController.editProperty
);
router.get("/properties/:city", propertyController.getAllProperties);
router.get("/properties/created/:user", propertyController.getOwnerProperties);
router.get("/properties/reserved/:user", propertyController.getOwnerRents);
router.delete("/properties/delete/:id", propertyController.deleteProperty);
router.get("/property/reviews/:id", propertyController.getReviews);

//RESERVATION
router.post("/reserve", reservationController.createReservation);
router.get("/reserve/cancel/:id", reservationController.cancelReservation);
router.get("/reserve/:id", reservationController.getOneReservation);

//RENT
router.post("/rent/create", fileUploader.single('contract'), rentController.createRent);
router.get("/rent/:id", rentController.getOneRent);
router.get("/rent/userWhoRents/:id", rentController.getUserWhoRents);

//BILLS
router.post("/bills/create", fileUploader.single('file'), billController.createBill)
router.post("/bills/update", billController.updateManyBills);
router.get("/bills/:id", billController.getBills);
router.delete("/bills/delete", billController.deleteManyBills);
router.delete("/bills/delete/:id", billController.deleteBill);

//ACCOUNT
router.get("/account/favs/:user", accountController.getAllFavs);
router.get("/account/fav/:property/:user", accountController.getOneFav);
router.post("/account/favs", accountController.updateFav);
router.delete("/account/fav/delete/:property/:user", accountController.deleteOneFav);
router.get("/account/notifications/:user", accountController.getNotifications);

//PAYMENT
router.post("/create-payment-intent/reserve", paymentController.loadReservePaymentScreen);
router.post("/create-payment-intent/bills", paymentController.loadBillsPaymentScreen);

//MY PERSONAL AREA
router.get(
  "/my-area/prequalification/:tenant",
  myAreaController.getPrequalification
);
router.post(
  "/my-area/prequalification/complete",
  myAreaController.completePrequalification
);
router.post(
  "/my-area/prequalification/edit/:user",
  myAreaController.editPrequalification
);
router.post(
  "/my-area/account/edit/:user",
  fileUploader.single("image"),
  myAreaController.editUserData
);
router.post(
  "/my-area/review",
  myAreaController.createReview
);

router.get("/my-area/review/status/:id", myAreaController.getReviewRent);

module.exports = router;
