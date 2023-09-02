const {StatusCodes} = require('http-status-codes')

const otherErrorsMiddleware = (err, req, res, next) =>{
    // Apart from our own custom errors, other errors include:
    // 1. Same email trying to be attached to more than 1 user
    // 2. User does not provide required field when registering
    // 3. ID syntax entered into URL doesn't match what mongoose requires

    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Server error'
    }

    // 1
    if(err.code && err.code === 11000){
        customError.msg = `The email, ${err.keyValue.email}, is already in use.`
        customError.statusCode =  StatusCodes.BAD_REQUEST //400 Status Code
    }

    // 2
    if(err.name && err.name === 'ValidationError'){
        customError.msg = Object.values(err.errors).map((item) => item.message).join(' , ')
        customError.statusCode = StatusCodes.BAD_REQUEST
    }

    // 3
    if(err.name && err.name === 'CastError'){
        customError.msg = 'ID does not exist'
        customError.statusCode = StatusCodes.NOT_FOUND //404 
    }

    return res.status(customError.statusCode).json({msg: customError.msg})
}

module.exports = otherErrorsMiddleware