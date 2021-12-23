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
    dailyCalorieGoal: {
        type: Number,
        required: [true, 'Daily Calorie Goal is required']
    },
    dailyCarbGoal: {
        type: Number,
        required: [true, 'Daily Carb Goal is required']
    },
    dailyFatGoal: {
        type: Number,
        required: [true, 'Daily Fat Goal is required']
    },
    dailyProteinGoal: {
        type: Number,
        required: [true, 'Daily Protein Goal is required']
    },
    food: [{
        date: String,
        meal: String,
        name: String,
        calories: Number,
        carbs: Number,
        fat: Number,
        protein: Number,
        image: String
    }]
})

const User = mongooseUser.model('User', userSchema);

module.exports = User;