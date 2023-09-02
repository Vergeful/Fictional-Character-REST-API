const {CustomError} = require('../Errors')
const {StatusCodes} = require('http-status-codes')

const otherErrorsMiddleware = (err, req, res, next) =>{
    if (err instanceof CustomError){
        return res.status(err.statusCode).json({msg: err.message})
    }

    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Server error'
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err})
}

module.exports = otherErrorsMiddleware