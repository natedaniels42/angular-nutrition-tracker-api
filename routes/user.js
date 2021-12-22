var userRouter = require('express').Router();
var userCtrl = require('../controllers');
userRouter.get('/:id', userCtrl.user.getUser);
userRouter.post('/:userid/addfood', userCtrl.user.addFood);
userRouter.post('/:userid/removefood', userCtrl.user.removeFood);
module.exports = userRouter;
