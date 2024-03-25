const express = require('express')
const router = express.Router()
const studentController = require('../controller/studentController')

router.post('/add', studentController.add)
router.get('/', studentController.fetchAllStudents)
router.get('/report', studentController.fetchAllStudentsReports)
router.get('/query', studentController.fetchStudentByFilters)
router.get('/:reportId', studentController.fetchSingleStudentReport)


module.exports= router
