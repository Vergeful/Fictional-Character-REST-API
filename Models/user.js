const mongoose = require('mongoose')
const bcrypt = require('bcryptjs') // for hashing password
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        require: [true, 'Provide a name'],
        minLength: 2,
        maxLength: 50
    },
    email:{
        type: String,
        require: [true, 'Provid a valid email address'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Provide a valid email address',
        ],
        unique: true // Technically it is not a validator. It creates a unique index. An email can only be used once in the database.
    },
    password:{
        type: String,
        require: [true, 'Provide a valid password'],
        minLength: 8
    },
})

// Hash Password using mongoose middleware:
// Use function keyword instead of arrow functions as the this keyword points to the document
UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10) // generate random bytes, bigger argument means more bytes generated, 10 is the default
    this.password = await bcrypt.hash(this.password, salt)
})

// Mongoose instance method to generate JWT token when creating user:
UserSchema.methods.createJWT = function (){
    return jwt.sign(
        {userId:this._id, name:this.name}, 
        process.env.JWT_SECRET, 
        {
        expiresIn:process.env.JWT_LIFESPAN
        }
    )
}

UserSchema.methods.checkPasswordValidity = async function(enteredPassword){
    const isValid = await bcrypt.compare(enteredPassword, this.password)
    return isValid
} 

module.exports = mongoose.model('UserModel', UserSchema)