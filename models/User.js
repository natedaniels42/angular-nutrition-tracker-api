var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
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
});
var User = mongoose.model('User', userSchema);
module.exports = User;
