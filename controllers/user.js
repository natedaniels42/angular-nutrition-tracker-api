var userDb = require('../models');
var addFood = function (req, res) {
    userDb.User.findById(req.params.userid, function (err, foundUser) {
        if (err)
            console.log(err);
        foundUser.food.push({ name: req.params.food, date: req.params.date });
        foundUser.save(function (err, savedUser) {
            if (err)
                console.log(err);
            res.status(200).json(savedUser);
        });
    });
};
module.exports = {
    addFood: addFood
};
