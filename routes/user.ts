const userRouter = require('express').Router();
const userCtrl = require('../controllers');

userRouter.post('/:userid/addFood/:food/date/:date', userCtrl.user.addFood);

module.exports = userRouter;
