const {restrictTo} = require('./verify-role')
const { validateToken } = require('./verify-token')


module.exports = {
    restrictTo,validateToken
}