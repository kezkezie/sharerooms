const mongoose = require("mongoose");

var mongoUrl = 'mongodb+srv://kezie:Ay8zymBbldKKylaJ@cluster0.uqpbobx.mongodb.net/sharerooms'

mongoose.connect(mongoUrl, {useUnifiedTopology : true, useNewUrlParser: true})

var connection = mongoose.connection

mongoose.connection.on(`error`, () => {
    console.log(`Mongo DB Connection failed`)
})

mongoose.connection.on(`connected`, () => {
    console.log(`Mongo DB Connection succesful`)
})

module.exports = mongoose