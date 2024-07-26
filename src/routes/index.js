const {authRouter} = require('./auth.routes')
const {userRouter} = require('./user.routes')
const restRouter = require('express').Router();

restRouter.use('/',authRouter)
restRouter.use('/',userRouter)

module.exports = {
    restRouter
}