const router = require('express').Router();

//HOME
router.get('/', (req, res, next) => res.json({ ok: true }));

module.exports = router;