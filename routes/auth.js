var router = require('express').Router();
var ctrl = require('../controllers');
router.post('/register', ctrl.auth.register);
module.exports = router;
