// This error will be used by authenticate.js in Middleware
// if the req.headers.authorization doesn't exist or doesn't start with Bearer.
// It can also be called if the JWT cannot be verified.

const CustomError = require('./custom');
const { StatusCodes } = require('http-status-codes');

class InvalidAuthenticationError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED // 401 STATUS CODE
  }
}

module.exports = InvalidAuthenticationError;
