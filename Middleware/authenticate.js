const UserModel = require('../Models/user')
const {InvalidAuthenticationError} = require('../Errors')
const jwt = require('jsonwebtoken')

const authMiddleware = async (req,res,next) =>{
    // Check header
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new InvalidAuthenticationError('Valid header not provided')
    }

    // authHeader format: 'Bearer token'
    const token = authHeader.split(' ')[1]

    // Check if token is valid so that user may access their characters after login:
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {userId: payload.userId , name: payload.name}
        next()
    }catch(error){
        throw InvalidAuthenticationError('Invalid JWT')
    }
}

module.exports = authMiddleware