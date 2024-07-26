const {authController:{signup,login,logout}} = require('../controller')
const {validateSignup} = require('../validations')

const authRouter = require('express').Router();

authRouter.post('/signup',validateSignup,signup)
authRouter.post('/login',login)
authRouter.get('/logout',logout)

module.exports = {
    authRouter
}