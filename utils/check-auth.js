const {AuthenticationError} = require('apollo-server')
const jwt = require('jsonwebtoken')
const {SECRET_KEY} = require('../config')

module.exports = (context) => {
    // context = { ... headers }
    const authHeader = context.request.headers.authorization
    if(authHeader) {
        const token = authHeader.split('Bearer ')[1]
        if(token) {
            try {
                const user = jwt.verify(token, SECRET_KEY)
                return user
            } catch (error) {
                throw new AuthenticationError('Invalid/Expired token')
            }
        }
        throw new Error('Authentication token is wrong')
    }
    throw new Error('Authorization header must be provided')
}