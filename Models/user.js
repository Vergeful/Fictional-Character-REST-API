const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        require: [true, 'Provide a name'],
        minLength: 2,
        maxLength: 50,
    },
    email:{
        type: String,
        require: [true, 'Provid a valid email address'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Provide a valid email address',
        ],
        unique: true, // Technically it is not a validator. It creates a unique index. An email can only be used once in the database.
    },
    password:{
        type: String,
        require: [true, 'Provide a valid password'],
        minLength: 8
    },
})

module.exports = mongoose.model('UserModel', UserSchema)