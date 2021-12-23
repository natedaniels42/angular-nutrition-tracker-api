const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');
require('dotenv').config();

const passwordValid = (password: string): boolean => {
    return /[a-z]/.test(password)
        && /[A-Z]/.test(password)
        && /\d/.test(password)
        && /[!@#\$%\^&\*\(\)]/.test(password)
}

const emailValid = (email: string): boolean => {
    return /^\w+@\w+\.\w+$/.test(email);
}

const register = async (req, res) => {
    if (!req.body.name || !req.body.email 
        || !req.body.password || !req.body.dailyCalorieGoal
        || !req.body.dailyCarbGoal || !req.body.dailyFatGoal 
        || !req.body.dailyProteinGoal ) {
        return res.status(400).json({message: 'All fields are required'})
    }

    if (req.body.password.length < 8 || req.body.password.length > 16) {
        return res.status(400).json({message: 'Password must be between 8 and 16 characters long'})
    }

    if (!passwordValid(req.body.password)) {
        return res.status(400).json({message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character(!@#$%^&*())'})
    }

    if (!emailValid(req.body.email)) {
        return res.status(400).json({message: 'Email must be valid'})
    }

    try {
        const foundUser = await db.User.findOne({ email: req.body.email });

        if (foundUser) {
            res.status(400).json({message: 'Email address is already registered'})
        }

        const salt = await bcrypt.genSalt(10);

        const hash = await bcrypt.hash(req.body.password, salt);

        await db.User.create({...req.body, password: hash});

        return res.status(201).json({message: 'Success'});
    } catch (err) {
        console.log(err);

        return res.status(500).json({message: 'Something went wrong'});
    }
}

const login = async (req, res) => {
    try {
        const foundUser = await db.User.findOne({ email: req.body.email });

        if (!foundUser) {
            return res.status(400).json({message: 'Email or password is incorrect'});
        }

        const isMatch = await bcrypt.compare(req.body.password, foundUser.password);

        if (!isMatch) {
            return res.status(400).json({message: 'Email or password is incorrect'});
        }

        const payload = {id: foundUser._id};
        const secret = process.env.JWT_SECRET;
        const expiration = {expiresIn: '1hr'};
        const token = jwt.sign(payload, secret, expiration);

        res.status(200).json({token});
    } catch (err) {
        console.log(err);

        return res.status(500).json({message: 'Something went wrong'});
    }
}

module.exports = {
    register,
    login
}