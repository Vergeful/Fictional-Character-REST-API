const {CustomError} = require('../Errors')
const {StatusCodes} = require('http-status-codes')

const otherErrorsMiddleware = (err, req, res, next) =>{
    if (err instanceof CustomError){
        return res.status(err.statusCode).json({msg: err.message})
    }
    // If error isn't one of our custom errors, return general 500 error.
    // This will be changed later: 
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err})
}

module.exports = otherErrorsMiddleware