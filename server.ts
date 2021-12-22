const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT;

const routes = require('./routes');

app.use(cors({
    origin: 'http://localhost:4200',
    methods: 'GET,POST,PUT,DELETE',
    optionSuccessStatus: 200
}))

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/api/v1/auth', routes.auth);
app.use('/api/v1/user', routes.user);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));