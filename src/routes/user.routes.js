const {userController:{getData,getDataById}} = require('../controller')
const {validateToken,restrictTo} = require('../middleware')

const userRouter = require('express').Router();

userRouter.get('/get-users',validateToken,restrictTo('USER'),getData)
userRouter.post('/get-user-by-id',validateToken,restrictTo('USER'),getDataById)

module.exports = {
    userRouter
}