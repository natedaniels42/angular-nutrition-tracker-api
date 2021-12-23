const userDb = require('../models');

const getUser = (req, res) => {
    userDb.User.findById(req.params.id, (err: Error, foundUser) => {
        if (err) console.log(err);

        res.status(200).json(foundUser);
    })
}

const addFood = (req, res) => {
    console.log(req.body);
    userDb.User.findById(req.params.userid, (err, foundUser) => {

        if (err) console.log(err);

        foundUser.food.push(req.body);
        foundUser.save((err, savedUser) => {
            if (err) console.log(err);

            return res.status(200).json(savedUser);
        })
    })
}

const removeFood = (req, res) => {
    userDb.User.findById(req.params.userid, (err, foundUser) => {
        if (err) console.log(err);

        foundUser.food = foundUser.food.filter(food => {
           return food.name !== req.body.name || food.date !== req.body.date || food.meal !== req.body.meal;
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