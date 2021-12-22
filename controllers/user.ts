const userDb = require('../models');

const getUser = (req, res) => {
    userDb.User.findById(req.params.id, (err: Error, foundUser) => {
        if (err) console.log(err);

        res.status(200).json(foundUser);
    })
}

const addFood = (req, res) => {
    userDb.User.findById(req.params.userid, (err, foundUser) => {

        if (err) console.log(err);

        foundUser.food.push({name: req.params.food, date: req.params.date});
        foundUser.save((err, savedUser) => {
            if (err) console.log(err);

            res.status(200).json(savedUser);
        })
    })
}

const removeFood = (req, res) => {
    userDb.User.findById(req.params.userid, (err, foundUser) => {
        if (err) console.log(err);

        foundUser.food = foundUser.food.filter(food => {
            food.name !== req.params.food && food.date !== req.params.date;
        })
        foundUser.save((err, savedUser) => {
            if (err) console.log(err);

            res.status(200).json(savedUser);
        })
    })
}

module.exports = {
    getUser,
    addFood,
    removeFood
}