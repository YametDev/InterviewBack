const express = require('express')

const userRouter = express.Router()
const { userController } = require('../controllers')

userRouter.post('/create', userController.create)
userRouter.post('/lookup', userController.lookup)
userRouter.post('/update', userController.update)
userRouter.post('/delete', userController.delete)

module.exports = userRouter;
