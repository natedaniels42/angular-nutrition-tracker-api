const mongoose = require('mongoose');
require('dotenv').config();

const connectionString = process.env.MONGODB_URI;

mongoose.connect(connectionString)
    .then(() => console.log('MongoDB successfully connected...'))
    .catch((err) => console.log(`MongoDB connection error: ${err}`))

module.exports = {
    User: require('./Users')
}