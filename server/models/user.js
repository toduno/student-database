const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    photo: {
        type: String
    },
    firstName: {
        type: String,
        required: [true, 'Please add a first name']
    },
    lastName: {
        type: String,
        required:[true, 'Please add a last name']
    },
    username: {
        type: String,
        required: [true, 'Please add a username']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    }
    
}, {timestamps: true}
)

const User = mongoose.model('User', userSchema)

module.exports = User