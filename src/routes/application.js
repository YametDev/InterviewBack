const express = require('express')

const applicationRouter = express.Router()
const { applicationController } = require('../controllers')

applicationRouter.post('/create', applicationController.create)
applicationRouter.post('/lookup', applicationController.lookup)
applicationRouter.post('/update', applicationController.update)
applicationRouter.post('/delete', applicationController.delete)
applicationRouter.post('/deletemany', applicationController.deleteMany)

module.exports = applicationRouter;
