const express = require('express')
const router = express.Router()
const reportController = require('../controller/reportController')

router.post('/generate', reportController.generateReport)



module.exports= router
