const UserModel = require('../Models/user')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, InvalidAuthenticationError} = require('../Errors')

const register = async(req, res) => {
    const user = await UserModel.create({...req.body})
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({ userName: user.name, token})
}

const login = async(req, res) => {
    const {email, password} = req.body

    if(!email || !password){
        throw new BadRequestError('Provide email and password')
    }

    const user = await UserModel.findOne({email}) // email is unique to each user

    // Check if user exists:
    if(!user){
        throw new InvalidAuthenticationError('User does not exist')
    }

    // Check password validity:
    const passwordValidity = await user.checkPasswordValidity(password)

    if(!passwordValidity){
        throw new InvalidAuthenticationError('Invalid password')
    }

    const token = user.createJWT()
    res.status(StatusCodes.OK).json({ userName: user.name, token})


}

module.exports ={
    register,
    login
}