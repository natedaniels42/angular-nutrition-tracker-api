const mongooseUser = require('mongoose');
const Schema = mongooseUser.Schema;

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
        id: Number,
        date: String,
        meal: String,
        name: String,
        calories: String,
        carbs: Number,
        fat: Number,
        protein: Number
    }]
})

const User = mongooseUser.model('User', userSchema);

module.exports = User;