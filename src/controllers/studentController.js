const studentService = require('../services/studentService')
const validationHelper = require('../helpers/validation')
const app_constants = require('../constants/app.json')


module.exports.addStudent = async (req, res) => {
    try {
        const required_fields = ['full_name', 'father_name', 'age', 'gender']
        const vallidation_error = validationHelper.validation(required_fields, req.body)

        if (vallidation_error.length) {
            return res.json({ success: 0, status: app_constants.BAD_REQUEST, message: vallidation_error.join(',') })
        }

        const add_student = await studentService.addStudent(req.body)
        return res.json(add_student)
    }
    catch (ex) {
        console.log(ex);
    }
}


module.exports.studentList = async (req, res) => {
    try {
        const get_students = await studentService.studentList(req.query)
        return res.json(get_students)
    }
    catch (ex) {
        console.log(ex);
    }
}


module.exports.updateStudent = async (req, res) => {
    try {
        const required_fields = ['id']
        const vallidation_error = validationHelper.validation(required_fields, req.body)

        if (vallidation_error.length) {
            return res.json({ success: 0, status: app_constants.BAD_REQUEST, message: vallidation_error.join(',') })
        }

        const update_student = await studentService.updateStudent(req.body)
        return res.json(update_student)
    }
    catch (ex) {
        console.log(ex);
    }
}