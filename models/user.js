const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    profileUrl : [],
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
},{
    timestamp : true
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel