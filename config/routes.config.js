const router = require("express").Router();
const passport = require("passport");
const fileUploader = require("./cloudinary.config");
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");
const propertyController = require("../controllers/property.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const accountController = require("../controllers/account.controller");
const messagesController = require("../controllers/messages.controller");
const myAreaController = require("../controllers/my-area.controller");

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
router.get("/auth/google/callback", authController.loginGoogle);

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

//USER
router.get(
  "/messages/:currentUser/:owner",
  authMiddleware.isAuthenticated,
  messagesController.getMessages
);

//PROPERTIES
router.get("/property/:id", propertyController.getOneProperty);
router.post("/properties/create", fileUploader.array("images", 10), propertyController.createProperty);
router.get("/properties/:city", propertyController.getAllProperties);
router.get("/properties/created/:user", propertyController.getOwnerProperties);
router.post("/properties/edit/:id", propertyController.editProperty);
router.delete("/properties/delete/:id", propertyController.deleteProperty);

//ACCOUNT
router.get("/account/favs/:user", accountController.getAllFavs);
router.get("/account/fav/:property/:user", accountController.getOneFav);
router.post("/account/favs", accountController.updateFav);

//MY PERSONAL AREA
router.post(
  "/my-area/prequalifications",
  myAreaController.completePrequalifications
);

module.exports = router;
