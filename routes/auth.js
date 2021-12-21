var router = require('express').Router();
var ctrl = require('../controllers');
router.post('/register', ctrl.auth.register);
router.post('/login', ctrl.auth.login);
module.exports = router;
