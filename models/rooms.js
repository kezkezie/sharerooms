const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    maxaccount : {
        type: Number,
        required: true
    },
    phonenumber : {
        type: String,
        required: true
    },
    rentperday : {
        type: Number,
        required: true
    },
    imageUrls : [],
    currentBookings : [],
    type : {
        type: String,
        required: true
    },
    userid: {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    }
},{
    timestamp : true
})

const roomModel = mongoose.model('rooms', roomSchema)

module.exports = roomModel 