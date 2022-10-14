const router = require('express').Router();
const passport = require('passport');
const userController = require('../controllers/user.controller');
const authController = require("../controllers/auth.controller");
const authMiddleware = require('../middlewares/auth.middleware');

const SCOPES = ["profile", "email"];

//HOME
router.get("/", (req, res, next) => res.json({ ok: true }));

//AUTH
router.post("/signup", authController.signup);
router.get("/activate/:token", authController.activateAccount);
router.post("/login", authController.login);
router.get("/login/google", passport.authenticate("google-auth", { scope: SCOPES }));
router.get("/auth/google/callback", authController.loginGoogle);
router.get("/logout", authController.logout)

//USERS
router.get("/users/me", userController.getCurrentUser);

module.exports = router;