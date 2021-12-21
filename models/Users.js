const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        minlength: 8,
        required: [true, 'Password is required']
    },
    food: [{
        date: String,
        name: String,
        calories: String,
        carbs: Number,
        fat: Number,
        protein: Number
    }]
})

const User = mongoose.model('User', userSchema);

module.exports = User;