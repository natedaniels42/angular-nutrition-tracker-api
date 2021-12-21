const userDb = require('../models');

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

module.exports = {
    addFood
}