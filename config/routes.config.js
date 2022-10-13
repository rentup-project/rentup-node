const router = require('express').Router();
const userController = require('../controllers/user.controller');
const authController = require("../controllers/auth.controller");
const authMiddleware = require('../middlewares/auth.middleware');

//HOME
router.get("/", (req, res, next) => res.json({ ok: true }));

//AUTH
router.post("/signup", authController.signup);
router.get("/activate/:token", authController.activateAccount);
router.post("/login", authController.login);
router.get("/login/google", passport.authenticate("google-auth", { scope: SCOPES }));
router.get("/auth/google/callback", authController.loginGoogle);

//USERS
router.get("/users/me", userController.getCurrentUser);

module.exports = router;