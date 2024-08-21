const express = require('express');
const studentRoute = express.Router();
const studentController = require('../controllers/studentController')


studentRoute.post('/add', studentController.addStudent)
studentRoute.get('/list', studentController.studentList)
studentRoute.post('/update', studentController.updateStudent)


module.exports = studentRoute