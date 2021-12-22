var userDb = require('../models');
var getUser = function (req, res) {
    userDb.User.findById(req.params.id, function (err, foundUser) {
        if (err)
            console.log(err);
        res.status(200).json(foundUser);
    });
};
var addFood = function (req, res) {
    console.log(req.body);
    userDb.User.findById(req.params.userid, function (err, foundUser) {
        if (err)
            console.log(err);
        foundUser.food.push(req.body);
        foundUser.save(function (err, savedUser) {
            if (err)
                console.log(err);
            res.status(200).json(savedUser);
        });
    });
};
var removeFood = function (req, res) {
    userDb.User.findById(req.params.userid, function (err, foundUser) {
        if (err)
            console.log(err);
        foundUser.food = foundUser.food.filter(function (food) {
            food.name !== req.params.food && food.date !== req.params.date;
        });
        foundUser.save(function (err, savedUser) {
            if (err)
                console.log(err);
            res.status(200).json(savedUser);
        });
    });
};
module.exports = {
    getUser: getUser,
    addFood: addFood,
    removeFood: removeFood
};
