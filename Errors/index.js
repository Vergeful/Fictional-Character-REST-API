// This file allows all errors to be imported at once.

const CustomError = require('./custom')
const BadRequestError = require('./bad-request')
const CantFindError = require('./cant-find')
const InvalidAuthenticationError = require('./invalid-authentication')

module.exports = {
    CustomError,
    BadRequestError,
    CantFindError,
    InvalidAuthenticationError
}