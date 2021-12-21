var userRouter = require('express').Router();
var userCtrl = require('../controllers');
userRouter.post('/:userid/addFood/:food/date/:date', userCtrl.user.addFood);
module.exports = userRouter;
