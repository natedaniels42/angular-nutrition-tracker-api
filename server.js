var express = require('express');
var app = express();
require('dotenv').config();
var PORT = process.env.PORT;
var routes = require('./routes');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api/v1/auth', routes.auth);
app.listen(PORT, function () { return console.log("Server is running on port: ".concat(PORT)); });
