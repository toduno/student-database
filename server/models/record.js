const mongoose = require('mongoose')

const studentRecordSchema = new mongoose.Schema({
    photo: {
        type: String
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    socials: {
        facebook: {
            type: String,
            required: true
        },
        twitter: {
            type: String,
            required: true
        },
        instagram: {
            type: String,
            required: true
        },
        linkedin: {
            type: String,
            required: true
        }
    },
     interest: {
        type: String,
        required: true
    },
    graduationYear: {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model('StudentList', studentRecordSchema)