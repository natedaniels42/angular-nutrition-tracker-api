const router = require('express').Router();
const ctrl = require('../controllers');

router.post('/register', ctrl.auth.register);

module.exports = router;