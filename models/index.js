var mongoose = require('mongoose');
require('dotenv').config();
var connectionString = process.env.MONGODB_URI;
mongoose.connect(connectionString)
    .then(function () { return console.log('MongoDB successfully connected...'); })["catch"](function (err) { return console.log("MongoDB connection error: ".concat(err)); });
module.exports = {
    User: require('./Users')
};
