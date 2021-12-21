var userRouter = require('express').Router();
var userCtrl = require('../controllers');
userRouter.post('/:userid/addfood/:food/date/:date', userCtrl.user.addFood);
userRouter.post('/:userid/removefood/:food/date/:date', userCtrl.user.removeFood);
module.exports = userRouter;
