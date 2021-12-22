const userRouter = require('express').Router();
const userCtrl = require('../controllers');

userRouter.get('/:id', userCtrl.user.getUser);
userRouter.post('/:userid/addfood/:food/date/:date', userCtrl.user.addFood);
userRouter.post('/:userid/removefood/:food/date/:date', userCtrl.user.removeFood);

module.exports = userRouter;
