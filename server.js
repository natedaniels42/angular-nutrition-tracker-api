var express = require('express');
var app = express();
var cors = require('cors');
require('dotenv').config();
var PORT = process.env.PORT;
var routes = require('./routes');
app.use(cors({
    origin: process.env.CORS,
    methods: 'GET,POST,PUT,DELETE',
    optionSuccessStatus: 200
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api/v1/auth', routes.auth);
app.use('/api/v1/user', routes.user);
app.listen(PORT, function () { return console.log("Server is running on port: ".concat(PORT)); });
