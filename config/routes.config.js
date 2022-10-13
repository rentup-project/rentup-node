const router = require('express').Router();
const userController = require('../controllers/user.controller')

//HOME
router.get('/', (req, res, next) => res.json({ ok: true }));

//USER
router.post('/users/signup', userController.create);

module.exports = router;