const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;

const routes = require('./routes');


app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('api/v1/auth', routes.auth);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));