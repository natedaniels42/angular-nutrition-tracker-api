const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');
require('dotenv').config();

const register = async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({message: 'All fields are required'})
    }

    if (req.body.password.length < 8 || req.body.password.length > 16) {
        return res.status(400)
    }
}