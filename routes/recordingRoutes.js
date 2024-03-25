const express = require('express')
const router = express.Router()
const recordingController = require('../controller/recordingController')

router.post('/add', recordingController.upload)

module.exports= router
