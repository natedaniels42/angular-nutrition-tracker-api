var mongooseUser = require('mongoose');
var Schema = mongooseUser.Schema;
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
            id: Number,
            date: String,
            meal: String,
            name: String,
            calories: String,
            carbs: Number,
            fat: Number,
            protein: Number
        }]
});
var User = mongooseUser.model('User', userSchema);
module.exports = User;
